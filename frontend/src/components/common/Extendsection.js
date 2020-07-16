import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {AnimatedHeadline, ExtendWrapper, ViewAll} from "../style";
import Avatar from '@material-ui/core/Avatar';
import {connect} from "react-redux";
import { loaddisplayinfo } from "../../actions/display";
import { getPropertyId } from "../../actions/search";
import { showPropertyInfo } from "../../actions/show";
import { Link,Redirect } from  'react-router-dom';
import { AnotherHeadline } from "../style";
import '../styles.css'


class Extendsection extends Component {

    state = {
        go:false,
        id:null
    };


    componentDidMount() {
        this.props.loaddisplayinfo();
    }

    componentDidUpdate(prevProps) {
        this.props.display_property.filter(id => id === this.props.id).map(info=>{
            if(info.rate !== prevProps.display_property.filter(id => id === this.props.id).rate) {
                this.props.loaddisplayinfo();
            }
        })
    }

    onClick = (id)=>{
        this.props.getPropertyId(id);
        this.props.showPropertyInfo(id);
        this.setState({
            go:true,
            id:id
        })
    };

    render() {

        if(this.props.isShowed === true && this.state.go === true) {
            return <Redirect to={'/detailpage/'+ String(this.state.id)}/>
        }
        console.log(this.props.display_property)
        return (
            <div>
                <ExtendWrapper>
                    <AnotherHeadline>Top Choice From Customer</AnotherHeadline>
                    <Grid container style={{
                        flexGrow:1,
                        paddingTop:90
                    }} spacing={3}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={4}>
                                {this.props.display_property.map((info,index) => (
                                    <Grid key={index} item>
                                        <div>
                                            <Card className="card_hover" style={{maxWidth: 345}}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" style={{backgroundColor: '6781E0'}}>
                                                            {`${info.owner[0]}`}
                                                        </Avatar>
                                                    }
                                                    title={info.category}
                                                    subheader={info.start_date}
                                                    action = {
                                                            <IconButton aria-label="more" onClick={this.onClick.bind(this,info.id)}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                    }
                                                />
                                                <CardMedia
                                                    style={{    height: 0,
                                                        paddingTop: '56.25%'}}
                                                    image={`data:image/png;base64,${info.photos[0]}`}
                                                    title="Paella dish"
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {info.description}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <h3>Rating:</h3>
                                                    <Rating name="half-rating-read" value={info.rate} readOnly />
                                                </CardActions>
                                            </Card>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </ExtendWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    display_property: state.display.properties_list,
    isShowed:state.show.isShowed,
    id:state.search.id,
});

export default connect(mapStateToProps,{ loaddisplayinfo,getPropertyId,showPropertyInfo })(Extendsection);