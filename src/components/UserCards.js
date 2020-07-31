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

import More from './More'
import UserInfoCard from './UserInfoCard'
import UserCardEmpty from './UserCardEmpty'
import UserCardList from './UserCardList'

import {cards} from '../containers/db_for_cards.js';
const useStyles = (theme) => ({
    root: {
        width: "100%",
    },

});

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Jung",
            userCards: [
                "card1", "card2", "card3"
            ]
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
    }
    handleClickMore = (e, index) => {
        this.setState({ openMore: index, anchorEl: e.currentTarget })
    }
    handleMoreClose = () => {
        this.setState({ openMore: null })
    }

    handleDeleteCard = (e, cardID) => {
        console.log("delete")
        e.preventDefault()
        this.props.updateUserCards(cardID)
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <UserInfoCard
                    userName={this.state.userName}
                    numCards={this.state.userCards.length}
                />
                <UserCardList
                    userCards={this.state.userCards}
                    cardList={cards} />
            </div>
        )
    }
}
export default withStyles(useStyles)(UserCard)