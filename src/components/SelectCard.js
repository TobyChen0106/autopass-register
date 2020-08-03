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

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 2.5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2.5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2.5
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2.5
    }
};

const useStyles = (theme) => ({
    root: {
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
    doneIcone: {
        width: "20px",
        height: "20px",
        backgroundColor: "#5CA9F8",
        color: "white",
        borderRadius: "50%",
    },
    glider: {
        height: "35vw",
    },
    skeletonCard: {
        borderRadius: "5vw",
    },
    carouselHolder: {
        overflow: "hidden",
        transition: "height 0.3s ease-in-out",
    },
    card: {
        width: "35vw",
        margin: "5%",
        display: "flex col",
        alignItems: "center"
    },
    cardImageHolder: {
        width: "100%",
        height: 'auto',
        // maxWidth: "100%",
        // boxShadow: "0 0 5px 5px #2fc4b2",
    },
    cardImage: {
        width: "100%",
        borderRadius: "2.5vw",
    },
    cardName: {
        marginTop: "0.6rem",
        fontSize: "0.8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modalImageHolder: {
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)"
    },
    modalImage: {
        width: "80vw",
        marginLeft: "10vw",
        marginRight: "10vw",
    },
    modalImageText: {
        display: "flex",
        justifyContent: "center"
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
            loading: true,
        }
        this.gliderRef = createRef();
    }
    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    handleSelectBank = (e, bankID) => {
        e.preventDefault();
        if (bankID === this.state.showBankdCarouselIndex) {
            this.setState({ showBankdCarouselIndex: null })
        } else {
            this.setState({ showBankdCarouselIndex: bankID })
        }
    }

    handleSelectCard = (e, cardID, cardName) => {
        e.preventDefault();
        this.props.updateUserCards(cardID, cardName);
    }

    handleCloseModal = () => {
        this.setState({ showSelectedCardIndex: null })
    }
    componentDidMount = () => {
        setInterval(() => this.setState({ loading: false }), 1000);
    }

    render() {
        const { classes } = this.props;
        const list = this.props.bankList.filter(b => b.BankCards.length !== 0 && b.BankName !== "電子票證").map((bank, index) => {
            const cardCarouselStyle = bank._id === this.state.showBankdCarouselIndex ? { height: "35vw" } : { height: "0" };

            const carouselCards = (bank._id === this.state.showBankdCarouselIndex) ? (this.props.cardList.filter(c => c.BankID === bank._id).map(
                card => (<div>{card.CardName}</div>)
            )) :
                (
                    <>
                        <div>
                            <Skeleton variant="rect" width={"40vw"} height={"20vw"} />
                            <Skeleton variant="text" width={"30vw"} style={{ marginLeft: "5vw" }} />
                        </div>
                        <div>
                            <Skeleton variant="rect" width={"40vw"} height={"20vw"} />
                            <Skeleton variant="text" width={"30vw"} style={{ marginLeft: "5vw" }} />
                        </div>
                        <div>
                            <Skeleton variant="rect" width={"40vw"} height={"20vw"} />
                            <Skeleton variant="text" width={"30vw"} style={{ marginLeft: "5vw" }} />
                        </div>
                    </>
                )

            const carousel = (<Glider ref={this.gliderRef}
                className={classes.glider}
                slidesToShow={2.5}
                slidesToScroll={10}>
                {carouselCards}
            </Glider>);

            return (
                <>
                    <div className={classes.userCardHeader} id={`bank-div-${bank._id}`} onClick={(e) => this.handleSelectBank(e, bank._id)}>
                        <Avatar variant="rounded" className={classes.bankImage} src={bank.BankImage}>{classes.bankName}</Avatar>
                        <div className={classes.bankName}>
                            {bank.BankName}
                        </div>
                        <IconButton className={classes.expandMore} onClick={(e) => this.handleSelectBank(e, bank._id)}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </div>
                    <div className={classes.carouselHolder} style={cardCarouselStyle}>
                        {carousel}
                    </div>
                    <Divider />
                </>
            )
        })
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
                    {list}
                </div>
            )
        }
    }
}
export default withStyles(useStyles)(SelectCard)