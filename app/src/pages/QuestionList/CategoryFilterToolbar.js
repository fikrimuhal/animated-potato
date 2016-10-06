/**
 * Created by MYigit on 28.9.2016.
 */
import React             from 'react'
import FilterIcon        from 'material-ui/svg-icons/content/filter-list'
import FlatButton        from 'material-ui/FlatButton'
import log2              from '../../utils/log2'
import Dialog            from 'material-ui/Dialog';
import * as Cache        from '../../utils/cache'
import  Checkbox         from 'material-ui/Checkbox'
import  {Row, Col}       from 'react-flexbox-grid'
import * as _            from 'lodash'
import * as api          from '../../utils/api'
import ResponseStatus  from '../../utils/static-messages'
import * as util         from '../../utils/utils'
import {browserHistory}  from 'react-router'
import Subheader         from 'material-ui/Subheader'
const log = log2("CategoryFilterToolbar")

export default  class CategoryFilterToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            dataLoaded: false
        };
        this.initialize();
    }

    initialize = ()=> {
        this.initializeCategories();
        this.initializeCollections();
    }
    initializeCategories = () => {
        var _this = this;
        if (Cache.CategoryCaching.check()) {
            var categories = Cache.CategoryCaching.get();
            categories = _.orderBy(categories, ['category'], ['asc']);
            categories = _.concat({id: -1, category: "All"}, categories);
            this.state = {
                categories: categories,
                modalOpen: false,
                dataLoaded: true
            }
        }
        else {
            api.getCategoryList({}).then(response=> {
                response.json().then(json=> {
                    if (json.status == ResponseStatus.SESSION_EXPIRED || json.status == ResponseStatus.UNAUTHORIZED) {
                        util.clearToken();
                        _this.context.showMessage(json.message, 2000);
                        setTimeout(()=> {
                            browserHistory.push("/signin")
                        }, 2000);
                        return;
                    }
                    else if (json.status == ResponseStatus.FORBIDDEN) {
                        browserHistory.push("/")
                    }
                    else {
                        util.setToken(response.headers.get("Authorization"));
                        var categories = json;
                        Cache.CategoryCaching.cache(categories);
                        categories = _.orderBy(categories, ['category'], ['asc']);
                        categories = _.concat({id: -1, category: "All"}, categories);
                        this.setState({
                            categories: categories,
                            dataLoaded: true
                        });
                    }

                }).catch(err => {
                    log("error", err);
                    this.context.showMessage("Error", 2000);
                })
            }).catch(err=> {
                this.context.showMessage("An error occured when categories fetching", 2000);
                log("error-> ", err);
            });
        }
    }
    initializeCollections = () => {
        var _this = this;
        if (Cache.QuestionSetCaching.check()) {
            var collections = Cache.QuestionSetCaching.get().map(collection => {
                return {
                    title: collection.title,
                    id: collection.id
                }
            });
            collections = _.orderBy(collections, ['title']);
            collections = _.concat({
                title: "All Collection",
                id: -1
            }, collections);
            Object.assign(this.state, {
                collections: collections,
                collectionLoaded: true
            });
        }
    }
    openFilterBox = ()=> {
        log("openFilterBox");
        this.handleOpen();
    }
    handleOpen = () => {
        this.setState({modalOpen: true});
    };

    handleClose = () => {
        this.setState({modalOpen: false});
    };
    getModalActions = () => {
        var actions = [

            <FlatButton
                label="Done"
                primary={true}
                //keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];
        return actions;
    };
    categoryChecked = id => ()=> {
        //log("categoryChecked ", id);
        this.props.categorySelectChanged(id);
    }
    collectionChecked = id => ()=> {
        log("collectionChecked ", id);
        this.props.collectionSelectChanged(id);
    }


    getModalContent = ()=> {
        //log("this.state", this.state);
        var selectedCategories = this.props.selectedCategories;
        var selectedCollections = this.props.selectedCollections;
        //log("getModalContent-> selectedCategories", selectedCategories);
        var content;
        var collectionContent;
        var categoryContent;
        if (this.state.dataLoaded) {
            categoryContent = this.state.categories.map(c => {
                var checked = selectedCategories.includes(c.id);
                return <Col lg={3} md={3}><Checkbox checked={checked} onCheck={this.categoryChecked(c.id)}
                                                    label={c.category}></Checkbox></Col>
            });

            content = [<Row><Col lg={12}> <Subheader>Question Categories Filter</Subheader></Col>{categoryContent}
            </Row>];
        }
        else {
            content = [<Row><Col lg={12}> <Subheader>Question Categories Filter</Subheader></Col>
                <div>There is no Category !</div>
            </Row>];
        }

        //log("content", content);

        if (this.state.collectionLoaded) {
            collectionContent = this.state.collections.map(collection=> {
                var checked = selectedCollections.includes(collection.id);
                return <Col lg={4} md={4}><Checkbox checked={checked} onCheck={this.collectionChecked(collection.id)}
                                                    label={collection.title}></Checkbox></Col>
            })
            collectionContent =
                <Row><Col lg={12}> <Subheader>Collection Filter</Subheader></Col>{collectionContent}</Row>;
        }
        else {
            collectionContent = <Row><Col lg={12}> <Subheader>Collection Filter</Subheader></Col>
                <div>There is no Collection !</div>
            </Row>;
        }

        content.push(collectionContent);

        //log("content", content);

        return content;

    }
    render = ()=> {
        //log("this.state.modalOpen", this.state.modalOpen)
        return (
            <div style={{float: "right"}}>
                <FlatButton icon={<FilterIcon/>} label={"Filter Questions"} onClick={this.openFilterBox}
                            primary={true}></FlatButton>
                <Dialog
                    actions={this.getModalActions()}
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}
                >
                    {this.getModalContent()}
                </Dialog>
            </div>
        )
    }
}


CategoryFilterToolbar.propTypes = {
    selectedCategories: React.PropTypes.array.isRequired,
    selectedCollections: React.PropTypes.array.isRequired,
    categorySelectChanged: React.PropTypes.func.isRequired,
    collectionSelectChanged: React.PropTypes.func.isRequired
};

CategoryFilterToolbar.contextTypes = {
    showMessage: React.PropTypes.func
}