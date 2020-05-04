
import React, { Component } from 'react';
import './SelectList.css'

// material-UI
import { FixedSizeList } from 'react-window';

//images
import e_sun_image from '../images/banks/e.sun-bank.jpg'
import card_01 from '../images/cards/card-01.jpg'
class SelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{
                bank: '',
                card: '',
                cardID: '',
                selectedBank: null,
                selectedCard: null,
                options: []
            }],
            enable_select_index: -1,
            bank_list: this.props.bank_list
        };
    }
    handleSelectBank = (e, bankName, index) => {
        // console.log(bankName);
        if (index === this.state.enable_select_index) {
            this.setState({ enable_select_index: -1 });
        } else {
            this.setState({ enable_select_index: index });
        }
    }
    handleSelectCard = (e, bankName, index) => {
        console.log(bankName, index);
    }
    render() {
        // const classes = useStyles();
        const Row = (bankName, index, style) => (
            <div style={style} className="card-image-card-holder" onClick={(e) => this.handleSelectCard(e, bankName, index)}>
                <div className="card-image-card">
                    <img className="card-image" src={card_01}/>
                    {/* {`${bankName}-card-${index}`} */}
                </div>
            </div >
        );

        const divStyle = (index) => (
            { display: this.state.enable_select_index == index ? 'flex' : 'none' }
        );

        return (
            <div className="row bank-select-card-list-contaniner">
                {this.state.bank_list.map((bankName, index) => (
                    // <div className="bank-select-card-container">
                    <div className="bank-select-card" key={`bank-select-card-${index}`} >
                        <div className="bank-select-info" onClick={(e) => this.handleSelectBank(e, bankName, index)}>
                            <div className="bank-select-image"><img className="bank-select-image-src" src={e_sun_image} /></div>
                            <div classes="bank-select-bankInfo chinese-font">
                                <div className="bank-select-bankName chinese-font">{bankName}</div>
                                <div className="bank-select-info-title chinese-font">{`title`}</div>
                                <div className="bank-select-info-subtitle chinese-font">{`subtitle`}</div>
                            </div>
                        </div>
                        <div className="card-selet-container" style={divStyle(index)}>
                            <FixedSizeList
                                height={this.props.select_card_height}
                                itemCount={33}
                                itemSize={this.props.select_card_width}
                                layout="horizontal"
                                width={this.props.select_card_list_width}>
                                {({ index, style }) => Row(bankName, index, style)}
                            </FixedSizeList>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
export default SelectList;