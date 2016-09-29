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
const log = log2("CategoryFilterToolbar")

export default  class CategoryFilterToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            dataLoaded: false
        };
        if (Cache.CategoryCaching.check()) {
            var categories = Cache.CategoryCaching.get();
            categories = _.orderBy(categories, ['category'], ['asc']);
            categories = _.concat({id: -1, category: "All"}, categories);
            this.state = {
                categories: categories,
                dataLoaded: true
            }
        }
        else {
            api.getCategoryList({}).then(response=> {
                return response.json();
            }).then(json=> {
                var categories = json;
                Cache.CategoryCaching.cache(categories);
                categories = _.orderBy(categories, ['category'], ['asc']);
                categories = _.concat({id: -1, category: "All"}, categories);
                this.setState({
                    categories: categories,
                    dataLoaded: true
                });
            }).catch(err=> {
                this.context.showMessage("An error occured when categories fetching",2000);
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
        return (
            <div>
                <FlatButton icon={<FilterIcon/>} label={"Filter Category"} onClick={this.openFilterBox}></FlatButton>
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