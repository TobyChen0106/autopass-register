import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import Badge from '@material-ui/core/Badge';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DoneIcon from '@material-ui/icons/Done';
import AppTitle from './AppTitle';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import small實體券 from "../assets/small實體券.png";
import small信用卡 from "../assets/small信用卡.png";
import small電子票證 from "../assets/small電子票證.png";
import small行動支付 from "../assets/small行動支付.png";
import 實體券 from "../assets/實體券.png";

import 一卡通 from "../assets/一卡通.png";
import 有錢卡 from "../assets/有錢卡.png";
import 悠遊卡 from "../assets/悠遊卡.png";

import 悠遊付 from "../assets/悠遊付.png";
import 街口支付 from "../assets/街口支付.png";
import 愛金卡 from "../assets/愛金卡.png";
import 台灣Pay from "../assets/台灣 Pay.png";
import 歐付寶 from "../assets/歐付寶.png";
import 橘子支付 from "../assets/橘子支付.png";
import HappyGo from "../assets/Happy Go.png";
import icashpay from "../assets/icash pay.png";
import LINEpay from "../assets/LINE pay.png";
import Pi錢包 from "../assets/Pi 錢包.png";
import 簡單行動支付 from "../assets/簡單付.png";


const useStyles = (theme) => ({
    root: {
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    cardImageHolder: {
        width: "100%",
        marginBottom: "5%",
        display: "flex",
        justifyContent: "center"
    },
    cardImage: {
        width: "90%",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    card: {
        width: "95vw",
        marginLeft: "2.5vw",
        marginRight: "2.5vw",
    },
});

class MainInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
    }

    handleClickMore = (e, index) => {
        this.setState({ openMore: index, anchorEl: e.currentTarget })
    }

    render() {
        const { classes } = this.props;
        const data = () => {
            switch (this.props.triple) {
                case "實體券":
                    return {
                        avatar: small實體券,
                        title: `實體券`,
                        subtitle: ``,
                        image: 實體券
                    };
                case "行動支付":
                    const pay = this.props.pay_list.find(p => p._id === this.props.tripleCardorPayID)
                    var payImage;
                    switch (pay.payName) {
                        case "悠遊付":
                            payImage = 悠遊付; break;
                        case "街口支付":
                            payImage = 街口支付; break;
                        case "愛金卡":
                            payImage = 愛金卡; break;
                        case "台灣 Pay":
                            payImage = 台灣Pay; break;
                        case "歐付寶":
                            payImage = 歐付寶; break;
                        case "橘子支付":
                            payImage = 橘子支付; break;
                        case "Happy Go Pay":
                            payImage = HappyGo; break;
                        case "i cash Pay":
                            payImage = icashpay; break;
                        case "LINE Pay":
                            payImage = LINEpay; break;
                        case "Pi 拍錢包":
                            payImage = Pi錢包; break;
                        case "簡單行動支付":
                            payImage = 簡單行動支付; break;
                    }
                    return {
                        avatar: small行動支付,
                        title: `行動支付`,
                        subtitle: `綁定 ${pay.payName}`,
                        image: payImage
                    };
                case "信用卡":
                    const card = this.props.card_list.find(c => c._id === this.props.tripleCardorPayID)
                    return {
                        avatar: small信用卡,
                        title: `信用卡`,
                        subtitle: `綁定 ${card.cardName}`,
                        image: card.cardImage
                    };
                case "悠遊卡":
                    return {
                        avatar: small電子票證,
                        title: `悠遊卡`,
                        subtitle: `悠遊卡`,
                        image: 悠遊卡
                    };
                case "一卡通":
                    return {
                        avatar: small電子票證,
                        title: `一卡通`,
                        subtitle: `一卡通`,
                        image: 一卡通
                    };
                case "有錢卡":
                    return {
                        avatar: small電子票證,
                        title: `有錢卡`,
                        subtitle: `有錢卡`,
                        image: 有錢卡
                    };
                case "愛金卡":
                    return {
                        avatar: small電子票證,
                        title: `愛金卡`,
                        subtitle: `愛金卡`,
                        image: 愛金卡
                    };
                default:
                    return null;
            }
        }

        const tripleInfo = (<ListItem>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Bank" className={classes.avatar} src={data().avatar}>
                            ?
                        </Avatar>
                    }
                    title={data().title}
                    subheader={data().subheader}
                />
                <div className={classes.cardImageHolder}>
                    <img className={classes.cardImage} src={data().image} />
                </div>
            </Card>
        </ListItem>)

        return (
            <div className={classes.root}>
                <List subheader={<ListSubheader>我的三倍券領取方式 (卡伯會依此進行優惠推薦)</ListSubheader>} className={classes.root}>
                    <ListItem>
                        <ListItemIcon>
                            <PhonelinkRingIcon />
                        </ListItemIcon>
                        <ListItemText id={`setting-cards`}
                            primary={`更改三倍券使用方式`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" onClick={this.props.handleSetTriple}>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    {tripleInfo}
                </List>
            </div>
        )
    }
}
// 
export default withStyles(useStyles)(MainInfo)