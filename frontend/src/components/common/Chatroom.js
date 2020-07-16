import React,{Component} from  'react';
//import { Chat } from '@progress/kendo-react-conversational-ui';
import { Chat,HeroCard } from '@progress/kendo-react-conversational-ui';
// import '../../../static/frontend/css/App.css'
import { connect } from "react-redux";
import logopic from "../../Picture1.png";

export class Chatroom extends Component{
    user = {
        id:this.props.auth.user.id,
        name:this.props.auth.user.username
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
                text: "welcome to chatroom!"
            }
        ],
        go:false,
        book:false,
        direction:"",
        price:'',
    };


    addNewMessage = (event) => {
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));
    };

    render(){
        return (
            <Chat
                user={this.user}
                messages={this.state.messages}
                onMessageSend={this.addNewMessage}
                placeholder={"Type a message..."}
                width={400}
            />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    id:state.search.id
});

export default connect(mapStateToProps,{})(Chatroom)