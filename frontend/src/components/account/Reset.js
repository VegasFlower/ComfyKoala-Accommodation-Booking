import React, {Component} from 'react';
import { Link,Redirect } from 'react-router-dom';
import AuthHeader from "./authHeader";
import { connect } from "react-redux";
import { Resetpassword } from "../../actions/auth";
import Alert from "../Alert/alert";

class Reset extends Component {
    state = {
        username:'',
        email:'',
        password:"",

    };
    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

    onSubmit = e => {
        e.preventDefault();
        const {username,email,password} = this.state;
        this.props.Resetpassword(
            username,
            email,
            password,
        );
    };

    render() {
        const { username , email , password } = this.state;
        if (this.props.auth.isReset === true) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                {/*<Alert />*/}
                <AuthHeader />
                <div className="col-md-4 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Reset Password</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control"
                                       name="username"
                                       onChange={this.onChange}
                                       value={username}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control"
                                       onChange={this.onChange}
                                       name = "email"
                                       value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="form-control"
                                       onChange={this.onChange}
                                       name = "password"
                                       value={password}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps,{ Resetpassword })(Reset);