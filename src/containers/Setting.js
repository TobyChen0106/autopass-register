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

import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import Switch from 'react-router-transition-switch';
import Fader from 'react-fader';
import Divider from '@material-ui/core/Divider';
import { withAlert } from "react-alert";
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
            pay_list: [],
            loadingUser: true,
            loadingCard: true,
            loadingBank: true,
        };

    }
    componentWillMount = () => {
        liff.init({
            liffId: "1654462018-w48j1o5n"
        }).catch(function (error) {
            console.log("[Error] " + error);
        }).then(() => {
            // if (!liff.isLoggedIn()) {
            //     liff.login({ redirectUri: ("https://setting.cardbo.info/") });
            // }
        }).catch(function (error) {
            console.log("[Error] " + error);
        }).then(
            // () => liff.getProfile()
        ).catch(function (error) {
            console.log("[Error] " + error);
        }).then((profile2) => {
            const profile = {
                userId: "U879a5cb6920a17888301f36935418744",
                displayName: "Toby",
                pictureUrl: "",
            };
            if (!profile) {
                console.log("USER PROFILE ERROR!");
            } else {
                if (profile) {
                    this.setState(
                        { loadingUser: false,  loadingCard: false ,  loadingBank: false  }
                    );
                    // fetch('/api/getUserProfile', {
                    //     method: 'POST',
                    //     body: JSON.stringify({
                    //         lineID: profile.userId,
                    //         displayName: profile.displayName,
                    //         userImage: profile.pictureUrl,
                    //     }),
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
                    //     console.log(data)
                    //     this.setState(
                    //         { user: data, loadingUser: false }
                    //     );
                    // });
                } else {
                    alert("無法取得使用者ID!");
                    this.setState(
                        { loadingUser: false }
                    );
                }

                // fetch('/api/getCards').catch(function (error) {
                //     console.log("[Error] " + error);
                // }).then(
                //     res => {
                //         if (res.ok) {
                //             return res.json()
                //         }
                //         else {
                //             return null;
                //         }
                //     }
                // ).then((data) => {
                //     this.setState(
                //         { card_list: data, loadingCard: false }
                //     );
                // });

                // fetch('/api/getBanks').catch(function (error) {
                //     console.log("[Error] " + error);
                // }).then(
                //     res => {
                //         if (res.ok) {
                //             return res.json()
                //         }
                //         else {
                //             return null;
                //         }
                //     }
                // ).then((data) => {
                //     this.setState(
                //         { bank_list: data, loadingBank: false }
                //     );
                // });

                // fetch('/api/getPays').catch(function (error) {
                //     console.log("[Error] " + error);
                // }).then(
                //     res => {
                //         if (res.ok) {
                //             return res.json()
                //         }
                //         else {
                //             return null;
                //         }
                //     }
                // ).then((data) => {
                //     this.setState(
                //         { pay_list: data, loadingPay: false }
                //     );
                // });
            }
        })
    }
    componentDidMount() {
        // window.addEventListener("beforeunload", this.handleCloseTab);
    }

    componentWillUnmount() {
        // window.removeEventListener('beforeunload', this.handleCloseTab);
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
            this.props.alert.success(`已綁定: ${cardName}`);
            new_user.ownCards = [cardID, ...this.state.user.ownCards]
        }
        fetch('/api/updateUser', {
            method: 'POST',
            body: JSON.stringify(new_user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        }).then(
            res => {
                if (res.ok) {
                    console.log("ok")
                    return res.json()
                }
                else {
                    return null;
                }
            }
        ).then((data) => {
            this.setState(
                { user: data }
            );
        });
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
                                    // bank_list={this.state.bank_list}
                                    // card_list={this.state.card_list}
                                    bankList={banks}
                                    cardList={cards}
                                    userName = {this.state.user.displayName}
                                    ownCards={this.state.user.ownCards} />
                            )} />
                        <Route exact={true} path="/selectcard"
                            render={(props) => (
                                <SelectCard
                                    {...props}
                                    updateUserCards={this.updateUserCards}
                                    bankList={banks}
                                    cardList={cards}
                                    userName = {this.state.user.displayName}
                                    ownCards={this.state.user.ownCards}/>
                            )} />
                    </Switch>
                </div >
            );
        }
    }
}
export default withAlert()(withStyles(useStyles)(Setting));