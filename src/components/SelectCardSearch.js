import React, { Component, useRef, createRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ReactLoading from 'react-loading';
import Skeleton from '@material-ui/lab/Skeleton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = (theme) => ({
    root: {
        width: "100%",
    },
    title: {

    },
    content: {

    },
    searchHolder: {

    },
    searchInputHolder: {
        width: "90vw",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    searchIconHolder: {
        margin: "2vw",
        width: "8vw",
        height: "8vw",
    },
    searchIcon: {
        width: "100%",
        height: "100%",
    },
    searchInput: {
        height: "8vw",
        backgroundColor: "#f5f5f5",
        borderWidth: 0,
        border: "none",
        outline: "none"
    },
    searchResult: {
        position: "absolute",
        width: "90vw",
        backgroundColor: "#fff",
        border: "1px solid #cacaca",
        zIndex: "10",
    },
});

class SelectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: "",
            searchResult: [],
            focus: false,
        }
    }

    componentDidMount = () => {

    }
    handleSearchInputChange = (e) => {
        const userInput = e.target.value;
        const searchResult = userInput === "" ? [] : this.props.cardList.filter(c => c.CardName.includes(userInput)).map((card, index) => {
            return { cardName: card.CardName, cardID: card._id }
        })
        this.setState({ searchInputValue: userInput, searchResult: searchResult });
    }
    handleSearchInputFocus = (e) => {
        this.setState({ focus: true });
    }
    handleSearchInputFocusOut = (e) => {
        this.setState({ focus: false });
    }
    searchCard = (e, cardID) => {
        e.preventDefault();
        console.log("haha")
        console.log(cardID);
    }
    render() {
        const { classes } = this.props;
        const searchResultStyle = this.state.focus && this.state.searchResult.length !== 0 ? 1 : 0;
        const searchResult = this.state.searchResult.map((card, index) => (
            <div onClick={(e) => this.searchCard(e, card.cardID)}>
                {card.cardName}
            </div>
        ));
        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <b>{this.props.searchTitle}</b>
                </div>
                <div className={classes.content}>
                    {this.props.searchContent}
                </div>
                <div className={classes.searchHolder}>
                    <div className={classes.searchInputHolder} >
                        <div className={classes.searchIconHolder}>
                            <SearchIcon className={classes.searchIcon} />
                        </div>
                        <input
                            className={classes.searchInput}
                            id="search-input"
                            placeholder="輸入銀行或信用卡名稱"
                            value={this.state.searchInputValue}
                            onChange={this.handleSearchInputChange}
                            onFocus={this.handleSearchInputFocus}
                            onBlur={this.handleSearchInputFocusOut}
                        />
                    </div>
                    <div className={classes.searchResult}
                        style={{ opacity: searchResultStyle }}
                    >
                        {searchResult}
                    </div>
                </div>
            </div >
        )
    }

}
export default withStyles(useStyles)(SelectCard)