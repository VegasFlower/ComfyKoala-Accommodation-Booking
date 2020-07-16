import React, {Component,Fragment} from 'react';
import { SliderWrapper,AnimatedHeadline } from "../style";

class Slidersetion extends Component {
    render() {
        return (
            <Fragment>
                <SliderWrapper>
                    <AnimatedHeadline>Welcome to Comfykoala!</AnimatedHeadline>
                <div id="carouselExampleCaptions" className="carousel slide col-md-7 m-auto" data-ride="carousel" style={{
                    paddingTop:80
                }} >
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://i.ibb.co/2M3JGFS/Image8-rhfinc.jpg" className="d-block w-100" alt="..." height="300px" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ibb.co/QDZTMjN/image1.jpg" className="d-block w-100" alt="..." height="300px" />
                        </div>
                        <div className="carousel-item" >
                            <img src="https://i.ibb.co/W0krVP1/image4.jpg" className="d-block w-100"  height="300px" alt="..." />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                </SliderWrapper>
            </Fragment>
        );
    }
}

export default Slidersetion;