import React, {Component, Fragment } from 'react';
import Header from "../common/header";
import { connect } from 'react-redux';
import { loadownerinfo,deleteinfo } from "../../actions/display";
import { getUpdatePropertyId,updateProperty } from "../../actions/upload";
import {RequestBookingInfo} from "../../actions/show";
import { FilePond, registerPlugin } from 'react-filepond';
import Rating from '@material-ui/lab/Rating';
import { Chatwrapper } from "../style";
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {Link, Redirect} from "react-router-dom";
import {Accomd} from "../style";
import Alert from "../Alert/alert";
import Chatroom from "../common/Chatroom";
import Fab from "@material-ui/core/Fab";
import AdbIcon from "@material-ui/icons/Adb";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class Owneraccom extends Component {
    state = {
        Deleted:false,
        description:null,
        pet_allow:null,
        parking:null,
        feature:null,
        start_date:null,
        address:null,
        category:null,
        price:null,
        bond:null,
        least_period:null,
        formOpen:false
    }

    componentDidMount() {
        this.props.loadownerinfo();
        // this.props.RequestBookingInfo()
    }
    openForm =() =>{
        this.setState((prevState) => ({formOpen:!prevState.formOpen}))
    };
    //
    // componentDidUpdate() {
        // if(this.state.Deleted){
        //     this.props.loadownerinfo();
        // }
        // if(prevState.houseinfo.length !== this.props.houseinfo.length ){
        //     this.props.loadownerinfo();
        // }
        // prevProps.houseinfo.filter(id =>( id === this.props.id )).map(info=>{
        //     if(info.description.length !== this.state.description.length ||
        //        info.pet_allow !== this.state.pet_allow ||
        //         info.parking  !== this.state.parking ||
        //         info.feature  !== this.state.feature ||
        //     info.start_date !== this.state.start_date ||
        //     info.address[0] !== this.state.address[0] ||
        //     info.category !== this.state.category ||
        //     info.price !== this.state.price ||
        //     info.bond !== this.state.bond ||
        //     info.least_period !== this.state.least_period
        //     ){
        //         this.props.loadownerinfo();
        //     }
        // })

    // }
    openForm =() =>{
        this.setState((prevState) => ({formOpen:!prevState.formOpen}))
    };

    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

    parkingOnchange = (e)=>{
        if(e.target.value === "true"){
            this.setState({
                parking:true
            })
        }else if(e.target.value === "false"){
            this.setState({
                parking:false
            })
        }
    };

    onDelete = () =>{
        this.props.loadownerinfo();
        // this.setState({
        //     Deleted:true
        // })
    }

    petOnchange = (e)=>{
        if(e.target.value === "true"){
            this.setState({
                pet_allow:true
            })
        }else if(e.target.value === "false"){
            this.setState({
                pet_allow:false
            })
        }
    };

    categoryOnchange = (e)=>{
        this.setState({
            category:e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        const {
            description,
            pet_allow,
            parking,
            feature,
            start_date,
            address,
            category,
            price,
            bond,
            least_period,
        } = this.state;
        const {id} = this.props.id;
        this.props.updateProperty({
                id,
                description,
                pet_allow,
                parking,
                feature,
                start_date,
                address,
                category,
                price,
                bond,
                least_period,
            }
        );
        setTimeout(()=>{
            this.props.loadownerinfo()
        },500)
    };


    render() {
        const addacco = (
            <Link to='/submitinfo'>
                <button type="button" className="btn btn-primary btn-lg" name="go" >
                    Add Accommodation
                </button>
            </Link>
        );
        const {
            description,
            feature,
            start_date,
            address,
            price,
            bond,
            least_period,
        } = this.state;
        // if(this.props.isDeleted || this.props.isPropertyUpdated){
        //     window.location.reload(false);
        // }
        return (
            <div>
                <Header />
                {/*<Alert />*/}
                {addacco}
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-6">
                        {this.props.houseinfo.map((info,index) => (
                            <div className="card" key={index}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div style={{
                                                paddingTop:20
                                            }}>
                                                <h5 className="card-title">Address:{info.address}</h5>
                                                <p className="card-text">Category:{info.category}</p>
                                                <p className="card-text">Booked by:{info.book_by}</p>
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
                                                <a className="btn btn-danger" onClick={(e) => {
                                                    this.props.deleteinfo(info.id);
                                                    setTimeout(()=>{
                                                        this.props.loadownerinfo()
                                                    },500)
                                                }}
                                                >Delete</a>
                                                <a className="btn btn-primary" onClick={(e) => {
                                                    this.props.getUpdatePropertyId(info.id);
                                                }} data-toggle="collapse" href={`#collapseExample${info.id}`} role="button" aria-expanded="false" aria-controls="collapseExample">Update</a>
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
                                <div className="collapse" id={`collapseExample${info.id}`}>
                                    <div className="card card-body">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Description</label>
                                                <input type="text" className="form-control" name="description" placeholder={info.description} value={description} onChange={this.onChange}/>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputState">Pet Allow</label>
                                                    <select className="form-control" defaultValue={info.pet_allow} onChange={this.petOnchange} >
                                                        <option>-</option>
                                                        <option  value='true' >Yes</option>
                                                        <option  value='false' >No</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Parking</label>
                                                    <select className="form-control" defaultValue={info.parking}  onChange={this.parkingOnchange}>
                                                        <option>-</option>
                                                        <option value="true" >Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Feature</label>
                                                    <input type="text" className="form-control" name="feature"  placeholder={info.feature} value={feature} onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label>Least Period(months)</label>
                                                    <input type="number" className="form-control" placeholder={info.least_period} value={least_period} name='least_period' onChange={this.onChange}/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="inputCity">Start date</label>
                                                    <input className="form-control" type="date" placeholder={info.start_date} value={start_date} name='start_date' onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress2">Address</label>
                                                <input type="text" className="form-control"
                                                       placeholder={info.address}  value={address} name='address' onChange={this.onChange}/>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label>Category</label>
                                                    <select className="form-control" defaultValue={info.category} onChange={this.categoryOnchange}>
                                                        <option selected >-</option>
                                                        <option value="Apartment" >Apartment</option>
                                                        <option value='Unit'>Unit</option>
                                                        <option value='House'>House</option>
                                                        <option value='Townhouse'>Townhouse</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label>Price(AUD)</label>
                                                    <input type="number" placeholder={info.price} className="form-control" name="price" value={price} onChange={this.onChange}/>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label>Bond(AUD)</label>
                                                    <input type="number" placeholder={info.bond} className="form-control" name="bond"  value={bond} onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                {/*<Chatwrapper>*/}
                {/*    {this.state.formOpen && <Chatroom />}*/}
                {/*    <div style={{*/}
                {/*        marginTop:'auto',*/}
                {/*        marginLeft:'auto',*/}
                {/*        transition:"all 0.5s",*/}
                {/*    }}*/}
                {/*         onClick={this.openForm}*/}
                {/*    >*/}
                {/*        <Fab color='inherit'>*/}
                {/*            <AdbIcon color="primary" fontSize='large' />*/}
                {/*        </Fab>*/}
                {/*    </div>*/}

                {/*</Chatwrapper>*/}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    houseinfo: state.display.properties,
    isDeleted: state.display.isDeleted,
    id:state.upload.id,
    isPropertyUpdated:state.upload.isPropertyUpdated
});

export default connect(mapStateToProps, { loadownerinfo,deleteinfo,getUpdatePropertyId,updateProperty,RequestBookingInfo })(Owneraccom);
