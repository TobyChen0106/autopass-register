import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cardboLogo from '../assets/images/cardbo-logo.png'
import Button from '@material-ui/core/Button';
const useStyles = (theme) => ({
    root: {
        width: "100%",
        color: "#3c3c3c"
    },
    warning: {
        width: "100vw",
        height: "15vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        boxShadow: "0px 1px 1px 1px #f0f0f0"
    },
    warningContent: {
        margin: "5.5vw",
        fontSize: "3.3vw",
    },
    cardbo: {
        display: "flex",
        marginTop: "2vw",
        marginLeft: "60vw",
        alignItems: "center",
        justifyContent: "center",
    },
    cardboLogoHolder: {
        width: "8vw",
        height: "8vw",
    },
    cardboLogo: {
        width: "100%"
    },
    cardboContent: {
        fontSize: "4vw"
    },
    offerContentRoot: {
        width: "82vw",
        marginLeft: "9vw",
    },
    bankName: {
        fontSize: "8vw"
    },
    cardName: {
        fontSize: "8vw"
    },
    cardImageHolder: {
        margin: "2vw 0",
        width: "40vw",
    },
    cardImage: {
        width: "100%"
    },
    parkingLotList: {
        width: "91vw",
        display: "flex",
        flexWrap: "wrap "
    },
    parkingLot: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1vw 0.5vw",
        width: "21vw",
        height: "7vw",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: "#FF9F00",
        backgroundColor: "#FFF4C2",
        borderRadius: "4vw",
        fontSize: "3.5vw",
        color: "#FF9F00",
        '&:hover': {
            backgroundColor: '#FFF4C2',
        },
        '&:active': {
            backgroundColor: '#FFF4C2',
        },
    },
    rewardMethod: {
        marginTop: "3vw",
        display: "flex",
        fontSize: "5vw",
    },
    rewardContent: {
        marginTop: "1vw",
        width: "82vw",
        fontSize: "5vw",
    },
    rewardconstraint: {
        fontSize: "4vw",
        marginTop: "5vw",
        marginBottom: "40vw",
        color: "#999999"
    },
    deeplinkHolder: {
        backgroundColor: "#fff",
        boxShadow: "0px -5vw 6vw 2vw #fff",
        position: "fixed",
        width: "100vw",
        height: "25vw",
        left: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "top",
    },
    deeplinkButton: {
        width: "70vw",
        height: "14vw",
        borderRadius: "9vw",
        fontSize: "5vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#fed02f",
        color: "#FFF",
        '&:hover': {
            backgroundColor: '#fed02f',
        },
        '&:active': {
            backgroundColor: '#fed02f',
        },
    }
});

class OfferDataInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleClickMore = (e) => {
        this.setState({ openMore: true, anchorEl: e.currentTarget })
    }
    handleMoreClose = () => {
        this.setState({ openMore: false });
    }
    handleDeleteCard = (e) => {
        this.setState({ openMore: false });
        this.props.handleDeleteCard(e);
    }
    render() {
        const { classes } = this.props;
        const list = this.props.offerData.parkinglot.map(i => (
            <Button className={classes.parkingLot}>
                {i}
            </Button>
        ));
        return (
            <div className={classes.root}>
                <div className={classes.warning}>
                    <div className={classes.warningContent}>
                        免責聲明：本站信用卡免費市區停車之優惠資訊，整理自各信用卡之官網。個別場站是否適用優惠，依現場公告為準。
                    </div>
                </div>
                <div className={classes.cardbo}>
                    <div className={classes.cardboLogoHolder}>
                        <img className={classes.cardboLogo} src={cardboLogo} alt="Cardbo" />
                    </div>
                    <div className={classes.cardboContent}>
                        技術由<a href="https://line.me/R/ti/p/%40089clhec">卡伯</a>提供
                    </div>
                </div>

                <div className={classes.offerContentRoot}>
                    <div className={classes.bankName}>
                        <b>{this.props.offerData.bankname}</b>
                    </div>
                    <div className={classes.cardName}>
                        <b>{this.props.offerData.cardname}</b>
                    </div>
                    <div className={classes.cardImageHolder}>
                        <img className={classes.cardImage} src={this.props.offerData.cardimage} alt="Cardbo" />
                    </div>

                    <div className={classes.parkingLotList}>
                        {list}
                    </div>
                    <div className={classes.rewardMethod}>
                        <b>{this.props.offerData.rewardmethod}</b>
                    </div>

                    <div className={classes.rewardContent}>
                        {this.props.offerData.rewardcontent}
                    </div>
                    <div className={classes.rewardconstraint}>
                        限制條件： {this.props.offerData.rewardconstraint}
                    </div>
                </div>

                <div className={classes.deeplinkHolder}>
                    <Button className={classes.deeplinkButton} href={this.props.offerData.deeplink} target="_blank">
                        <b>於車麻吉查看停車場</b>
                    </Button>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(OfferDataInfo)