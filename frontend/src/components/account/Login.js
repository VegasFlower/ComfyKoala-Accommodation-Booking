import React, {Component} from 'react';
import { Link,Redirect } from  'react-router-dom';
import AuthHeader from "./authHeader";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import Alert from "../Alert/alert";

class Login extends Component {
    state = {
        username:'',
        password:'',
    };
    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    render() {
        const { isLogin, user } = this.props.auth;
        if(isLogin && user && user.usertype === 1){
            return <Redirect to="/" />
        }else if(isLogin && user && user.usertype === 2) {
            return <Redirect to="/owneraccommodation"/>
        }
        const { username , password } = this.state;
        return (
            <div>
                {/*<Alert />*/}
                <AuthHeader />
                <div className="col-md-4 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Login</h2>
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
                                    <label>Password</label>
                                    <input type="password" className="form-control"
                                           onChange={this.onChange}
                                           name = "password"
                                           value={password}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            <p>
                                Don't have an account?<Link to="/register">Register</Link><br/>
                                Forget password? <Link to="/reset">Reset</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ login })(Login);