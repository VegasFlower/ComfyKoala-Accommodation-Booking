import React, {Component} from 'react';
import { SearchWrapper,SearchHeader,NavSearch,Boxer } from "../style";
import SearchIcon from '@material-ui/icons/Search';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image1 from '../../image1.jpg';
import image2 from '../../image2.jpeg';
import image3 from '../../image3.jpeg';
import image4 from '../../image4.jpeg';
import {connect} from "react-redux";
import { searchInfo } from "../../actions/search";
import { Link,Redirect } from  'react-router-dom';
import Grow from '@material-ui/core/Grow';
import '../styles.css'
import { CSSTransition } from 'react-transition-group';

class Searchsection extends Component {

    state = {
        suburb:'',
        go:false,
        order:''
    };

    onChange = e => this.setState({
        [e.target.name]:e.target.value
    });

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

    onSubmit = (e) => {
        e.preventDefault();
        const { suburb,order } = this.state;
        this.props.searchInfo(suburb,order);
        this.setState({
            go:true
        })
    };
    //
    // onClick = (e) => {
    //     e.preventDefault();
    //     const { suburb } = this.state;
    //     this.props.searchInfo(suburb)
    // };



    render() {
        const tileData = [
            {
                img: image1,
                title: 'apartment',
            },
            {
                img: image2,
                title: 'house',
            },
            {
                img: image3,
                title: 'townhouse',
            },
            {
                img: image4,
                title: 'unit',
            },
        ];
        const { suburb } = this.state;
        if(this.state.go === true){
            this.state.go = false;
            return <Redirect to='/information' />
        }
        return (
            <div>
                <SearchWrapper>
                    <SearchHeader>Find your accomodation</SearchHeader>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control input_hover"
                                   name="suburb"
                                   onChange={this.onChange}
                                   value={suburb}
                                   placeholder="Search..."
                            />
                        </div>
                        <div className="form-group col-md-1" style={{
                            marginLeft:"14%"
                        }}>
                            <label htmlFor="inputState">Order by</label>
                            <select className="form-control" onChange={this.onOrderchange}>
                                <option value="" defaultChecked>-</option>
                                <option value="date" >Date</option>
                                <option value='price'>Price</option>
                            </select>
                        </div>

                    </form>
                    <Boxer>
                        <GridList cellHeight={180}>
                            {tileData.map(tile => (
                                <GridListTile key={tile.img}>
                                    <img className='img_hover' src={tile.img} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        actionIcon={
                                            <IconButton aria-label={`info about ${tile.title}`} style={{
                                                color: 'rgba(255, 255, 255, 0.54)',
                                            }}>
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Boxer>
                </SearchWrapper>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    searchStatus: state.search
});


export default connect(mapStateToProps, { searchInfo })(Searchsection);

