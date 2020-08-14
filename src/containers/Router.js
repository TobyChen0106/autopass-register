import React, { Component, useHistory } from 'react';
//images
import autopass_logo from '../images/logo.png';
import ReactLoading from 'react-loading';

// material ui
import { withStyles } from '@material-ui/core/styles';

// components
import SelectCard from '../components/SelectCard';
import SearchSelectCard from '../components/SearchSelectCard';
import UserCards from '../components/UserCards';
import OfferDataInfo from '../components/OfferDataInfo';
import RouterRedirect from './RouterRedirect';

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

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                lineid: "",
                displayname: "Toby",
                email: "",
                owncards: [],
            },
            bankList: [],
            cardList: [],
            offerData: {
                id: "",
                cardid: "",
                bankname: "",
                cardname: "錯誤",
                cardimage: "",
                rewardmethod: "查無優惠資訊。",
                rewardconstraint: "",
                rewardcontent: "",
                parkinglot: [],
                rewardlink: "",
                deeplink: ""
            },
            loadingUser: true,
            loadingBank: true,
            loadingCard: true,
        };
    }
    componentWillMount = () => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');
        const value = params.get('value');
        liff.init({
            liffId: "1654394004-vp1Nnyx0"
        }).catch(function (error) {
            console.log("[Error] " + error);
        }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: (`https://autopass.cardbo.info/?page=${page}&value=${}`) });
            }
        }).catch(function (error) {
            console.log("[Error] " + error);
        }).then(
            () => liff.getProfile()
        ).catch(function (error) {
            console.log("[Error] " + error);
        }).then(
            (profile) => {
                const new_profile = profile;
                const tokenData = liff.getDecodedIDToken();
                new_profile.email = tokenData.email ? tokenData.email : "";
                return new_profile;
            }
        ).catch(function (error) {
            console.log("[Error] " + error);
        }).then((profile) => {
            // const profile = {
            //     userId: "U879a5cb6920a17888301f36935418744",
            //     displayName: "Toby",
            //     email: "toby@cardno.info",
            // };
            if (!profile) {
                console.log("USER PROFILE ERROR!");
            } else {
                if (profile) {
                    this.setState(
                        { loadingUser: false }
                    );
                    axios.post('https://data.cardbo.info/autopass-api/update-user/?key=UPEvbZ8dPPc7JABil1FVvnufbMniK9dTs3JFMq6wm2kXx6WQ53Pd5boftdzNka0T', {
                        lineid: profile.userId,
                        displayName: profile.displayName,
                        email: profile.email,
                    }).then(
                        res => res.data
                    ).then(data => {
                        if (data) {
                            if (data.owncards === null) {
                                data.owncards = [];
                            }
                            this.setState({ user: data, loadingUser: false });
                        }
                    }).catch(error => console.log(error));
                    axios.post('https://data.cardbo.info/autopass-api/insert-useraction/?key=j5VAcaF9fWZfmJGqjh87fD81rZUo1pZUQ1QQCqo2NAv8wsca5dPeoGtbP9A3iEZe', {
                        lineid: profile.userId,
                        action: "LIFF User Visit Page",
                        value: `${page}${value ? `-${value}` : ""}`
                    }).then(
                        res => res.data
                    ).then(data => {
                        // if (data) {
                        //     console.log(data);
                        // }
                    }).catch(error => console.log(error));
                } else {
                    alert("無法取得使用者ID!");
                    this.setState(
                        { loadingUser: false }
                    );
                }
            }
        })
        if (page === "cards" || page === "search") {
            axios.get('https://data.cardbo.info/autopass-api/getbanks/?key=B1a4TMjOe7VBeETcttvj1oSU6yJwHUMJdXURcITjH9Jor1viZCm1wzyUkQNwTuJ8').then(
                res => res.data
            ).then(data => {
                if (data) {
                    this.setState({ bankList: data, loadingBank: false });
                    // setTimeout(this.setState({ loadingBank: false }), 500)
                }
            }).catch(error => console.log(error));
            axios.get('https://data.cardbo.info/autopass-api/getcards/?key=C5tyrugsa5M3qLYaPxvJ5QfqKiTIxAwem4Jz3vSbxKS73ZIzvCw6HJbsRoYer0cT').then(
                res => res.data
            ).then(data => {
                if (data) {
                    this.setState({ cardList: data, loadingCard: false });
                    // setTimeout(this.setState({ loadingCard: false }), 500)
                }
            }).catch(error => console.log(error));
        } else if (page === "info") {
            axios.get(`https://data.cardbo.info/autopass-api/getofferdatas/?key=6w3NcT2L1jz7dQRtXd8mGVzeO6xPgep0EsvPEbs9dme4pj3fcP6bfnYlXODsxJz8&offerid=${value}`).then(
                res => res.data && res.data.name !== "error" ? res.data[0] : null
            ).then(offerdata => {
                if (offerdata && offerdata.name !== "error") {
                    axios.get(`https://data.cardbo.info/autopass-api/getcards/?key=C5tyrugsa5M3qLYaPxvJ5QfqKiTIxAwem4Jz3vSbxKS73ZIzvCw6HJbsRoYer0cT&cardid=${offerdata.cardid}`).then(
                        res => res.data[0]
                    ).then(carddata => {
                        if (carddata) {
                            axios.get(`https://data.cardbo.info/autopass-api/getbanks/?key=B1a4TMjOe7VBeETcttvj1oSU6yJwHUMJdXURcITjH9Jor1viZCm1wzyUkQNwTuJ8&bankid=${carddata.bankid}`).then(
                                res => res.data[0]
                            ).then(bankdata => {
                                if (bankdata) {
                                    offerdata.bankname = bankdata.bankname;
                                    offerdata.cardname = carddata.cardname;
                                    offerdata.cardimage = carddata.cardimage;
                                    this.setState({
                                        offerData: offerdata,
                                        loadingBank: false,
                                        loadingCard: false
                                    });
                                }
                            }).catch(error => console.log(error));
                        }
                    }).catch(error => console.log(error));
                }
            }).catch(error => console.log(error));
        }
        this.setState({ page: page });
    }

    updateUserCards = (cardID, cardName) => {
        var new_user = this.state.user;
        console.log(new_user)
        if (this.state.user.owncards.find(c => c === cardID)) {
            new_user.owncards = this.state.user.owncards.filter(c => c !== cardID);

            axios.post('https://data.cardbo.info/autopass-api/insert-useraction/?key=j5VAcaF9fWZfmJGqjh87fD81rZUo1pZUQ1QQCqo2NAv8wsca5dPeoGtbP9A3iEZe', {
                lineid: this.state.user.lineid,
                action: "LIFF User Delete Card",
                value: `${cardID}`
            }).then(
                res => res.data
            ).then(data => {
                // if (data) {
                //     console.log(data);
                // }
            }).catch(error => console.log(error));

            axios.post('https://data.cardbo.info/autopass-api/update-user/?key=UPEvbZ8dPPc7JABil1FVvnufbMniK9dTs3JFMq6wm2kXx6WQ53Pd5boftdzNka0T', {
                lineid: this.state.user.lineid,
                deleteCards: [cardID]
            }).then(
                res => res.data
            ).then(data => {
                if (data) {
                    if (data.lineid === this.state.user.lineid) {
                        if (data.owncards === null) { data.owncards = [] };
                        if (data.owncards != this.state.user.owncards) {
                            this.setState({ user: data });
                        }
                    }
                }
            }).catch(error => console.log(error));
        } else {
            this.props.alert.success(`${cardName}`);
            new_user.owncards = [cardID, ...this.state.user.owncards];

            axios.post('https://data.cardbo.info/autopass-api/insert-useraction/?key=j5VAcaF9fWZfmJGqjh87fD81rZUo1pZUQ1QQCqo2NAv8wsca5dPeoGtbP9A3iEZe', {
                lineid: this.state.user.lineid,
                action: "LIFF User Add Card",
                value: `${cardID}`
            }).then(
                res => res.data
            ).then(data => {
                // if (data) {
                //     console.log(data);
                // }
            }).catch(error => console.log(error));

            axios.post('https://data.cardbo.info/autopass-api/update-user/?key=UPEvbZ8dPPc7JABil1FVvnufbMniK9dTs3JFMq6wm2kXx6WQ53Pd5boftdzNka0T', {
                lineid: this.state.user.lineid,
                addCards: [cardID]
            }).then(
                res => res.data
            ).then(data => {
                if (data) {
                    if (data.lineid === this.state.user.lineid) {
                        if (data.owncards === null) { data.owncards = [] };
                        if (data.owncards != this.state.user.owncards) {
                            this.setState({ user: data });
                        }
                    }
                }
            }).catch(error => console.log(error));
        }
        this.setState({ user: new_user });
    }

    searchCard = (cardID, cardName, bankName) => {
        axios.post('https://data.cardbo.info/autopass-api/insert-useraction/?key=j5VAcaF9fWZfmJGqjh87fD81rZUo1pZUQ1QQCqo2NAv8wsca5dPeoGtbP9A3iEZe', {
            lineid: this.state.user.lineid,
            action: "LIFF User Search Card",
            value: `${cardID}`
        }).then(
            res => res.data
        ).then(data => {
            if (data) {
                console.log(data);
            }
            liff.sendMessages([
                {
                    type: 'text',
                    text: `麻吉，請幫我看看『${bankName} ${cardName}』的優惠`
                }
            ]).catch((err) => {
                console.log('error', err);
            }).then(() => {
                liff.closeWindow();
            });
        }).catch(error => console.log(error));
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
                <Switch component={Fader}>
                    <Route exact={true} path="/"
                        render={(props) => (
                            <RouterRedirect
                                {...props}
                                page={this.state.page}
                            />
                        )} />
                    <Route exact={true} path="/cards"
                        render={(props) => (
                            <UserCards
                                {...props}
                                updateUserCards={this.updateUserCards}
                                bankList={this.state.bankList}
                                cardList={this.state.cardList}
                                userName={this.state.user.displayname}
                                ownCards={this.state.user.owncards} />
                        )} />
                    <Route exact={true} path="/cards/selectcard"
                        render={(props) => (
                            <SelectCard
                                {...props}
                                updateUserCards={this.updateUserCards}
                                bankList={this.state.bankList}
                                cardList={this.state.cardList}
                                userName={this.state.user.displayname}
                                ownCards={this.state.user.owncards} />
                        )} />
                    <Route exact={true} path="/search"
                        render={(props) => (
                            <SearchSelectCard
                                {...props}
                                searchCard={this.searchCard}
                                bankList={this.state.bankList}
                                cardList={this.state.cardList}
                                userName={this.state.user.displayname}
                                ownCards={this.state.user.owncards} />
                        )} />
                    <Route exact={true} path="/info"
                        render={(props) => (
                            <OfferDataInfo
                                {...props}
                                offerData={this.state.offerData}
                            />
                        )} />
                </Switch>
            );
        }
    }
}
export default withAlert()(withStyles(useStyles)(Router));