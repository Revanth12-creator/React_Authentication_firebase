import React, {Component, Fragment} from 'react';
class AddVideoComp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            category:"",
            name:"",
            language:"",
            date:"",
            items:[]
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
        this.props.addVideo(this.state);
        
    }
    render() { 
        return ( 
            <Fragment>
                
                  <div className=" container card mx-auto my-5">
                   <h1 className="text-center ">Add Video</h1>
                   <div className="card-body">
                       <form action="" onSubmit={this.handleSubmit}>
                           <div className="row">
                           <div className="form-group col-md-4">
                               <input type="text" name="name" 
                               className="form-control"  
                               id="name"
                               placeholder="Enter Video Name" 
                               value={this.state.name}
                               onChange={this.handleChange} required/>
                           </div>

                           <div className="form-group col-md-4">
                               <select name="category" value={this.state.category} id="category"  className="form-control"   
                                 onChange={this.handleChange} required>
                                  <option   value="">Type</option>
                                   <option    value="Comedy">Comedy</option>
                                   <option    value="Romance">Romance</option>
                                   <option    value="Action">Action</option>
                                   <option    value="Thriller">Thriller</option>
                                   <option    value="Horror">Horror</option>
                               </select>
                           </div>

                           
                           <div className="form-group col-md-4">
                               <input type="text" name="language" 
                               className="form-control"  
                               id="language"
                               placeholder="Enter Language" 
                               value={this.state.language}
                               onChange={this.handleChange} required/>
                           </div>

                           <div className="form-group col-md-4">
                               <input type="date" name="date"
                                className="form-control"  
                                id="movie"
                                value={this.state.date}
                                onChange={this.handleChange} required/>
                           </div>

                           <div className="form-group">
                               <button className="btn btn-warning">Submit</button>   
                            </div>
                            </div>
                       </form>
                   </div>
               </div>
            </Fragment>
         );
    }
}
 
export default AddVideoComp;