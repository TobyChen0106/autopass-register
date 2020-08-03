import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import emptyImage from '../assets/images/empty.png';
import More from './More';

const useStyles = (theme) => ({
    root: {
        width: "89vw",
        paddingLeft: "9vw",
    },
    title: {
        fontSize: "6vw",
        color: "#3c3c3c"
    },
    userCard: {
        marginTop: "2.5vw",
        marginBottom: "5vw",
    },
    userCardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "15vw",
    },
    bankImage: {
        width: "12vw",
    },
    bankName: {
        width: "62vw",
        paddingLeft: "3vw",
        fontSize: "5vw",
        userSelect: "none"
    },
    cardImageHolder: {
        margin: "0vw 11vw",
        width: "60vw",
        height: "auto",
    },
    cardImage: {
        width: "100%",
        borderRadius: "7vw"
    },
    cardNameHolder: {
        width:"82vw",
        height:"8vw",
        position: "relative",
    },
    cardName: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "5vw",
    }
});


class UserCardList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        const userCards = this.props.cardList.filter(c => this.props.userCards.find(_c => _c === c._id)).map((card, index) => {
            const bank = this.props.bankList.find(b => b._id === card.BankID);
            console.log(bank);
            return (
                <div className={classes.userCard}>
                    <div className={classes.userCardHeader}>
                        <Avatar variant="rounded" className={classes.bankImage} src={bank.BankImage}>{classes.bankName}</Avatar>
                        <div className={classes.bankName}>
                            {bank.BankName}
                        </div>
                        <More />
                    </div>
                    <div className={classes.cardImageHolder}>
                        <img className={classes.cardImage} src={card.CardImage} alt="User Cards" />
                    </div>
                    <div className={classes.cardNameHolder}>
                        <div className={classes.cardName}>
                            {card.CardName}
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <b>我的信用卡</b>
                </div>
                {userCards}
            </div>
        )
    }
}
export default withStyles(useStyles)(UserCardList)