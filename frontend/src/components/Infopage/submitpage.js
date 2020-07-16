import React, {Component,Fragment} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { upload } from "../../actions/upload";
import Header from "../common/header";
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {UPLOAD_FAIL} from "../../actions/type";
import Alert from "../Alert/alert";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class Submitpage extends Component {

    state = {
        usertype:'',
        upload_status:false,
        description:'',
        pet_allow:null,
        parking:null,
        feature:'',
        start_date:'',
        address:'',
        category:'',
        price:0,
        bond:0,
        least_period:0,
        upload_id:null
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

    onBackClick =() => {
        this.setState(
            {upload_status:false}
        )
    }


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
        this.props.upload({
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
        });
        this.setState({
            upload_status:true
        })
    };


    render() {
        const {
            description,
            feature,
            start_date,
            address,
            price,
            bond,
            least_period,
        } = this.state;

         if(this.props.uploadinfo.isUpload && this.props.uploadinfo.isUpload === true && this.props.property){
              this.state.upload_id  = this.props.property.id;
         }

        const uploadinfo = (
            <Fragment>
                {/*<Alert />*/}
                <Link to='/owneraccommodation'>
                <button type="button" className="btn btn-primary btn-sm"  name = "back" onClick={this.onBackClick}>
                    Back
                </button>
                    </ Link>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-6">
                        <h4>Plesae submit your detail first then upload image!</h4>
                        <label>Image</label>
                        <button type="button" className="btn btn-primary" data-toggle="modal"
                                data-target="#exampleModalCenter">
                            Launch upload
                        </button>
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalCenterTitle">Upload image</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <FilePond
                                            allowMultiple={true}
                                            name = 'filepond'
                                            server={{
                                                url: `/api/upload/${this.state.upload_id}`,
                                                process: {
                                                    process: './process',
                                                    method: 'POST',
                                                    // headers: {
                                                    //     'Content-Type':'multipart/form-data'
                                                    // },
                                                    onload: (response) => console.log(response.key),
                                                    onerror: (response) => console.log(response.data),
                                                    timeout: 3000,
                                                }
                                            }
                                            }
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Description</label>
                                <input type="text" className="form-control" name="description" value={description} onChange={this.onChange}/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputState">Pet Allow</label>
                                    <select className="form-control"  onChange={this.petOnchange} >
                                        <option>-</option>
                                        <option  value='true' >Yes</option>
                                        <option  value='false' >No</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputState">Parking</label>
                                    <select className="form-control" onChange={this.parkingOnchange}>
                                        <option>-</option>
                                        <option value="true" >Yes</option>
                                        <option value='false'>No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Feature</label>
                                    <input type="text" className="form-control" name="feature" value={feature} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label>Least Period(months)</label>
                                    <input type="number" className="form-control" value={least_period} name='least_period' onChange={this.onChange}/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputCity">Start date</label>
                                    <input className="form-control" type="date"  value={start_date} name='start_date' onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress2">Address</label>
                                <input type="text" className="form-control"
                                       placeholder="72 high st,randwick" value={address} name='address' onChange={this.onChange}/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState">Category</label>
                                    <select id="inputState" className="form-control" onChange={this.categoryOnchange}>
                                        <option selected >-</option>
                                        <option value="Apartment" >Apartment</option>
                                        <option value='Unit'>Unit</option>
                                        <option value='House'>House</option>
                                        <option value='Townhouse'>Townhouse</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>Price(AUD)</label>
                                    <input type="number" className="form-control" name="price" value={price} onChange={this.onChange}/>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>Bond(AUD)</label>
                                    <input type="number" className="form-control" name="bond" value={bond} onChange={this.onChange}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        );

        return (
            <div>
                <Header />
                {uploadinfo}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    uploadinfo: state.upload,
    property:state.upload.property
});


export default connect(mapStateToProps, { upload })(Submitpage);
