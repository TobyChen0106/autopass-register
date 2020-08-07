import React, { Component, useRef, createRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Button from '@material-ui/core/Button';
// gliderjs
import 'glider-js/glider.min.css';
import Glider from 'react-glider';

// sticker
import { StickyContainer, Sticky } from 'react-sticky';

const useStyles = (theme) => ({
    root: {
        width: "100%",
    },
    sticky: {
        zIndex: 100,
    },
    title: {
        color: "#3c3c3c",
        fontSize: "7vw",
        width: "82vw",
        marginLeft: "9vw",
        marginTop: "5vw",
        marginBottom: "1.5vw",
    },
    content: {
        color: "#3c3c3c",
        fontSize: "3.8vw",
        width: "82vw",
        marginLeft: "9vw",
    },
    searchSection: {
        padding: "4vw 0",
        width: "100vw",
        backgroundColor: "#fff",
        zIndex: 15,
    },
    searchHolder: {
        width: "90vw",
        marginLeft: "5vw",
    },
    searchInputHolder: {
        width: "90vw",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "2vw",

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
        width: "70vw",
        height: "8vw",
        backgroundColor: "#f5f5f5",
        borderWidth: 0,
        border: "none",
        outline: "none",
        '&::placeholder': {
            color: "#999999",
            fontSize: "4.5vw",
        },
        fontSize: "4.5vw",
    },
    searchCancelIconHolder: {
        margin: "2vw",
        width: "6vw",
        height: "8vw",
    },
    searchCancelIcon: {
        color: "#cacaca",
        width: "100%",
        height: "100%",
    },
    searchResultHolder: {
        position: "absolute",
        width: "82vw",
        maxHeight: "100vh",
        padding: "0 2vw",
        margin: "0 2vw",
        // marginBottom: "10vw",
        backgroundColor: "#fff",
        border: "1px solid #f5f5f5",
        zIndex: 100,
        fontSize: "4.5vw",
        overflow: "scroll"
    },
    searchResultItem: {
        height: "8vw",
        margin: "1vw",
        display: "flex",
        alignItems: "center",
        fontSize: "4.5vw",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    searchResultIcon: {
        marginTop: "1.5vw",
        marginRight: "2vw",
        color: "#cacaca",
        width: "5vw",
        height: "5vw",
    },
    popularBankTitle: {
        marginLeft: "9vw",
        marginTop: "0vw",
        marginBottom: "1vw",
        fontSize: "6vw",
        color: "#3c3c3c"
    },
    popularBankListHolder: {
        marginLeft: "9vw",
        height: "8vw",
        overflow: "hidden",
        marginBottom: "4vw",
    },
    popularBankList: {
        width: "91vw",
        height: "10vw",
    },
    popularBankListItemHolder: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "20vw",
    },
    popularBankListItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "23vw",
        height: "8vw",
        color: "#FF9F00",
        backgroundColor: "#FFF4C2",
        borderRadius: "4vw",
        fontSize: "3vw",
        color: "#FF9F00",
        '&:hover': {
            backgroundColor: '#FFF4C2',
        },
        '&:active': {
            backgroundColor: '#FFF4C2',
        },
    },
    popularCardListHolder: {
        marginLeft: "9vw",
        marginBottom: "4vw",
        height: "30vw",
        overflow: "hidden",
    },
    popularCardList: {
        height: "35vw",
    },
    cardRoot: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "36vw",
    },
    cardImageHolder: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "34vw",
        height: "24vw",
        borderRadius: "3vw",
    },
    cardName: {
        fontSize: "0.8rem",
    },
    doneIcone: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
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

    sortSearchResult = (a, b) => {
        return b.matchPercent - a.matchPercent;
    }

    handleSearchInputChange = (e, placeholder) => {
        const userInput = placeholder ? placeholder : e.target.value;
        const cardSearchResult = userInput === "" ? [] : this.props.cardList.filter(c => c.CardName.includes(userInput)).map((card, index) => {
            return { type: "card", matchPercent: userInput.length / card.CardName.length, cardName: card.CardName, cardID: card._id };
        });
        const bankSearchResult = userInput === "" ? [] : this.props.bankList.filter(b => b.BankName.includes(userInput)).map((bank, index) => {
            return { type: "bank", matchPercent: userInput.length / bank.BankName.length, bankName: bank.BankName, bankID: bank._id };
        });
        this.setState({ searchInputValue: userInput, searchResult: cardSearchResult.concat(bankSearchResult).sort(this.sortSearchResult) });
    }

    handleSearchInputFocus = (e) => {
        this.setState({ focus: true });
        this.handleSearchInputChange(e, this.state.searchInputValue);
    }

    handleSearchInputFocusOut = (e) => {
        this.setState({ focus: false });
    }

    searchCardorBank = (e, type, name, id) => {
        e.preventDefault();
        this.setState({ searchInputValue: name, searchResult: [] });
        if (type === "bank") {
            const result = this.props.bankList.find(b => b._id === id);
            this.props.handleSearchBank(e, id);
            result.bankRef.current.scrollIntoView({ block: 'center' });
        } else if (type === "card") {
            const resultCard = this.props.cardList.find(c => c._id === id);
            const resultBank = this.props.bankList.find(b => b._id === resultCard.BankID);
            const resultCardIndex = resultBank.BankCards.findIndex(c => c === resultCard._id);
            this.props.handleSearchBank(e, resultBank._id);
            resultBank.bankRef.current.scrollIntoView({ block: 'center' });
            console.log(resultCard._id, resultCardIndex);
            resultBank.bankGliderRef.current.scrollItem(resultCardIndex);
        }
    }

    cancelSearch = (e) => {
        e.preventDefault();
        this.setState({ searchInputValue: "", searchResult: [] });
    }

    render() {
        const { classes } = this.props;
        const searchResultStyle = this.state.focus && this.state.searchResult.length !== 0 ? 1 : 0;
        const searchResult = this.state.searchResult.map((match, index) => {
            return match.type === "card" ?
                (<div className={classes.searchResultItem} onClick={(e) => this.searchCardorBank(e, "card", match.cardName, match.cardID)}>
                    <CreditCardIcon className={classes.searchResultIcon} />
                    {match.cardName}
                </div>) :
                (<div className={classes.searchResultItem} onClick={(e) => this.searchCardorBank(e, "bank", match.bankName, match.bankID)}>
                    <AccountBalanceIcon className={classes.searchResultIcon} />
                    {match.bankName}
                </div>)
        });
        const popularBankList = this.props.popularBankList.map((bank, index) => (
            <div className={classes.popularBankListItemHolder}>
                <Button className={classes.popularBankListItem} onClick={(e) => this.searchCardorBank(e, "bank", bank.BankName, bank._id)}>
                    {bank.BankName}
                </Button>
            </div>
        ));
        const popularCardList = this.props.popularCardList.map((card, index) => {
            const select_filter = this.props.ownCards.find(oc => oc === card._id) ? `brightness(40%)` : `brightness(100%)`;
            const doneIcon = this.props.ownCards.find(oc => oc === card._id) ? `visible` : `hidden`;
            return (
                <div className={classes.cardRoot} onClick={e => this.props.handleSelectCard(e, card._id, card.CardName)}>
                    <div className={classes.cardImageHolder} style={{ backgroundColor: card.cardColor, filter: select_filter }}>
                        <div className={classes.cardName}>
                            {card.CardName}
                        </div>
                    </div>
                    <div className={classes.doneIcone} style={{ visibility: doneIcon }}>
                        <DoneIcon />
                    </div>
                </div >
            )
        });
        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <b>{this.props.searchTitle}</b>
                </div>
                <div className={classes.content}>
                    {this.props.searchContent}
                </div>
                <Sticky className={classes.sticky}>
                    {({
                        style,
                        isSticky
                    }) => {
                        const stickyStyle = isSticky ? { ...style, boxShadow: "0px 1px 1px 1px #f5f5f5" } : null;
                        return (
                            <div className={classes.searchSection}
                                style={stickyStyle}
                            >
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
                                        <div className={classes.searchCancelIconHolder} onClick={this.cancelSearch}>
                                            <ClearIcon className={classes.searchCancelIcon} />
                                        </div>

                                    </div>
                                    <div className={classes.searchResultHolder} style={{ opacity: searchResultStyle }}>
                                        {searchResult}
                                    </div>
                                </div>
                            </div>
                        )
                    }}

                </Sticky>

                <div className={classes.popularBankTitle}>
                    <b>熱門銀行</b>
                </div>
                <div className={classes.popularBankListHolder}>
                    <Glider
                        className={classes.popularBankList}
                        slidesToShow={3.7}
                        slidesToScroll={popularBankList.length / 3.7}
                    >
                        {popularBankList}
                    </Glider>
                </div>
                <div className={classes.popularBankTitle}>
                    <b>熱門信用卡</b>
                </div>
                <div className={classes.popularCardListHolder}>
                    <Glider
                        className={classes.popularCardList}
                        slidesToShow={2.7}
                        slidesToScroll={popularBankList.length / 2.7}
                    >
                        {popularCardList}
                    </Glider>
                </div>
            </div >
        )
    }

}
export default withStyles(useStyles)(SelectCard)