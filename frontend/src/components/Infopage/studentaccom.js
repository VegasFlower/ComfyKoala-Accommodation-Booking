import React, {Component, Fragment } from 'react';
import Header from "../common/header";
import { connect } from 'react-redux';
import { loadstudentinfo,cancelBooking } from "../../actions/display";
import Rating from "@material-ui/lab/Rating";
import Alert from "../Alert/alert";

class Studentaccom extends Component {
    componentDidMount() {
        this.props.loadstudentinfo()
    }
    render() {
        return (
            <div>
                <Header />
                {/*<Alert />*/}
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-6">
                        {this.props.studentpros.map(info => (
                            <div className="card" key={info.booking_id}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div style={{
                                                paddingTop:20
                                            }}>
                                                <h5 className="card-title">Address:{info.address}</h5>
                                                <p className="card-text">Category:{info.category}</p>
                                                <p className="card-text">Owner:{info.owner}</p>
                                                <p className="card-text">Price:{info.price}$</p>
                                                <p className="card-text">Bond:{info.bond}$</p>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                paddingTop:20
                                            }}>
                                                Rate:
                                                <Rating name="half-rating-read" value={info.rate} precision={0.5} readOnly/>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                paddingTop:20
                                            }}>
                                                <a className="btn btn-danger" onClick={(e)=>{
                                                    this.props.cancelBooking(info.booking_id)
                                                    setTimeout(()=>{
                                                        this.props.loadstudentinfo()
                                                    },500)
                                                }}>Cancel</a>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <img className="img-rounded" src={`data:image/png;base64,${info.photos[0]}`} alt="sans"
                                                 width="200px"
                                                 height="200px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studentpros: state.display.booking_list
});



export default connect(mapStateToProps,{ loadstudentinfo,cancelBooking })(Studentaccom);