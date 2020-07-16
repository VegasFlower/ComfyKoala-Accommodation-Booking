import React, {Component,Fragment} from 'react';
// import "@progress/kendo-theme-material/dist/all.css";
import "@progress/kendo-theme-bootstrap/dist/all.css"
import { Chat,HeroCard } from '@progress/kendo-react-conversational-ui';
import {ChatWindow,Chatwrapper} from "../style";
import Fab from "@material-ui/core/Fab";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { searchInfo,getPropertyId,comparePrice,clearMessage } from "../../actions/search";
import logopic from '../../Picture1.png';
import AdbIcon from '@material-ui/icons/Adb';
import { showPropertyInfo,BookProperty } from "../../actions/show";
import {logout} from "../../actions/auth";
import {loadUser} from "../../actions/auth";


class Chatbot extends Component {

    user = {
        id:1,
        name:"Me"
    };

    boter = {
        id: "botty",
        name: 'Comfy Koala',
        avatarUrl: logopic
    };

    state = {
    formOpen:false,
        messages: [
            {
                author: this.boter,
                timestamp: new Date(),
                text: "Hello, this is your chatbot.How may i help you!!!"
            }
        ],
        go:false,
        book:false,
        direction:"",
        price:'',
    };


    addNewMessage = (event) => {
        let botResponce = Object.assign({}, event.message);
        botResponce.text = this.Reply(event.message.text);
        botResponce.author = this.boter;
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));
        setTimeout(() => {
            this.setState(prevState => ({
                messages: [
                    ...prevState.messages,
                    botResponce
                ]
            }));
            return this.onacton(botResponce.text);
        }, 1000);
    };

    onacton = (question) =>{
        console.log(question)
        if(question === 'exit'){
            this.props.logout()
        }
        let newarray = question.split(" ");
        if(newarray.includes('suburb')){
            this.props.searchInfo(newarray[newarray.indexOf('suburb')+1],"");
            this.setState({
                go:true
            });
        }else if(newarray.includes('to')){
            if(newarray[newarray.indexOf('to')+1] === "home"){
                this.setState({
                    direction:newarray[newarray.indexOf('to')+1]
                })
            }
            if(newarray[newarray.indexOf('to')+1] === "information"){
                this.setState({
                    direction:newarray[newarray.indexOf('to')+1]
                })
            }
            if(newarray[newarray.indexOf('to')+1] === "My"){
                this.setState({
                    direction:newarray[newarray.indexOf('to')+1]
                })
            }
        }else if(newarray.includes('Requested')){
            this.props.BookProperty(parseInt(newarray[newarray.indexOf('property')+1]))
            // this.props.data.filter(info=>(info.id ===)).map(filterobj =>(
            //     // this.props.requestBook(this.props.auth.user.id,this.props.auth.user.username,filterobj.address,filterobj.id)
            //
            // ));
            // console.log(this.props.data.filter(info=>(info.id === parseInt(newarray[newarray.indexOf('property')+1]))))
            // this.props.requestBook(this.props.auth.user.id,data.id);
            this.setState({
                book:true,
            })
        }else if(newarray.includes('Processing')){
            setTimeout(() => {
                this.props.comparePrice(newarray[newarray.length-1]);
            }, 1000);
        }
    }




    Reply = (question) => {
        if(question === "exit" || question === "logout"){
            let answer = "exit"
            return answer
        }
        let newarray = question.split(" ");
        if(newarray.includes('search') && newarray.includes('suburb')){
            // this.props.searchInfo(newarray[newarray.indexOf('suburb')+1],"");
            let answer = "Searching suburb " + newarray[newarray.indexOf('suburb')+1]
            return answer;
        }else if(newarray.includes('search') && !newarray.includes('suburb')){
            // this.props.searchInfo(newarray[newarray.indexOf('search')+1],"");
            let answer = "Searching suburb " + newarray[newarray.indexOf('search')+1]
            return answer;
        }else if(newarray.includes('hi') || newarray.includes('Hi') || newarray.includes('hello') || newarray.includes('How')){
            const array = ['Good date mate! How Can i help!','Hi! How Can i help!',"All good! How can i help?","Hi!What can i do for you?"]
            let answer = array[Math.floor(Math.random() * Math.floor(3))]
            return answer;
        }else if(newarray.includes('to')){
            let answer = "Navigating to " + newarray[newarray.indexOf('to')+1]
            return answer;
        }else if(newarray.includes('book') && !newarray.includes('property')){
            let answer = "Requested Book property " + newarray[newarray.indexOf('book')+1]
            return answer
        } else if(newarray.includes('book') && newarray.includes('property')){
            let answer = "Requested Book property " + newarray[newarray.indexOf('property')+1]
            return answer
        } else if(newarray.includes('price')){
            // this.props.comparePrice(newarray[newarray.length-1]);
            let answer = "Processing price of " + newarray[newarray.length-1];
            return answer
        }
    }


    openForm =() =>{
        this.setState((prevState) => ({formOpen:!prevState.formOpen}))
    };
    render() {
            // this.state.price = this.props.message
            if(this.state.go === true){
                return <Redirect to='/information' />
            }
            if(this.state.direction === "home"){
                    return <Redirect to='/' />
            }else if(this.state.direction === "information"){
                    return <Redirect to='/information' />
            }else if(this.state.direction === "My") {
                    return <Redirect to='/studentaccommodation'/>
            }
            const Responce = {text:this.props.message,author:this.boter};
            this.state.messages.push(Responce)
            this.props.clearMessage()
            return (
            <Chatwrapper>
                {this.state.formOpen && <Chat
                    user={this.user}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type a message..."}
                    width={400}
                />}
                <div style={{
                    marginTop:'auto',
                    marginLeft:'auto',
                    transition:"all 0.5s",
                }}
                     onClick={this.openForm}
                >
                        <Fab color='inherit'>
                            <AdbIcon color="primary" fontSize='large' />
                        </Fab>
                </div>
            </ Chatwrapper>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isSearched:state.search.isSearched,
    data: state.search.data,
    message:state.search.message
});


export default connect(mapStateToProps,{ searchInfo,showPropertyInfo,getPropertyId,logout,comparePrice,clearMessage,loadUser,BookProperty })(Chatbot);