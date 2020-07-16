import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

export class Alert extends Component {
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            alert.error("Fail");
        }

        if (message !== prevProps.message) {
            if (message.loginsuccess) alert.success(message.loginsuccess);
            if (message.regeistersuccess) alert.success(message.regeistersuccess);
            if (message.uploadsuccess) alert.success(message.uploadsuccess);
            if (message.booksuccess) alert.success(message.booksuccess);
            if (message.deletesuccess) alert.success(message.deletesuccess);
            if (message.updatepropertysuccess) alert.success(message.updatepropertysuccess);
            if (message.commentsuccess) alert.success(message.commentsuccess);
            if (message.cancelsuccess) alert.success(message.cancelsuccess);
            if (message.approvesuccess) alert.success(message.approvesuccess);
            if (message.rejectsuccess) alert.success(message.rejectsuccess);
            if (message.resetsuccess) alert.success(message.resetsuccess);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.error,
    message: state.message
});

export default connect(mapStateToProps)(withAlert()(Alert));