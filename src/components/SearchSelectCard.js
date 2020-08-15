import React, { Component, createRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ReactLoading from 'react-loading';
//images
import autopass_logo from '../images/logo.png';

// gliderjs
import 'glider-js/glider.min.css';
import Glider from 'react-glider';
import randomColor from 'randomcolor';

import SearchSelectCardSearch from './SearchSelectCardSearch';
import Warning from './Warning';

// sticky
import { StickyContainer } from 'react-sticky';

const useStyles = (theme) => ({
    root: {
        width: "100vw",
        marginBottom: "40vw"
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
        height: "12vw",
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
        height: "30vw",
    },
    skeletonCard: {
        borderRadius: "5vw",
    },
    carouselHolder: {
        height: "28vw",
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
        width: "33vw",
        height: "21vw",
        margin: "3vw",
        borderRadius: "3vw",
    },
    cardImage: {
        width: "100%",
        height: "auto",
    },
    cardName: {
        fontSize: "0.8rem",
        display: "inline-block",
        wordBreak: "break-all"
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

class SearchSelectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBankdCarouselIndex: null,
            preShowBankdCarouselIndex: null,
            bankList: [],
            cardList: [],
            loading: true,
        }
        this.gliderRef = createRef();
    }
    componentWillMount = () => {
        let cardList = this.props.cardList;
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
        this.setState({ showBankdCarouselIndex: bankID });
    }

    handleSelectCard = (e, cardID, bankname, cardname) => {
        this.props.searchCard(cardID, bankname, cardname);
    }

    render() {
        const { classes } = this.props;
        const list = this.state.bankList.map((bank, index) => {
            const cardCarouselStyle = bank.id === this.state.showBankdCarouselIndex ? { height: "28vw" } : { height: "0" };
            const carouselCards = this.state.cardList.filter(c => c.bankid === bank.id).map(
                (card, index) => {
                    return (
                        <div className={classes.cardRoot} onClick={e => this.handleSelectCard(e, card.id, bank.bankname, card.cardname )}>
                            <div className={classes.cardImageHolder}>
                                <img className={classes.cardImage} src={card.cardimage} alt="User Cards" />
                            </div>
                        </div>
                    )
                })
            const carousel = bank.id === this.state.showBankdCarouselIndex || bank.id === this.state.preShowBankdCarouselIndex ?
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
                    <div className={classes.userCardHeader} id={`bank-div-${bank.id}`} onClick={(e) => this.handleSelectBank(e, bank.id)} ref={bank.bankRef}>
                        <Avatar variant="rounded" className={classes.bankImage} src={bank.bankimage}>{classes.bankName}</Avatar>
                        <div className={classes.bankName}>
                            {bank.bankname}
                        </div>
                        <IconButton className={classes.expandMore}>
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
                        <SearchSelectCardSearch
                            searchTitle={`信用卡優惠查詢`}
                            searchContent={`信用卡免費市區停車優惠、停車場即時查`}
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
                    <Warning content="免責聲明：本站信用卡免費市區停車之優惠資訊，整理自各信用卡之官網。個別場站是否適用優惠，依現場公告為準。" />
                </div>
            )
        }
    }
}
export default withStyles(useStyles)(SearchSelectCard)