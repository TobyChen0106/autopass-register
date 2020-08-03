import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import Badge from '@material-ui/core/Badge';
import Fade from 'react-reveal/Fade';
import AppTitle from './AppTitle';
import { Redirect } from "react-router-dom";

const useStyles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alianItems: "center",
        margin: "10%"
    },
    customBadge: {
        backgroundColor: "#2fc4b2",
        color: "white"
    },
    button: {
        marginTop: "2rem",
        backgroundColor: "#097AC5"
    }
});

class SetSimpleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: undefined,
            data: undefined
        }
    }
    componentWillMount = () => {
        const params = new URLSearchParams(this.props.location.search);
        const type = params.get('type');
        this.setState({
            type: type,
            infoValid: false,
            redirect: false,
            cityOptions: [
                "臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市", "新竹縣", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣", "基隆市", "新竹市", "嘉義市"
            ],
        });
    }
    componentDidMount= ()=>{
        window.scrollTo(0, 0)
    }
    handleDataChange = (e) => {
        const info = e.target.value;
        switch (this.state.type) {
            case "phone":
                const phoneno = /^([0]{1}[9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*$/;
                const phoneno2 = /^\+?([0-9]{2,3})[-. ]*([9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})[-. ]*([0-9]{1})$/;

                this.setState({
                    infoValid: info.match(phoneno) || info.match(phoneno2),
                    data: info
                })

                break;
            case "city":
                this.setState({
                    infoValid: (e.target.textContent !== ""),
                    data: e.target.textContent
                })
                break;
            case "email":
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const result = re.test(String(info).toLowerCase());
                this.setState({
                    infoValid: result,
                    data: info
                });

                break;
        }

    }
    handleSave = () => {
        this.props.updateInfo({ type: this.state.type, data: this.state.data })
        this.setState({ redirect: true })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }
        const { classes } = this.props;

        var dataLabel = null;
        switch (this.state.type) {
            case "phone":
                dataLabel = `設定手機號碼`;
                break;
            case "city":
                dataLabel = `設定所在城市`;
                break;
            case "email":
                dataLabel = `設定電子郵件`;
                break;
        }
        const saveButton = this.state.infoValid ?
            <Fade style={{ width: "100%" }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={this.handleSave}
                >
                    確認
                </Button>
            </Fade> : null;

        const inputField = this.state.type === "city" ?
            (<Autocomplete
                id="combo-box-demo"
                fullWidth
                options={this.state.cityOptions}
                getOptionLabel={(option) => option}
                onChange={this.handleDataChange}
                renderInput={(params) =>
                    <TextField {...params}
                        fullWidth
                        onChange={this.handleDataChange}
                        id="simple-info-textfield"
                        label={dataLabel}
                        variant="outlined"
                    />}
            />) :
            (<TextField
                onChange={this.handleDataChange}
                fullWidth
                id="simple-info-textfield"
                label={dataLabel}
                variant="outlined"
            />)
        if (!this.state.type) {
            return <></>
        }
        return (
            <form className={classes.root} >
                <Badge
                    classes={{ badge: classes.customBadge }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    color="secondary"
                    badgeContent={this.state.infoValid ? <DoneIcon style={{ fontSize: 10 }} /> : null}>
                    {inputField}
                </Badge>
                {saveButton}
            </form>
        )
    }
}
export default withStyles(useStyles)(SetSimpleInfo)