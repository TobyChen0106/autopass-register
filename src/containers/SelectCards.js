
import React, { Component } from 'react';
import './SelectCards.css'
//images

import autopass_image from '../images/autopass-logo.png'
// material-UI
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';
//loading
import ReactLoading from 'react-loading';

// components
import SelectList from '../components/SelectList'
import AppTitle from '../components/AppTitle'
import SaveFooter from '../components/SaveFooter'

// Liff
const liff = window.liff;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // profile: undefined,
            profile: {
                displayName: "Toby",
                userId: "1234"
            },
            OS: undefined,

            userCards: [],
            cards: [{
                bank: '',
                card: '',
                cardID: '',
                selectedBank: null,
                selectedCard: null,
                options: []
            }],

            bank_list: [],
            card_list: [],
            loading: true,

            select_card_height: 550 * 0.33,
            select_card_width: 550 * 0.5,
            select_card_list_width: 550 * 0.9,
            window_width: 550,
            window_height: 850,
            enable_select_index: -1
        };

    }

    componentDidMount() {
        this.handleResizeWindow();

        this.setState({
            bank_list: ['台新銀行', '渣打銀行', '彰化銀行', '花旗銀行', '第一銀行', '遠東商銀', '聯邦銀行', '永豐銀行', '元大銀行', '上海商銀', '台北富邦', '兆豐銀行',
                '新光銀行', '中國信託', '星展銀行', '華南銀行', '陽信銀行', '滙豐銀行', '日盛銀行', '國泰世華', '合作金庫', '臺灣企銀',
                '王道銀行', '台灣樂天', '凱基銀行', '玉山銀行', '臺灣銀行', '台中商銀', '土地銀行', '安泰銀行', '三信銀行', '高雄銀行', '華泰銀行',
                '美國運通']
        });
        liff.init({ liffId: '1653657893-0l6vwVAx' }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: "https://autopass-cards.herokuapp.com/" });
            }
        }).then(
            () => liff.getOS()
        ).then(
            (OS) => { this.setState({ OS: OS }) }
        ).then(
            () => liff.getProfile()
        ).then((profile) => {
            if (!profile.userId) {
                window.alert("USER ID ERROR!");
            } else {
                this.setState({
                    profile: profile
                });
            }
            console.log(profile);
        }).then(()=>{
            this.setState({ loading: false });
        });
        window.addEventListener('resize', this.handleResizeWindow);
    }
    handleResizeWindow = () => {
        this.setState({ window_width: window.innerWidth, window_height: window.innerHeight });
        if (window.innerWidth * 0.33 < 198) {
            this.setState({ select_card_height: window.innerWidth * 0.33 });
        } else {
            this.setState({ select_card_height: 200 });
        }
        if (window.innerWidth * 0.6 < 306) {
            this.setState({ select_card_width: window.innerWidth * 0.51 });
        } else {
            this.setState({ select_card_width: 300 });
        }
        if (window.innerWidth * 0.9 < window.innerHeight * 0.8) {
            this.setState({ select_card_list_width: window.innerWidth * 0.9 });
        } else {
            this.setState({ select_card_list_width: window.innerHeight * 0.8 });

        }
        // console.log( window.innerWidth, window.innerHeight);
    }
    formOnSubmit = () => {
        // if (this.state.age === 0) {
        //     window.alert('請輸入年齡!');
        // }
        // else if (!this.state.agreeCheck) {
        //     window.alert('請閱讀並同意使用者服務條款!');
        // } else {
        //     var userCards = this.state.cards.filter(card => card.card !== '' && card.bank !== '').map((i, index) => (
        //         this.state.allCards.filter(card => card.cardName === i.card && card.bankName === i.bank)[0].cardID
        //     ));
        //     // console.log(userCards)

        //     const newUser = {
        //         lineID: this.state.userId,
        //         displayName: this.state.displayName,
        //         nickName: this.state.nickName,
        //         age: this.state.age,
        //         gender: this.state.gender,
        //         cards: userCards,
        //     };
        //     fetch('/api/users', {
        //         method: 'POST',
        //         body: JSON.stringify(newUser),
        //         headers: new Headers({
        //             'Content-Type': 'application/json'
        //         })
        //     }).catch(function (error) {
        //         window.alert("[Error] " + error);
        //     }).then(() => {
        //         if (this.state.OS !== 'web') {
        //             liff.sendMessages([{
        //                 type: 'text',
        //                 text: "Done!"
        //             }]).catch(function (error) {
        //                 window.alert("Error sending message: " + error);
        //             }).then(() => {
        //                 liff.closeWindow();
        //             });
        //         }
        //     });
        // }
    }


    handleCancel = (e, id) => {
        var new_cards = this.state.cards;
        new_cards.splice(id, 1)
        this.setState({ cards: new_cards })
        console.log(id)
    }

    render() {

        // const classes = useStyles();
        const Row = (bankName, index, style) => (
            <div style={style} className="card-image-card-holder" onClick={(e) => this.handleSelectCard(e, bankName, index)}>
                <div className="card-image-card">
                    <img className="card-image" />
                    {`${bankName}-card-${index}`}
                </div>
            </div >
        );

        const divStyle = (index) => (
            { display: this.state.enable_select_index == index ? 'flex' : 'none' }
        );

        if (this.state.loading) {
            // if (true) {
            return (
                <div className="my-loading">
                    <ReactLoading type={'balls'} color={'#ffffff'} height={'20vh'} width={'20vw'} />
                </div>)
        }
        else {
            return (
                <div className="select-cards-container">
                    <AppTitle
                        logo={autopass_image}
                        title={`麻吉福利社`}
                        subtitle={`${this.state.profile.userId}，您可以在這裡選擇您擁有的卡片:`}
                    />
                    <SelectList
                        bank_list={this.state.bank_list}
                        select_card_list_width={this.state.select_card_list_width}
                        select_card_height={this.state.select_card_height}
                        select_card_width={this.state.select_card_width}
                    />
                    <SaveFooter
                        formOnSubmit={this.formOnSubmit}
                        saveButtonName={`儲存`}
                    />
                </div>
            );
        }
    }
}
export default App;