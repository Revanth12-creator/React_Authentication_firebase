import React, { Component,Fragment } from 'react';

//=======importing modules start==========
import HeaderComp from './components/HeaderComponent/HeaderComp.jsx';
import HomeComp from "./components/HomeComponent/HomeComp.jsx";
import RegisterComp from "./components/AuthComponent/RegisterComp.jsx";
import LoginComp from "./components/AuthComponent/LoginComp.jsx";
import ForgotPwd from './components/AuthComponent/ForgotPwdComp.jsx';
import PageNotFound from './components/pageNotFoundComp/PageNotComp.jsx';
//import AddVideoComp from './components/uploadFiles/AddDetails.jsx';
import ListOfVideoComp from './components/uploadForm/ListOfVideos.jsx';
import UploadVideo from './components/UploadeVideos/UploadVideo.jsx';
import VideosCompo from './components/UploadeVideos/VideosComp.jsx';
import AddForm from './components/uploadForm/AddForm.jsx';
import FormList from './components/uploadForm/FormListComp.jsx';
//=======importing modules end==========

//=======importing Router modules start==========
import {BrowserRouter , Router,  Route, Switch, Link, withRouter} from "react-router-dom";
//=======importing Router modules end==========

//=======importing toastify modules start==========
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//=======importing Router modules end==========

//=======importing Router modules start==========
import firebase from './firebase.js';
//=======importing Router modules end==========
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:""
         }
    }
    async componentDidMount(){
        try{
            let userData=await firebase.auth().onAuthStateChanged((user)=> {
                if(user){
                    this.props.history.push('/');
                    this.setState({
                        userData:user
                    })
                }
                else {
                    this.props.history.push('/login');
                    this.setState({
                        userData:null
                    })
                }
            })
        }
        catch(err){

        }
    }
    render() { 
        return (
            <Fragment>
                <BrowserRouter>
                    <header>
                        <HeaderComp user={this.state.userData}/>
                    </header>
                    <ToastContainer/>
                    <Switch>
                        <Route path="/" exact component={HomeComp}/>    
                        <Route path="/register" exact component={RegisterComp}/>
                        <Route path="/login" exact component={LoginComp}/>
                        <Route path="/forgot" exact component={ForgotPwd}/>
                        <Route path="/listVides" exact component={ListOfVideoComp}/>
                        <Route path="/uplode" exact component={UploadVideo}/>
                        <Route path="/videos" exact component={VideosCompo}/>
                        <Route path="/form" exact component={AddForm}/>
                        <Route path="/emplist" exact component={FormList}/>
                        <Route path="**" exact component={PageNotFound}/>
                    </Switch>
                </BrowserRouter>
            </Fragment>
          );
    }
}
export default withRouter(App);