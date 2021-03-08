import React,{Fragment, Component} from 'react';
import './auth.style.css';
import firebase from '../../firebase.js';  //importing firebase 
import {withRouter} from 'react-router-dom'; //to redirecting rto one page to anothe page
import {toast} from 'react-toastify'; //flash messages
import md5 from 'md5';  //used to genatate randam id 
class RegisterComp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:"",
            email:"",
            password:"",
            conform_pwd:"",
         }
         this.handleChange=this.handleChange.bind(this);
         this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    async handleSubmit(e){
        e.preventDefault();
        try{
            let {username, email, password, conform_pwd}=this.state;
            let userData=await firebase.auth().createUserWithEmailAndPassword(email, password);//creating mail
            this.props.history.push('/login');  //redirecting to login
            userData.user.sendEmailVerification(); //sending varifecation mail
            let message=`A verification mail has send to ${email} and please verify before SignIn`;
            toast.success(message); //success message
            console.log(userData);

            //creating userprofile which is available in the userData
            await userData.user.updateProfile({
                displayName: username,
                photoURL: `https://www.gravatar.com/avatar/${md5(userData.user.email)}?d=identicon`,    
            })

            //storing user data into database
            await firebase.database().ref()
            .child("/User" + userData.user.uid)
            .set({
                displayName: userData.user.displayName,
                email      :userData.user.email,
                photoURL   :userData.user.photoURL,  
                RegisteredDate:new Date().toString(),
                udi           :userData.user.uid
            })

            //upadating state to register anothe user
            this.setState({
                username:"",
                email:"",
                password:"",
                conform_pwd:"",
            })
        }
        catch(err){
            toast.error(err.message)
        }
      console.log(this.state);
    }
    render() { 
        return ( 
            <Fragment>
                <section  id="RegisterComp">
               <div className=" col-md-3 pt-5 mt-4 mx-auto my-5 ">
                   <div className=" card card-body">
                   <h1 className="text-center ">CREATE ACCOUNT</h1>
                       <form action="" onSubmit={this.handleSubmit}>
                           <div className="form-group">
                               <label htmlFor="username">Username</label>
                               <input type="text" name="username" 
                               className="form-control" 
                                id="usrname"
                                value={this.state.username}
                                onChange={this.handleChange}/>
                           </div>
                           <div className="form-group">
                               <label htmlFor="gmail">Gmail</label>
                               <input type="text" name="email"
                                className="form-control" 
                                 id="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                />
                           </div>
                           <div className="form-group">
                               <label htmlFor="password">Password</label>
                               <input type="password" name="password" 
                               className="form-control"  id="password"
                               value={this.state.password}
                               onChange={this.handleChange}/>
                           </div>
                           <div className="form-group">
                               <label htmlFor="conform_pwd">Conform_password</label>
                               <input type="password" name="conform_pwd" 
                               className="form-control" 
                                id="conform_pwd"
                                value={this.state.conform_pwd}
                                onChange={this.handleChange}
                               />
                           </div>
                           <p>Already have an  account-  
                               <a href="/login">Login</a>
                           </p>
                           <div className="form-group">
                               <button className="btn btn-dark">Create Account</button>   
                            </div>
                       </form>
                   </div>
               </div>
               </section>
            </Fragment>
         );
    }
}
 
export default withRouter(RegisterComp);