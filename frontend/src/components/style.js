import styled from "styled-components";
import { keyframes }  from "styled-components"
import logopic from '../Picture1.png';


//Header style
export const Headerwapper = styled.div`
            height:45px;
            width:100%;
            display:flex;
            justify-content: space-between;
            box-sizing: border-box;
            background-color: transparent;
`;

export const Logo = styled.div`
        position:absolute;
        margin-left:46%;
        top:0;
        width:60px;
        display:block;
        height:56px;
        background:url(${logopic});
        background-size:contain;
`;

export const Head = styled.div`
        height:40px;
        display:flex;
        margin-left:auto;
`;

export const Home = styled.div`
        font-size:16px;
        cursor:pointer;
        padding: 10px 20px;
        display:flex;
        margin-left:3%;
       text-decoration:none;
`;


export const Info = styled.div`
        font-size:16px;
        cursor:pointer;
        padding: 10px 20px;
        display:flex;
        margin-left:3%;
        text-decoration:none;
`;


export const Accomd = styled.div`
        font-size:16px;
        cursor:pointer;
        padding: 10px 20px;
        text-decoration:none;
`;


//Searchsection
export const SearchWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 500px;
    margin-top:500px;
    background-color: transparent;
    border: 0.5px solid #000000;
    border-top: 0px;
    box-sizing: border-box;
`;

export const SearchHeader = styled.div`
    position: absolute;
    width: 600px;
    height: 40px;
    font-size: 24px;
    line-height: 40px;
    padding-top:20px;
    left:40%;
    color: #000000;
`;

export const NavSearch = styled.input.attrs({
    placeholder:'Search...',
    type:'text'
})`
    width: 550px;
    height: 62px;
    box-sizing:border-box;
    padding:0 20px;
    margin-left:15%;
    margin-top:15%;
    border:none;
    outline:none;
    opacity:0.8;
    border: 0.5px solid #000000;
    background:#eee;
    font-size:14px;
    $::placeholder{
        color:#999;
    }
`;


export const Boxer = styled.div`
    position: absolute;
    width: 450px;
    height: 294px;
    margin-top:-20%;
    left: 60%;
`;

//extendsection
export const ExtendWrapper = styled.div`
    position: absolute;
    margin-top:1000px;
    width: 100%;
    height: 450px;
    background-color: transparent;
    border: 0.5px solid #000000;
    border-top:0;
    box-sizing: border-box;
`;

export const SliderWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 500px;
    background-color: transparent;
    border: 0.5px solid #000000;
    border-top: 0px;
    box-sizing: border-box;
`;

export const ViewAll = styled.div`
    position: absolute;
    width: 60px;
    height: 23px;
    margin-left:95%;
    cursor:pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    &:hover {
      color: red;
      transition: 0.5s;
      text-decoration: underline;
       }
`;


//information page
export const InfoSearch = styled.input.attrs({
    placeholder:'Search...'
})`
    width: 550px;
    height: 40px;
    box-sizing:border-box;
    padding:0 20px;
    margin-left:30%;
    margin-top:2%;
    border:none;
    outline:none;
    opacity:0.8;
    border: 0.5px solid #000000;
    background:#eee;
    font-size:14px;
    $::placeholder{
        color:#999;
    }
`;

export const ShowInfoWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 500px;
    background: #EDEDED;
    border: 0.5px solid #000000;
    border-top: 0px;
    margin-top:20px;
    box-sizing: border-box;
`;

const liner = keyframes`
  from {
    transform: translate(0,100%);
  }

  to {
    transform: translate(0,0);
  }
`;


export const AnimatedHeadline = styled.h2`
    position: absolute;
    left:38%;
    padding-top:30px;
    color:black;
    animation: ${liner} 0.5s linear;
`;


export const AnotherHeadline = styled.h2`
    position: absolute;
    left:38%;
    padding-top:20px;
    color:black;
    animation: ${liner} 2s linear;
`;


export const Chatwrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    display:flex;
`;