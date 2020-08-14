import React, { Component, useHistory } from 'react';
//images
import autopass_logo from '../images/logo.png';
import tick_image from '../images/tick.png';
import ReactLoading from 'react-loading';

// material ui
import { withStyles } from '@material-ui/core/styles';

// components
import AppTitle from '../components/AppTitle';
import SelectCard from '../components/SelectCard';
import UserCards from '../components/UserCards';

//DB
import { banks, cards, pays } from './db_for_cards';

import { Route } from "react-router-dom";
import Switch from 'react-router-transition-switch';
import Fader from 'react-fader';
import { withAlert } from "react-alert";
import axios from 'axios';
// Liff
const liff = window.liff;
const useStyles = (theme) => ({
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

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OS: undefined,
            user: {
                lineID: "",
                displayName: "Toby",
                userImage: undefined,
                email: undefined,
                ownCards: [],
            },
            bank_list: [],
            card_list: [],
            loadingUser: true,
            loadingCard: true,
            loadingBank: true,
        };

    }
    componentWillMount = () => {
        
    }

    handleCloseTab(e) {
        e.preventDefault();
        console.log("close tab");
        this.handleCloseSetting();
        (e || window.event).returnValue = "close tab"; //Gecko + IE
        return "close tab";
    }

    updateUserCards = (cardID, cardName) => {
        var new_user = this.state.user;

        if (this.state.user.ownCards.find(c => c === cardID)) {
            new_user.ownCards = this.state.user.ownCards.filter(c => c !== cardID)
        } else {
            this.props.alert.success(`${cardName}`);
            new_user.ownCards = [cardID, ...this.state.user.ownCards]
        }
        this.setState({ user: new_user });
        // fetch('/api/updateUser', {
        //     method: 'POST',
        //     body: JSON.stringify(new_user),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // }).catch(function (error) {
        //     console.log("[Error] " + error);
        // }).then(
        //     res => {
        //         if (res.ok) {
        //             console.log("ok")
        //             return res.json()
        //         }
        //         else {
        //             return null;
        //         }
        //     }
        // ).then((data) => {
        //     this.setState(
        //         { user: data }
        //     );
        // });
    }

    render() {
        const { classes } = this.props;
        if (this.state.loadingUser || this.state.loadingBank || this.state.loadingCard) {
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
        }
        else {
            return (
                <div>
                    <Switch component={Fader}>
                        <Route exact={true} path="/"
                            render={(props) => (
                                <UserCards
                                    {...props}
                                    updateUserCards={this.updateUserCards}
                                    bankList={this.state.bank_list}
                                    cardList={this.state.card_list}
                                    // bankList={banks}
                                    // cardList={cards}
                                    userName={this.state.user.displayName}
                                    ownCards={this.state.user.ownCards} />
                            )} />
                        <Route exact={true} path="/selectcard"
                            render={(props) => (
                                <SelectCard
                                    {...props}
                                    updateUserCards={this.updateUserCards}
                                    bankList={this.state.bank_list}
                                    cardList={this.state.card_list}
                                    userName={this.state.user.displayName}
                                    ownCards={this.state.user.ownCards} />
                            )} />
                    </Switch>
                </div >
            );
        }
    }
}
export default withAlert()(withStyles(useStyles)(Setting));