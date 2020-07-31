import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link, withRouter } from "react-router-dom";
import "./AppTitle.css"


const useStyles = (theme) => ({
    root: {
        paddingBottom: "2rem",
        background: "rgb(37,151,226)",
        background: "linear-gradient(0deg, rgba(37,151,226,1) 0%, rgba(53,152,218,1) 10%, rgba(9,122,197,1) 49%, rgba(9,122,197,1) 87%, rgba(35,137,205,1) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    avatarHolder: {
        paddingTop: "3rem",
        display: "flex",
        justifyContent: "center"
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    buttonGroupHolder: {
        zIndex: "10",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
    },
    buttonGroup: {
        background: "rgba(9,122,197,1)",
        height: "2.5rem",
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    },
    buttonGroupSpacer: {
        background: "rgba(9,122,197,1)",
        height: "1.5rem",
        width: "100%",
    },
    button: {
        textColor: "#fff",
        primaryTextColor: "#fff",
    }
});

class AppTitle extends Component {
    constructor(props) {
        super(props);
    }
    handleBack = () => {
        const pathArr = this.props.location.pathname.split('/').filter(p => p)
        
        if (pathArr.length === 0) {
            console.log("close liff")
            this.props.handleCloseSetting()
        } else {
            var endPath = "/";
            for (var i = 0; i < pathArr.length - 1; ++i) {
                endPath += pathArr[i]
                endPath += "/"
            }
            this.props.history.push(endPath)
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.buttonGroupHolder}>
                    <div className={classes.buttonGroup}>
                        <Button size="large" style={{ color: "#fff", width: "25vw" }} onClick={this.handleBack} >返回</Button>
                        <Button size="large" style={{ color: "#fff", width: "50vw", fontSize: "1.2rem" }} onClick={() => window.scrollTo(0, 0)}>卡伯設定</Button>
                        <Button size="large" style={{ color: "#fff", width: "25vw", visibility: "hidden" }}>確定</Button>
                    </div>
                    {/* <div className={classes.buttonGroupSpacer}>123</div> */}
                </div>
            </div>
        )
    }
}
export default withRouter(withStyles(useStyles)(AppTitle))