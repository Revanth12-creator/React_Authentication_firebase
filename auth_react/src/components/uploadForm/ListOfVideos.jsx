import React, {Component, Fragment} from 'react';
import AddVideoComp from './AddDetails.jsx';
class ListOfVideoComp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items:[],
         }
        this.addVideo=this.addVideo.bind(this);
        this.deleteVideo=this.deleteVideo.bind(this);
        // this.renderVideo=this.renderVideo.bind(this);
    }
    addVideo(video){
        let newVideos={...video};
        this.setState((state)=> ({
            items:[...state.items, newVideos]
        }))
    }
    deleteVideo(){
        let firstData=this.state.items;
        firstData.pop(firstData);
        this.setState({
           items:firstData
        })
    }
    renderVideo(){
        console.log(this.state.items)
        return (
            <Fragment>
                    <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Video Name</th>
                                <th>Categoty</th>
                                <th>Language</th>
                                <th>Uploded Date</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                          
                            <tbody>
                            {this.state.items.map((details)=> (
                                // console.log(details.name)
                            <tr>
                                <td>{details.name}</td>
                                <td>{details.category}</td>
                                <td>{details.language}</td>
                                <td>{details.date}</td>
                                <td>
                                <button className="btn btn-danger" onClick={this.deleteVideo}>Delte</button></td>
                            </tr>
                            ))}
                            </tbody>
                         
                    </table>
            </Fragment>
        )
    }
    render() { 
        return ( 
            <Fragment>
              <AddVideoComp addVideo={this.addVideo}/>
              <div className="container">
                  <h1 className="text-center">Video List</h1>
                  {this.renderVideo()}
              </div>
            </Fragment>
         );
    }
}
 
export default ListOfVideoComp;