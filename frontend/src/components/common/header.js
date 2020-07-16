import React, {Component} from 'react';
import { Headerwapper,Head,Logo, Home ,Info,Accomd } from "../style";
import Avatar from "@material-ui/core/Avatar";
import { BookProperty,rejectBook,acceptBook,RequestBookingInfo } from "../../actions/show";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout,updateProfile } from "../../actions/auth";
import Alert from "../Alert/alert";
import IconButton from "@material-ui/core/IconButton";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {loadUser} from "../../actions/auth";


class Header extends Component {

    state = {
        email:'',
        password:'',
        updateFinish:false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.auth.user.username !== this.props.auth.user.username){
            this.props.loadUser()
        }
    }
    componentDidMount() {
       if(this.props.auth.user.usertype == 2){
           this.props.RequestBookingInfo()
       }
    }

    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

    onSubmit = e => {
        e.preventDefault();
        this.props.updateProfile(this.state.username, this.state.password);
        this.setState({
            updateFinish:true
        })
    };

    onAccept = (user_id,property_id,action) =>{
        this.props.acceptBook(user_id,property_id,action)
    }

    onReject = (user_id,property_id,action) =>{
        this.props.rejectBook(user_id,property_id,action)
    }

    render() {
        const { isAuthenticated, user ,user_info } = this.props.auth;
        if(isAuthenticated === null ){
            return <Redirect to="/login" />
        }
        // if(isProfileUpdated === true && this.state.updateFinish === true){
        //     alert("update success!");
        //     this.state.updateFinish = false
        // // }
        // if(user.usertype === 1){
        //     const userheader = (
        //         <Link to = "/myaccommodation">
        //             <Accomd>
        //                 My accommodation
        //             </Accomd>
        //         </Link>
        //     )
        // }else if(user.usertype === 2){
        //     const ownerheader = (
        //         <Link to = "/myaccommodation">
        //             <Accomd>
        //                 My accommodation
        //             </Accomd>
        //         </Link>
        //     )
        //
        // }

        const {email,password} = this.state
        return (
            <div>
                {/*<Alert />*/}
                <Headerwapper>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                    <Home>
                        <a className="cool-link">
                            Home
                        </a>
                    </Home>
                    </Link>
                    <Link to="/information"style={{ textDecoration: 'none' }} >
                    <Info>
                        <a className="cool-link">
                            Information
                        </a>
                    </Info>
                    </Link>
                    <Logo href="/"/>
                    <Head>
                        { user && user.usertype === 1 ?
                            (<Link to = "/studentaccommodation" style={{ textDecoration: 'none' }}>
                            <Accomd>
                                <a className="cool-link">
                                    My Accommodations
                                </a>
                            </Accomd>
                        </Link>) : (<Link to = "/owneraccommodation" style={{ textDecoration: 'none' }}>
                                <Accomd>
                                    <a className="cool-link">
                                        My Accommodations
                                    </a>
                                </Accomd>
                            </Link>)
                        }
                        {user && user.usertype === 1 ? '':
                            <div data-toggle="modal" data-target="#exampleModal" style={{marginLeft:5}}>
                            <IconButton aria-label="show 17 new notifications" color="primary">
                                <Badge badgeContent={this.props.number} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </div>
                        }
                        <div data-toggle="modal" data-target="#staticBackdrop">
                            <Avatar>{user ? `${user.username[0]}` : ""}</Avatar>
                        </div>
                    </Head>
                </Headerwapper>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Notification</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.requester ? this.props.requester.map( info =>(
                                    <div className="card" style={{width:"18rem"}} key={info.user_id}>
                                        <div className="card-body">
                                            <p className="card-title">{info.user_name} want to book {info.address}</p>
                                            <a href="#" onClick={(e) =>{
                                                this.onAccept(info.user_id, info.property_id,"accept")
                                                setTimeout(()=>{
                                                    this.props.RequestBookingInfo()
                                                },500)
                                            }} className="btn btn-sm btn-primary" data-dismiss="modal">Accept</a>
                                            <a href="#" onClick={(e) => {
                                                this.onReject(info.user_id, info.property_id,"reject")
                                                setTimeout(()=>{
                                                    this.props.RequestBookingInfo()
                                                },500)
                                            }} className="btn btn-sm btn-danger"  data-dismiss="modal">Cancel</a>
                                        </div>
                                    </div>
                                )) :''
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog"
                     aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Profile</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-md-2 m-auto">
                                    <Avatar>{user ? `${user.username[0]}` : ""}</Avatar>
                                    <h4>{user ?user.username:''}</h4>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={this.onChange}
                                            value={email}
                                            placeholder={user ?user.email:''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>New password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={this.onChange}
                                            value={password}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.logout} >Logout</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    requester: state.show.requester,
    number:state.show.number
});



export default connect(mapStateToProps,{ logout,updateProfile,BookProperty,rejectBook,loadUser,RequestBookingInfo,acceptBook })(Header);