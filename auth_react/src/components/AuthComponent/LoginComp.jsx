import React,{Fragment, Component} from 'react';
import './auth.style.css';
import firebase from '../../firebase.js';
import {toast} from 'react-toastify';
import { withRouter , Link} from 'react-router-dom';

class LoginComp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:"",
            password:"",
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
            let {email, password}=this.state;
            let userData=await firebase.auth().signInWithEmailAndPassword(email,password);
            if(userData.user.emailVerified){
                this.props.history.push('/');
                let message='Successfully LogedIn';
                toast.success(message);
            }
            else {
                this.props.history.push('/login');
                let message1=`please verify your mail ${email}`;
                toast.error(message1);
            }
            this.setState({
                email:"",
                password:"",
            })
        }
        catch(err){
            toast.error(err.message);
        }
        console.log(this.state)
    }
    render() { 
        return ( 
            <Fragment>
                <section className="login" id="LoginComponent">
                 <div className="pt-5 mt-4 col-md-3 mx-auto my-5">
                   <div className="card card-body">
                   <h1 className="text-center ">LOGIN</h1>
                       <form action="" onSubmit={this.handleSubmit}>
                           <div className="form-group">
                               <label htmlFor="email">Gmail</label>
                               <input type="text" name="email"
                                className="form-control"  
                                id="email"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                           </div>
                          
                           <div className="form-group">
                               <label htmlFor="password">Password</label>
                               <input type="password" name="password" 
                               className="form-control"  
                               id="password"
                               value={this.state.password}
                               onChange={this.handleChange}/>
                           </div>
                           <p className="forgot"><Link to="/forgot">Forgot Password</Link></p>
                           <p>Don't hava an a account please- 
                               <a href="/register">Register</a>
                           </p>
                           <div className="form-group">
                               <button className="btn btn-dark">Login</button>   
                            </div>
                       </form>
                   </div>
               </div>
               </section>
            </Fragment>
         );
    }
}
 
export default LoginComp;