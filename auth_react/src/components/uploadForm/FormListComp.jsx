import React, { Component, Fragment } from 'react'
import firebase from '../../firebase.js';
class FormList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            formList:[]
        }
        this.deleteVideo=this.deleteVideo.bind(this);
    }
    deleteVideo(){
        let firstData=this.state.formList;
        firstData.pop(firstData);
        this.setState({
            formList:firstData
        })
    }
    renderVideo(){
        return (
            <Fragment>
                 <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Age</th>
                                <th>Salary</th>
                                <th>Company</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                          
                            <tbody>
                            {this.state.formList.map((details)=> (
                                // console.log(details.name)
                            <tr> 
                                <td>{details.firstname}</td>
                                <td>{details.lastname}</td>
                                <td>{details.age}</td>
                                <td>{details.salary}</td>
                                <td>{details.company}</td>
                                <td>
                                <button className="btn btn-danger" onClick={this.deleteVideo}>Delte</button></td>
                            </tr>
                            ))}
                            </tbody>
                         
                    </table>
            </Fragment>
        )
    }
    componentDidMount() {
        firebase.database().ref("/EMP_Detsils/").on("value", snapshot => {
          let emplist = [];
          snapshot.forEach(snap => {
              // snap.val() is the dictionary with all your keys/values from the 'students-list' path
              emplist.push(snap.val());
          });
          this.setState({ formList: emplist });
        });
   }
    render() {
        return ( 
            <Fragment>
              <div className="container">
                  <h1 className="text-center">EMP_List</h1>
                  {this.renderVideo()}
              </div>
            </Fragment>
         );
    }
}
 
export default FormList;