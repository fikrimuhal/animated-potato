/**
 * Created by MYigit on 28.9.2016.
 */
import React            from 'react'
import FilterIcon       from 'material-ui/svg-icons/content/filter-list'
import FlatButton       from 'material-ui/FlatButton'
import log2             from '../../utils/log2'
import Dialog           from 'material-ui/Dialog';
import * as Cache       from '../../utils/cache'
import  Checkbox        from 'material-ui/Checkbox'
import  {Row, Col}      from 'react-flexbox-grid'
import * as _           from 'lodash'
import * as api         from '../../utils/api'
import {ResponseStatus} from '../../utils/static-messages'
import * as util        from '../../utils/utils'
import {browserHistory}        from 'react-router'
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
    getModalContent = ()=> {
        //log("this.props",this.props);
        var selectedCategories = this.props.selectedCategories;
        log("getModalContent-> selectedCategories", selectedCategories);
        if (this.state.dataLoaded) {
            var content = this.state.categories.map(c => {
                var checked = selectedCategories.includes(c.id);
                return <Col lg={3} md={3}><Checkbox checked={checked} onCheck={this.categoryChecked(c.id)}
                                                    label={c.category}></Checkbox></Col>
            });
            return <Row>{content}</Row>;
        }
        else {
            return <div>There is no category!</div>
        }
    }
    render = ()=> {
        log("this.state.modalOpen", this.state.modalOpen)
        return (
            <div style={{float: "right"}}>
                <FlatButton icon={<FilterIcon/>} label={"Filter Category"} onClick={this.openFilterBox}
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
    categorySelectChanged: React.PropTypes.func.isRequired
};

CategoryFilterToolbar.contextTypes = {
    showMessage: React.PropTypes.func
}