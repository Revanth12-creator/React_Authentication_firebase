import React, {Component, Fragment} from 'react';
import firebase from '../../firebase.js';
import {toast} from 'react-toastify'
class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           firstname:"",
           lastname:"",
           age:"",
           salary:"",
           company:"",
         }
         this.handleChange=this.handleChange.bind(this);
         this.handleSubmit=this.handleSubmit.bind(this);
    }
  
    handleChange(e){
        this.setState({
           [e.target.name]:e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        let uploadForm=firebase.database().ref("/EMP_Detsils/").push(this.state);
        this.props.history.push('/emplist');
        console.log(this.state)
    }

    render() { 
        return ( 
            <Fragment>
                
                  <div className=" card  col-md-4 mx-auto my-5">
                   <h1 className="text-center ">Add EMP_Details</h1>
                   <div className="card-body">
                       <form action="" onSubmit={this.handleSubmit}>
                         
                           <div className="form-group ">
                               <label htmlFor="firstname">Firstname</label>
                               <input type="text" name="firstname" 
                               className="form-control"  
                               id="firstname" 
                               value={this.state.firstname}
                               onChange={this.handleChange} required/>
                           </div>
                            
                           <div className="form-group ">
                               <label htmlFor="lastname">Lastname</label>
                               <input type="text" name="lastname" 
                               className="form-control"  
                               id="lastname" 
                               value={this.state.lastname}
                               onChange={this.handleChange} required/>
                           </div>

                           <div className="form-group ">
                               <label htmlFor="age">Age</label>
                               <input type="text" name="age" 
                               className="form-control"  
                               id="age" 
                               value={this.state.age}
                               onChange={this.handleChange} required/>
                           </div>
                           <div className="form-group ">
                               <label htmlFor="salary">Salary</label>
                               <input type="text" name="salary" 
                               className="form-control"  
                               id="salary" 
                               value={this.state.salary}
                               onChange={this.handleChange} required/>
                           </div>
                           <div className="form-group ">
                               <label htmlFor="company">Company</label>
                               <input type="text" name="company" 
                               className="form-control"  
                               id="company" 
                               value={this.state.company}
                               onChange={this.handleChange} required/>
                           </div>  
                         
                           <div className="form-group">
                               <button className="btn btn-success">Submit</button>   
                            </div>
                          
                       </form>
                   </div>
               </div>
            </Fragment>
         );
    }
}
 
export default AddForm;