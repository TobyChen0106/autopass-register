import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = (theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95vw",
        height: "20vw",
        paddingLeft: "3vw",
        paddingRight: "2vw",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 200,
        // backgroundColor: "#fff",
        backgroundColor: "#F5F5F5",
        boxShadow: "0px -1px 1px 1px #f0f0f0"
    },
    title: {
        fontSize: "3.2vw",
        color: "#3c3c3c"
    },
    buttonHolder: {

    },
    backButton: {
        // margin: "0.5vw",
        // padding: "1vw",
        width: "6vw"
    },
});


class Warning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    render() {
        const { classes } = this.props;
        const style = this.state.show ? { visibility: "visible" } : { visibility: "hidden" };
        return (
            <div className={classes.root} style={style}>
                <div className={classes.title} style={style}>
                    {this.props.content}
                </div>
                <div className={classes.buttonHolder} style={style}>
                    <IconButton className={classes.backButton} onClick={() => this.setState({ show: false })}>
                        <ClearIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(Warning)