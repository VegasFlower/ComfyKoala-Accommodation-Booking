import React, {Component} from 'react';
import { Link,Redirect } from 'react-router-dom';
import AuthHeader from "./authHeader";
import { connect } from 'react-redux';
import { register } from "../../actions/auth";
import Alert from "../Alert/alert";


class Register extends Component {
    state = {
        username:'',
        password:'',
        email:'',
        usertype:'',
        password2:'',
    };

    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

    handleOnchange = (e)=>{
        if(e.target.id === "student"){
            this.setState({
                usertype:parseInt(e.target.value)
            })
        }else if(e.target.id === "landlord"){
            this.setState({
                usertype:parseInt(e.target.value)
            })
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const { username,email,password,password2,usertype} = this.state;
        if(password !== password2){
            alert('Password not match!')
        }else{
            const newuser = {
                username,
                password,
                email,
                usertype,
            };
            this.props.register(newuser);
        }
    };
    render() {
        const { isRegister, user } = this.props.auth;
        if (isRegister === true) {
            this.props.auth.isRegister = null;
            return <Redirect to="/login" />
        }
        const { username,email,password,password2} = this.state;
        return (
            <div>
                {/*<Alert />*/}
                <AuthHeader />
                <div className="col-md-4 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <fieldset className="form-group">
                            <div className="row">
                                <legend className="col-form-label col-sm-4 pt-0">Usertype</legend>
                                <div className="col-sm-10">
                                    <div className="custom-control custom-radio">
                                        <input className="form-check-input" id="student" type="radio" name="usertype"
                                               onChange={this.handleOnchange}
                                               value='1' />
                                            <label className="form-check-label">
                                                Student
                                            </label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="form-check-input" id="landlord" type="radio" name="usertype"
                                               onChange={this.handleOnchange}
                                               value='2' />
                                            <label className="form-check-label">
                                                Landlord
                                            </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, { register })(Register);