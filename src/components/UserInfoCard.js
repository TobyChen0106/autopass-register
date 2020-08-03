import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import more from '../assets/images/more.svg';
import { Link } from 'react-router-dom';

const useStyles = (theme) => ({
    root: {
        width: "82vw",
        padding: "5vw 9vw",
    },
    title: {
        fontSize: "7vw",
        color: "#3c3c3c"
    },
    infoCard: {
        // height: "24vw",
        height: "auto",
        border: "1px solid #cacaca",
        borderRadius: "5vw",
        margin: "3vw 0",
        padding: "5vw",
        display: "flex",
        justifyContent: "space-between",
    },
    user: {
        marginTop: "2.2vw",
        width: "30vw",
    },
    userName: {
        fontSize: "7vw",
        wordWrap: "break-all",
    },
    userCards: {
        fontSize: "3.8vw",
    },
    moreCardContainer: {
        width: "40vw",
        position: "relative",
    },
    moreCard: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    moreCardButton: {
        width: "38vw",
        height: "14vw",
        borderRadius: "7vw",
        fontSize: "4vw",
        backgroundColor: "#FFF4C2",
        color: "#FF9F00",
        '&:hover': {
            backgroundColor: '#FFF4C2',
        },
        '&:active': {
            backgroundColor: '#FFF4C2',
        },
    }
});


class UserInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        const userCards = this.props.numCards === 0 ?
            (<>{`您尚未`}<br />{`儲存信用卡`}</>) : (<>{`您已加入`}<br />{`${this.props.numCards} 張信用卡`}</>);
        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <b>管理我的信用卡</b>
                </div>
                <div className={classes.infoCard}>
                    <div className={classes.user}>
                        <div className={classes.userName}>
                            <b>{this.props.userName}</b>
                        </div>
                        <div className={classes.userCards}>
                            {userCards}
                        </div>
                    </div>
                    <div className={classes.moreCardContainer}>
                        <div className={classes.moreCard}>
                            <Button component={Link} to={'/selectcard'} className={classes.moreCardButton}><b>+更多信用卡</b></Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(UserInfoCard)