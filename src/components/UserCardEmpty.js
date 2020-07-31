import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import emptyImage from '../assets/images/empty.png';

const useStyles = (theme) => ({
    root: {
        width: "82vw",
        padding: "0vw 9vw",
    },
    title: {
        fontSize: "6vw",
        color: "#3c3c3c"
    },
    moreCardContainer: {
        width: "45vw",
        position: "relative",
    },
    imageHolder: {
        marginLeft: "23.5vw",
        marginRight: "23.5vw",
        marginTop: "5vw",
        marginBottom: "1vw",
        width: "35vw",
        height: "auto",
    },
    image: {
        width: "100%",
    },
    noCard: {
        marginBottom: "8vw",
        fontSize: "4.5vw",
        textAlign: "center",
        color: "#999",
        width: "100%",
    },
    moreCard: {
        width: "100%",
    },
    moreCardButton: {
        width: "78vw",
        margin: "0 2vw",
        height: "14vw",
        borderRadius: "7vw",
        fontSize: "5vw",
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


class UserCardEmpty extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        const userCards = this.props.numCards === 0 ?
            (<>{`您尚未`}<br />{`儲存信用卡`}</>) : (<>{`您已加入`}<br />{`${this.props.numCards} 張信用卡`}</>);
        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <b>我的信用卡</b>
                </div>
                <div className={classes.imageHolder}>
                    <img className={classes.image} src={emptyImage} alt="Empty Cards" />
                </div>
                <div className={classes.noCard}>
                    <b>您尚未儲存信用卡</b>
                </div>
                <div className={classes.moreCard}>
                    <Button className={classes.moreCardButton}><b>馬上去新增信用卡</b></Button>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(UserCardEmpty)