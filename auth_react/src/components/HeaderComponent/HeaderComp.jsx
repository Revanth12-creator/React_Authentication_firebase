import React ,{Fragment, Component} from 'react';
import './HeaderComp.style.css';
import {Link, withRouter} from "react-router-dom";
import firebase from '../../firebase.js';
import {toast} from 'react-toastify'

class HeaderComp extends Component {
   constructor(props) {
      super(props);
      this.state = { 
         user:this.props.user
       }
       this.signOut=this.signOut.bind(this);
   }
   async signOut(){
      await firebase.auth().signOut()
      .then(()=> {
         this.props.history.push('/login');
         let message="Successfullly logouted";
         toast.success(message);
      })
      .catch(err => console.log(err))
   }
   render() { 
      // let {user, email, photoURL}=this.state;
      let AuthUser=() => {
         return (
            <Fragment>  
               <li className="nav-item">
                  <Link className="nav-link " to="/listVides">Add-Detais</Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link " to="/form">Form</Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link " to="/emplist">EMP_LIST</Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link " to="/uplode">Upload-Video</Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link badge badge-warning mt-2 m-2" to="/videos">Video</Link>
               </li>
               <li className="nav-item">
               <h6>{this.props.user.email}</h6>
               </li>
             
               <li className="nav-item">
                  <Link className="nav-link "  to="/logout" onClick={this.signOut}>Logout</Link>
               </li>
               <li className="nav-item">
                 <img src={this.props.user.photoURL} alt=""/>
               </li>
            </Fragment>
         )
      }

      let AnonymouseUser=() => {
         return (
            <Fragment>
               <li className="nav-item">
                  <Link className="nav-link " to="/register">Register</Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link " to="/login">SignIn</Link>
               </li>
            </Fragment>
         )
      }
      return ( 
         <Fragment>
         <nav className="navbar navbar-expand-lg navbar-light  bg-light">
             <div className="container-fluid">
              <img src="./authetication.jpg" className="Logo" alt=""/>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
             </button> 
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                   <li className="nav-item">
                      <Link className="nav-link active "  to="/">Home</Link>
                   </li>  
                   {this.props.user ? <AuthUser/> : <AnonymouseUser/>} 
             </ul>
             </div>
             </div>
         </nav>
       </Fragment>
       );
   }
}
 
export default withRouter(HeaderComp);
