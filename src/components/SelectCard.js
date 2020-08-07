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

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ReactLoading from 'react-loading';
import Skeleton from '@material-ui/lab/Skeleton';
//images
import autopass_logo from '../images/logo.png';

// gliderjs
import 'glider-js/glider.min.css';
import Glider from 'react-glider';
import randomColor from 'randomcolor';

import SelectCardSearch from './SelectCardSearch';

// sticky
import { StickyContainer, Sticky } from 'react-sticky';

const useStyles = (theme) => ({
    root: {
        width: "100vw",
    },
    cardListContainer: {
        width: "95vw",
        paddingLeft: "5vw"
    },
    userCardHeader: {
        width: "90vw",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "15vw",
    },
    bankImage: {
        marginLeft: "5vw",
        width: "12vw",
    },
    bankName: {
        width: "66vw",
        paddingLeft: "3vw",
        fontSize: "5vw",
        userSelect: "none"
    },
    expandMore: {
        width: "12vw",
    },
    glider: {
        height: "35vw",
    },
    skeletonCard: {
        borderRadius: "5vw",
    },
    carouselHolder: {
        height: "30vw",
        overflow: "hidden",
        transition: "height 0.5s ease-in-out",
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
    allBankTitle: {
        marginLeft: "9vw",
        // marginTop: "5vw",
        marginBottom: "2vw",
        fontSize: "6vw",
        color: "#3c3c3c"
    },
    loading: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fcf700",
    },
    loadingIconHolder: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center"
    },
    loadingIcon: {
        width: "30vw",
        height: "30vw",
    },
    loadingIconImage: {
        maxWidth: "100%",
    },
    loadingBubbles: {
        width: "40vw",
        height: "40vw",
        transform: "scaleX(-1)",
    }
});

class SelectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBankdCarouselIndex: null,
            preShowBankdCarouselIndex: null,
            cardList: [],
            loading: true,
        }
        this.gliderRef = createRef();
    }
    componentDidMount = () => {
        let cardList = this.props.cardList;
        for (let i = 0; i < cardList.length; ++i) {
            cardList[i].cardColor = randomColor({ luminosity: 'light' });
        }
        let bankList = this.props.bankList;
        for (let i = 0; i < bankList.length; ++i) {
            bankList[i].bankRef = createRef();
            bankList[i].bankGliderRef = createRef();
        }
        let popularCardList = cardList.filter((c, index) => index < 10);
        let popularBankList = bankList.filter((b, index) => index < 10);
        this.setState({
            bankList: bankList,
            cardList: cardList,
            popularCardList: popularCardList,
            popularBankList: popularBankList,
            loading: false
        });
    }

    handleSelectBank = (e, bankID) => {
        e.preventDefault();
        if (bankID === this.state.showBankdCarouselIndex) {
            this.setState({ showBankdCarouselIndex: null, preShowBankdCarouselIndex: bankID });
        } else {
            this.setState({ showBankdCarouselIndex: bankID, preShowBankdCarouselIndex: this.state.showBankdCarouselIndex });
        }
    }

    handleSearchBank = (e, bankID) => {
        e.preventDefault();
        this.setState({ showBankdCarouselIndex: bankID});
    }

    handleSelectCard = (e, cardID, cardName) => {
        this.props.updateUserCards(cardID, cardName);
    }

    render() {
        const { classes } = this.props;
        const list = this.props.bankList.filter(b => b.BankCards.length !== 0 && b.BankName !== "電子票證").map((bank, index) => {
            const cardCarouselStyle = bank._id === this.state.showBankdCarouselIndex ? { height: "30vw" } : { height: "0" };
            const carouselCards = this.state.cardList.filter(c => c.BankID === bank._id).map(
                (card, index) => {
                    const select_filter = this.props.ownCards.find(oc => oc === card._id) ? `brightness(40%)` : `brightness(100%)`;
                    const doneIcon = this.props.ownCards.find(oc => oc === card._id) ? `visible` : `hidden`;
                    return (
                        <div className={classes.cardRoot} onClick={e => this.handleSelectCard(e, card._id, card.CardName)}>
                            <div className={classes.cardImageHolder} style={{ backgroundColor: card.cardColor, filter: select_filter }}>
                                <div className={classes.cardName}>
                                    {card.CardName}
                                </div>
                            </div>
                            <div className={classes.doneIcone} style={{ visibility: doneIcon }}>
                                <DoneIcon />
                            </div>
                        </div>
                    )
                })
            const carousel = bank._id === this.state.showBankdCarouselIndex || bank._id === this.state.preShowBankdCarouselIndex ?
                (<Glider
                    ref={bank.bankGliderRef}
                    className={classes.glider}
                    slidesToShow={2.7}
                    slidesToScroll={carouselCards.length / 2.7}
                >
                    {carouselCards}
                </Glider>) : (<div className={classes.glider} />);

            return (
                <>
                    <div className={classes.userCardHeader} id={`bank-div-${bank._id}`} onClick={(e) => this.handleSelectBank(e, bank._id)} ref={bank.bankRef}>
                        <Avatar variant="rounded" className={classes.bankImage} src={bank.BankImage}>{classes.bankName}</Avatar>
                        <div className={classes.bankName}>
                            {bank.BankName}
                        </div>
                        <IconButton className={classes.expandMore} onClick={(e) => this.handleSelectBank(e, bank._id)}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </div>
                    <div className={classes.carouselHolder} style={cardCarouselStyle} >
                        {carousel}
                    </div>
                    <Divider />
                </>
            )
        });

        if (this.state.loading) {
            return (
                <div className={classes.loading}>
                    <div className={classes.loadingIconHolder}>
                        <div className={classes.loadingBubbles}>
                            <ReactLoading type={'bubbles'} color={'#fff'} height={'30vh'} width={'40vw'} />
                        </div>
                        <div className={classes.loadingIcon}>
                            <img className={classes.loadingIconImage} src={autopass_logo} />
                        </div>
                    </div>
                </div>)
        } else {
            return (
                <div className={classes.root}>
                    <StickyContainer>
                        <SelectCardSearch
                            searchTitle={`加入更多信用卡優惠`}
                            searchContent={`你可以一次加入多張卡片，下次使用「我的信用卡優惠」就能一次查看啦!`}
                            ownCards={this.props.ownCards}
                            cardList={this.state.cardList}
                            bankList={this.state.bankList}
                            popularBankList={this.state.popularBankList}
                            popularCardList={this.state.popularCardList}
                            handleSearchBank={this.handleSearchBank}
                            handleSelectCard={this.handleSelectCard}
                        />
                        <div className={classes.allBankTitle}>
                            <b>銀行全覽</b>
                        </div>
                        <div className={classes.cardListContainer}>
                            {list}
                        </div>
                    </StickyContainer>
                </div>
            )
        }
    }
}
export default withStyles(useStyles)(SelectCard)