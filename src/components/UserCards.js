import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserInfoCard from './UserInfoCard';
import UserCardEmpty from './UserCardEmpty';
import UserCardList from './UserCardList';


const useStyles = (theme) => ({
    root: {
        width: "100%",
    },
});

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Toby",
            userCards: [
                // "card1", "card2", "card3"
            ]
        }
    }
    componentDidMount = () => {
        window.scrollTo(0, 0);
        
    }
    handleClickMore = (e, index) => {
        this.setState({ openMore: index, anchorEl: e.currentTarget })
    }
    handleMoreClose = () => {
        this.setState({ openMore: null })
    }
    handleDeleteCard = (e, cardID) => {
        e.preventDefault()
        this.props.updateUserCards(cardID)
    }
    render() {
        const { classes } = this.props;
        const usercard = this.props.ownCards.length === 0 ?
            (<UserCardEmpty
                userCards={this.props.ownCards}
                cardList={this.props.cardList}
                bankList={this.props.bankList}
            />) :
            (<UserCardList
                userCards={this.props.ownCards}
                cardList={this.props.cardList}
                bankList={this.props.bankList}
                handleDeleteCard={this.handleDeleteCard}
            />);
        return (
            <div className={classes.root} >
                <UserInfoCard
                    userName={this.props.userName}
                    numCards={this.props.ownCards.length}
                />
                {usercard}
            </div>
        )
    }
}
export default withStyles(useStyles)(UserCard)