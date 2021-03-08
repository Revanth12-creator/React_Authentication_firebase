import React, { Component , Fragment} from 'react'
import firebase from '../../firebase.js';
import { withRouter , Link} from 'react-router-dom';
import {toast} from 'react-toastify';
class ForgotPwd extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:""
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
            let {email}=this.state;
            await firebase.auth().sendPasswordResetEmail(email);
            let message=`Please Check Your mail and reset password ${email}`;
            this.props.history.push('/login');
            toast.success(message);
        }
        catch(err){
            this.props.history.push('/forgot');
            toast.error(err.message);
        }
        console.log(this.state)
    }
    render() { 
        return ( 
            <Fragment>
                <div className="card col-md-3 mx-auto my-5">
                   <h1 className="text-center ">Change Password</h1>
                   <div className="card-body">
                       <form action="" onSubmit={this.handleSubmit}>
                           <div className="form-group">
                               <label htmlFor="email">Gmail</label>
                               <input type="text" name="email"
                                className="form-control"  
                                id="email"
                                placeHolder="enter gmail"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                           </div>
                           <div className="form-group">
                               <button className="btn btn-dark">Sumbit</button>   
                            </div>
                       </form>
                   </div>
               </div>
            </Fragment>
         );
    }
}
 
export default ForgotPwd;