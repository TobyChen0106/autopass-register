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
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CancelIcon from '@material-ui/icons/Cancel';
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

class MainInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pay_list: [],
            ownPay: null,
            modalOpen: false,
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.setState({ pay_list: this.props.pay_list.sort(this.sortPay) })
    }

    hadleSelectPay = (e, payID) => {
        e.preventDefault();
        this.setState({ modalOpen: true, ownPay: payID })
    }

    handleCloseModal = () => {
        this.setState({ modalOpen: false, ownPay: null })
    }

    handleConfirm = () => {
        this.props.updateUserOnePay(this.state.ownPay);
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
            const selected = this.state.ownPay === i._id;
            const done = selected ? `已選擇` : null;
            return (
                <>
                    <ListItem onClick={(e) => this.hadleSelectPay(e, i._id)}>
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
                        是否確認以此行動支付綁定三倍券?
                    </Typography>
                    <Button style={{ backgroundColor: "rgb(37,151,226)", color: "#fff" }} onClick={this.handleConfirm}>確認</Button>
                </div>
            </Card>);
        return (
            <List subheader={<ListSubheader>綁定行動支付</ListSubheader>} className={classes.root}>
                <Divider />
                {list}
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleCloseModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {modal}
                </Modal>
            </List>
        )
    }
}
export default withStyles(useStyles)(MainInfo)