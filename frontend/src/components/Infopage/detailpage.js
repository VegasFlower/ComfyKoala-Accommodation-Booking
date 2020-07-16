import React, {Component} from 'react';
import { connect } from "react-redux";
import { showPropertyInfo,updateComment} from "../../actions/show";
import Rating from "@material-ui/lab/Rating";
import Header from "../common/header";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import { Link,Redirect } from "react-router-dom";
import {BookProperty} from "../../actions/show";
import Alert from "../Alert/alert";
import Pet from "./icon/pet.png"
import Car from "./icon/car.png"
import Owner from "./icon/owner.png"
// import Divider from "./icon/divider.png"
import Price from "./icon/cash.svg"
import Bond from "./icon/bond.svg"
import Address from "./icon/map.svg"
import Category from "./icon/house.png"
import Chatroom from "../common/Chatroom";


class Detailpage extends Component {

    state = {
        comment:"",
        rate:0,
        back:false,
        isComment:false,
        Book:false,
    };

    componentDidMount() {
        if(this.props.id){
            this.props.showPropertyInfo(this.props.id)
        }
    }


    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

    onChangeInt = e => this.setState({
        rate:e.target.value,
        // isComment:false
    });

    onSubmitComment = (e) => {
        e.preventDefault();
        const {comment,rate} = this.state;
        this.props.updateComment(this.props.id,comment,parseFloat(rate));
        this.setState({
            isComment:true
        })
        setTimeout(()=>{
            this.props.showPropertyInfo(this.props.id);
        },500)
    };

    onClick = () =>{
        this.setState({
            back:true,
            // isComment:false
            })
    }

    onBookClick = (e) =>{
        e.preventDefault();
        // this.props.requestBook(this.props.user.id,this.props.user.username,this.props.Detail.address,this.props.id);
        this.props.BookProperty(this.props.id);
        this.setState({
            Book:true,
            // isComment:false
        })
    }


    render() {
        if(this.state.back === true){
            this.state.back = false
            return <Redirect to="/information" />
        }

        return (
            <div>
                <Header />
                {/*<Alert />*/}
                <div>
                    <br></br>
                        <button onClick={this.onClick}  type="button" className="btn btn-primary btn-sm"  name = "back" >
                            Back
                        </button>
                    <br></br>
                    <div className="col-md-6 m-auto" >
                        <div className="card card-body mt-6">
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active" >
                                        <img  src={`data:image/png;base64,${this.props.Detail.photos[0]}`} className="d-block w-100" alt="..." height="200px" />
                                    </div>
                                    {this.props.Detail.photos.map((url,index) =>(
                                        <div key={index} className="carousel-item" >
                                            <img key={index} src={`data:image/png;base64,${url}`} className="d-block w-100" alt="..." height="200px" />
                                        </div>
                                    ))}

                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                                   data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                                   data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop:20
                            }}>
                                Rate:
                                <Rating name="half-rating-read"  value={this.props.Detail.rate} precision={0.5} readOnly/>
                            </div>
                            <div style={{
                                paddingTop:20
                            }}>
                                <div style={{
                                    paddingTop:15,
                                    marginLeft:2,
                                    fontSize:20
                                }}>
                                    <img src={Owner} width="25px"/> &ensp; Owner:&nbsp;{this.props.Detail.owner}
                                </div>

                                <div className="row justify-content-start" style={{paddingTop:10,fontSize:18}}>
                                    <div className="col-md-4">
                                        &nbsp;<img src={Car} width="22px"/> &ensp; Parking:{this.props.Detail.parking? " YES":" NO"}
                                    </div>
                                    <div className="col-md-4">
                                        <img src={Pet} width="25px"/> &ensp; Pet allow:{this.props.Detail.pet_allow? " YES":" NO"}
                                    </div>
                                </div>


                                <div className="row justify-content-start" style={{paddingTop:15,fontSize:18}}>
                                    <div className="col-md-4">
                                        &nbsp;<img src={Price} width="23px"/> &nbsp;&ensp;Price:&nbsp;${this.props.Detail.price}
                                    </div>
                                </div>
                                <div className="row justify-content-start" style={{paddingTop:10,fontSize:18}}>
                                    <div className="col-md-4">
                                        &nbsp;<img src={Bond} width="22px"/>&ensp;&ensp;Bond:&nbsp;${this.props.Detail.bond}
                                    </div>
                                </div>
                                <div className="row justify-content-start" style={{paddingTop:9,fontSize:18}}>
                                    <div className="col-md-4">
                                        &nbsp;<img src={Address} width="21px"/>&ensp;&ensp;Address:&nbsp;{this.props.Detail.address}
                                    </div>
                                </div>
                                <div className="row justify-content-start" style={{paddingTop:8,fontSize:18}}>
                                    <div className="col-md-4">
                                        &nbsp;<img src={Category} width="22px"/>&ensp;&ensp;Category:&nbsp;{this.props.Detail.category}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='col-md-6 m-auto'>
                        <div className="card card-body mt-6">
                            <h5> More details</h5>
                            <div style={{fontSize:17,lineHeight: 0.3}}>
                                <p>
                                    Description:&nbsp;{this.props.Detail.description}
                                </p>
                                <p>
                                    Least period:&nbsp;{this.props.Detail.least_period}
                                </p>
                                <p>
                                    Start date:&nbsp;{this.props.Detail.start_date}
                                </p>
                                <h5>Review:</h5>
                                {this.props.Detail.comments.map((result,index)=>(
                                    <List style={{
                                        width: '100%',
                                        maxWidth: '40ch',
                                    }}>
                                        <ListItem alignItems="flex-start" key={result.id}>
                                            <ListItemAvatar>
                                                <Avatar>{result.author[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <React.Fragment>
                                                        <Rating name="half-rating-read" value={result.rate} precision={0.5} readOnly/>
                                                        <Typography variant="caption" display="block" gutterBottom>
                                                            {result.date}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            variant="subtitle1" gutterBottom
                                                            style={{display: 'inline'}}
                                                            color="textPrimary"
                                                        >
                                                            {result.content}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" key={index}/>
                                    </List>
                                ))}
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-md-6 m-auto" >
                        <div className="card card-body mt-6">
                            <form onSubmit={this.onSubmitComment}>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Rating</label>
                                    <div className="col-sm-10">
                                        <Rating name="size-medium" onChange={this.onChangeInt}  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword"  className="col-sm-2 col-form-label">Comment</label>
                                    <div className="col-sm-10">
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              onChange={this.onChange} name="comment" rows="3"></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className='col-md-2 m-auto' style={{
                        display:"flex",
                        justifyContent: "space-between"
                    }}>
                        <button type="button" className="btn btn-primary " onClick={this.onBookClick}>Book</button>
                        <button type="button" className="btn btn-primary "  data-toggle="modal" data-target="#staticBackdrop2">Contact owner</button>
                    </div>
                    <div className="modal fade" id="staticBackdrop2" data-backdrop="static" tabIndex="-1" role="dialog"
                         aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Email</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h3>Owner Email:{this.props.Detail.email}</h3>
                                    {/*<Chatroom />*/}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    id:state.search.id,
    Detail:state.show.property,
    isCommentUpdated:state.show.isCommentUpdated,
    user:state.auth.user
});


export default connect(mapStateToProps,{ updateComment,showPropertyInfo,BookProperty })(Detailpage);
