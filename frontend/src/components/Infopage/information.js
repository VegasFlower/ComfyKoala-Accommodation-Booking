import React, {Component, Fragment} from 'react';
import Header from "../common/header";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { searchInfo,getPropertyId } from "../../actions/search";
import { showPropertyInfo } from "../../actions/show";
import '../styles.css'
import Alert from "../Alert/alert";
import Rating from "@material-ui/lab/Rating";
import Chatbot from "../common/chatbot";


class Information extends Component {
    state = {
        go:false,
        suburb:"",
        order:'',
    };

    componentDidUpdate(prevProps) {
        this.props.searchResult.filter(id => id === this.props.id).map(info=>{
            if(info.rate !== prevProps.searchResult.filter(id => id === this.props.id).rate) {
                this.props.searchInfo(this.state.suburb,this.state.order);
            }
        })
    }

    onOrderchange = (e) =>{
        e.preventDefault();
        if(e.target.value === "date"){
            this.setState({
                order:"date"
            })
        }else if(e.target.value === "price"){
            this.setState({
                order:"price"
            })
        }else if(e.target.value === "") {
            this.setState({
                order: ""
            })
        }
    }

    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

    onSubmit = (e) => {
        e.preventDefault();
        const {suburb,order} = this.state;
        this.props.searchInfo(suburb,order);
    };

    onClickId = (e) => {
        this.props.getPropertyId(e.target.value);
        this.props.showPropertyInfo(e.target.value);
        this.setState({
            go:true
        })
    };


    // handleChangeState = (e) =>{
    //     if(e.target.name === "go"){
    //         this.setState({
    //             go:true
    //         })
    //     }else if(e.target.name === "back"){
    //         this.setState({
    //             go:false
    //         })
    //     }
    // }

    render() {
        const { suburb } = this.state;
        if(this.props.isShowed === true && this.state.go === true) {
            return <Redirect to={'/detailpage/'+ String(this.state.id)}/>
        }

        const Resultpage = (
            <div style={{marginTop:20}}>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-6">
                        {this.props.searchResult.map((result,index) => (
                            <div className="card infoCard_hover" key={index} >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div style={{
                                                paddingTop:20
                                            }}>
                                                <h4 className="card-title">Price:{result.price}$</h4>
                                                <h5 className="card-title">Address:{result.address}</h5>
                                                <p className="card-text">Category:{result.category}</p>
                                                <p className="card-text">Property id:{result.id}</p>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                paddingTop:20
                                            }}>
                                                Rate:
                                                <Rating name="half-rating-read" value={result.rate} precision={0.5} readOnly/>
                                            </div>

                                                <button type="button" value={result.id} name="go" onClick={this.onClickId} className="btn btn-sm btn-primary" >
                                                    More
                                                </button>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <img className="img-rounded" src={`data:image/png;base64,${result.photos[0]}`} alt="sans"
                                                 width="200px"
                                                 height="200px"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer w-100 text-muted">
                                    start date:{result.start_date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <Header />
                {/*<Alert></Alert>*/}
                <div>
                    <form class="form-inline" style={{marginLeft:"23%"}} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control card_hover"
                                   name="suburb"
                                   onChange={this.onChange}
                                   value={suburb}
                                   placeholder="Search..."
                                   style={styles.inputContainer}
                            />
                        </div>
                        <div className="col-md-1 mb-2">
                            <label htmlFor="inputState">Sort</label>
                            <select className="form-control" onChange={this.onOrderchange}>
                                <option value="" defaultChecked>-</option>
                                <option value="date" >Date</option>
                                <option value='price'>Price</option>
                            </select>
                        </div>
                    </form>
                </div>
                {Resultpage}
                <Chatbot />
            </div>
        );
    }
}

const styles = {
    inputContainer:{
        width: 550,
        height: 40,
        boxSizing:"border-box",
        padding:"0 20px",
        marginLeft:"30%",
        marginTop:"2%",
        outline:"none",
        opacity:0.8,
        border:"0.5px solid #000000",
        background:"#eee",
        fontSize:"14px"
    }
};


const mapStateToProps = state => ({
    searchResult: state.search.data,
    isGot:state.search.isGot,
    isShowed:state.show.isShowed,
    Detail:state.show.property,
    isSearched:state.search.isSearched,
    id:state.search.id
});


export default connect(mapStateToProps, { searchInfo, getPropertyId,showPropertyInfo })(Information);