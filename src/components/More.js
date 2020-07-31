import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import more from '../assets/images/more.svg';

const useStyles = (theme) => ({
    root: {
        width: "100%",
    },
    iconButton: {
        paddingTop: "1vw",
        paddingBottom: "1vw",
        width: "15vw",
        height: '15vw',
    },
    imageHolder: {
        width: "7vw",
        height: "4vw",
        border: "1px solid #cacaca",
        borderRadius: "2vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        position: "absolute",
        width: "5vw",
        maxHeight: '3vw',
    }
});

class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMore: false,
            anchorEl: null
        }
    }

    handleClickMore = (e) => {
        this.setState({ openMore: true, anchorEl: e.currentTarget })
    }
    handleMoreClose = () => {
        this.setState({ openMore: false })
    }
    handleDeleteCard = () => {

    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <IconButton className={classes.iconButton} aria-label="more" onClick={(e) => this.handleClickMore(e)}>
                        <div className={classes.imageHolder}>
                            <img className={classes.image} src={more} />
                        </div>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={this.state.openMore}
                        onClose={this.handleMoreClose}
                        PaperProps={{
                            style: {
                                width: '30vw',
                                marginRight: "10vw"
                            },
                        }}
                    >
                        <Button onClick={(e) => this.handleDeleteCard(e)}>
                            刪除卡片
                        </Button>
                    </Menu>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(More)