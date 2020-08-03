import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import Badge from '@material-ui/core/Badge';
import Carousel from "react-multi-carousel";

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import "react-multi-carousel/lib/styles.css";

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
        // marginTop: '0',
    },
    avatarHolder: {
        paddingTop: "1rem",
        paddingBottom: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgb(37,151,226)",
        background: "linear-gradient(0deg, rgba(37,151,226,1) 0%, rgba(53,152,218,1) 10%, rgba(9,122,197,1) 49%, rgba(9,122,197,1) 100%)",
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginRight: theme.spacing(2),
        borderRadius: "10%"
    },
    displayName: {
        color: "#fff",
        fontSize: "1.2rem",
        marginTop: "0.5rem"
    },
    doneIcone: {
        width: "20px",
        height: "20px",
        backgroundColor: "#5CA9F8",
        color: "white",
        borderRadius: "50%",
    },
    cardCarousel: {
        overflow: "hidden",
        transition: "height 0.3s ease-in-out",
    },
    card: {
        width: "35vw",
        margin: "5%",
        display: "flex col",
        alignItems: "center"
    },
    cardHolder: {
        width: "100%",
        height: 'auto',
        // maxWidth: "100%",
        // boxShadow: "0 0 5px 5px #2fc4b2",
    },
    cardImage: {
        width: "100%",
        borderRadius: "2.5vw",
        // maxWidth: "100%",
        // boxShadow: "0 0 5px 5px #2fc4b2",
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
    modalTextFieldHolder: {
        width: "90vw",
        maxHeight: "90vh",
        backgroundColor: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "scroll",
    },
    CardContent: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2rem",
        marginBottom: "2rem",
    },
});

class SelectOneCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBankdCarouselIndex: null,
            ownCard: null,
            modalOpen: false,
        }
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

    handleSelectCard = (e, cardID) => {
        e.preventDefault();
        this.setState({ modalOpen: true, ownCard: cardID })
    }

    handleCloseModal = () => {
        this.setState({ modalOpen: false, ownCard: null })
    }

    handleConfirm = () => {
        this.props.updateUserOneCard(this.state.ownCard);
    }

    render() {
        const { classes } = this.props;
        const list = this.props.bank_list.filter(b => b.BankCards.length !== 0 && b.BankName !== "電子票證").map((i, index) => {
            const cardCarouselStyle = i._id === this.state.showBankdCarouselIndex ? { height: "40vw" } : { height: "0" };

            const carouselCards = this.props.card_list.filter(c => c.BankID === i._id);
            return (
                <div id={`bank-div-${i._id}`}>
                    <ListItem onClick={(e) => this.handleSelectBank(e, i._id)}>
                        <ListItemIcon>
                            <Badge
                                classes={{ badge: classes.doneIcone }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                color="secondary"
                                badgeContent={null}>
                                <Avatar className={classes.avatar} alt="Card" src={i.BankImage} />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText id={`setting-cards`}
                            primary={i.BankName}
                            secondary={`(${i.BankCode})`} />
                    </ListItem>
                    <div style={cardCarouselStyle} className={classes.cardCarousel}>
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            responsive={{
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
                            }}
                            ssr={true} // means to render carousel on server-side.
                            infinite={false}
                            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                            // autoPlaySpeed={1000}
                            keyBoardControl={true}
                            transitionDuration={200}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            focusOnSelect={false}
                        >
                            {carouselCards.map((c, index) => {
                                const selected = this.state.ownCard === c._id;
                                return (
                                    <div id={`card-div-${c.CardName}`} className={classes.card} onClick={(e) => this.handleSelectCard(e, c._id)}>
                                        <Badge
                                            classes={{ badge: classes.doneIcone }}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            color="secondary"
                                            badgeContent={selected ? <DoneIcon style={{ fontSize: 20 }} /> : null}>

                                            <div className={classes.cardHolder}>
                                                <img className={classes.cardImage} src={c.CardImage} style={selected ? { boxShadow: "0 0 5px 5px #5CA9F8" } : null} />
                                            </div>

                                        </Badge>
                                        <div className={classes.CardName}>{c.CardName}</div>
                                    </div>
                                )
                            })}

                        </Carousel>
                    </div>
                    <Divider />
                </div>
            )
        })
        const modal = (
            <Card className={classes.modalTextFieldHolder}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings" onClick={this.handleCloseModal}>
                            <CancelIcon />
                        </IconButton>
                    }
                />
                <div className={classes.CardContent}>
                    <Typography variant="body1" color="textSecondary" component="p">
                        是否確認以此卡片綁定三倍券?
                    </Typography>
                    <Button style={{ backgroundColor: "rgb(37,151,226)", color: "#fff" }} onClick={this.handleConfirm}>確認</Button>
                </div>
            </Card>);
        return (
            <div className={classes.root}>
                <List subheader={<ListSubheader>{this.state.type === "setone" ? `選擇三倍券綁定的信用卡` : `綁定信用卡`}</ListSubheader>} className={classes.root}>
                    <Divider />
                    {list}
                </List>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleCloseModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {modal}
                </Modal>
            </div>
        )
    }
}
export default withRouter(withStyles(useStyles)(SelectOneCard))