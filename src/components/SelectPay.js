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

const useStyles = (theme) => ({
    root: {
        width: '100vw',
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
        backgroundColor: "#5CA9F8",
        color: "white",
        borderRadius: "50%",
    },
    cardImage: {
        width: "20vw",
        height: "20vw",
        borderRadius: "2.5vw",
        marginRight: "5vw",
    },
});

class MainInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pay_list: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.setState({pay_list: this.props.pay_list.sort(this.sortPay)})
    }

    hadleSelectPay = (e, payID, payName) => {
        e.preventDefault();
        this.props.updateUserPays(payID, payName);
    }

    sortPay = (a, b) => {
        if (this.props.ownPays.find(f => f === a._id))
            return -1
        else if (this.props.ownPays.find(f => f === b._id))
            return 1
        else 
        return 0
    }

    render() {
        const { classes } = this.props;
        const list = this.state.pay_list.map((i, index) => {
            // const done = this.state.selectedPays.findIndex(f => f === index) === -1 ? null : (<DoneIcon className={classes.doneIcone} style={{ fontSize: 20 }} />);
            const selected = this.props.ownPays.findIndex(f => f === i._id) !== -1;
            const done = selected ? `已選擇` : null;
            return (
                <>
                    <ListItem onClick={(e) => this.hadleSelectPay(e, i._id, i.PayName)}>
                        <ListItemIcon>
                            <Badge
                                classes={{ badge: classes.doneIcone }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                color="secondary"
                                badgeContent={selected ? <DoneIcon style={{ fontSize: 10 }} /> : null}>
                                <img className={classes.cardImage} src={i.PayImage} style={selected ? { boxShadow: "0 0 5px 5px #5CA9F8" } : null} />
                            </Badge>
                            {/* <Avatar className={classes.avatar} alt="Pay" src={i.payImage} /> */}
                        </ListItemIcon>
                        <ListItemText id={`setting-cards`}
                            primary={i.PayName}
                            secondary={null} />
                        {done}
                    </ListItem>
                    <Divider />
                </>
            )
        })

        return (
            <List subheader={<ListSubheader>綁定行動支付</ListSubheader>} className={classes.root}>
                <Divider />
                {list}
            </List>
        )
    }
}
export default withStyles(useStyles)(MainInfo)