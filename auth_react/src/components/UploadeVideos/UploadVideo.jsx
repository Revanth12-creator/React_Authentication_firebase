import React, { Fragment,Component } from 'react';
import firebase from 'firebase';
import {toast} from  'react-toastify';
class UploadVideo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            video:null,
            title:"",
            url:"",
            progress:0,
            minVal:0,
            maxVal:100,
            progresStatus:false,
         }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFile=this.handleFile.bind(this);
    }

handleChange(e){
   this.setState({
   [e.target.name]:e.target.value
   })
}

handleFile(e){ //this for handle file we should do sapareate method for any file uplodes
  if(e.target.files[0]){
      let newVideo=e.target.files[0];
      this.setState({
          video:newVideo
      })
  }
    // console.log(e.target.files[0])
}

handleSubmit(e){
    e.preventDefault();
    // console.log(this.state);
    let {video, title}=this.state;
    //this is uploding purpass
    let StoteInDataBase= firebase.storage().ref(`/Videos/${video.name}`).put(video);
    StoteInDataBase.on("uplode",
    (snapShart)=> {
        //this callback is used for prograsing like while uploding  it wiil take some time like 1 to 100%
        let progressBar=Math.round((snapShart.bytesTransferred / snapShart.totalBytes)*100);
        this.setState({
            progress:progressBar, progresStatus:true
        })
    },
    ()=> {
        //this for error handling
    },
    ()=> {
        firebase.storage().ref("Videos").child(video.name)
        .getDownloadURL() //this for getting video url, with help  this url we can featch videos to frontpage
        .then((getUrl)=> {
            this.setState({url:getUrl },()=> {
                // store this video into datase with help of url
                let videoList=this.state;
                firebase.database().ref("/VideoList/").push({
                    ...videoList
                })
                this.props.history.push("/videos")
                console.log(getUrl)
            })
        })
        .catch(err => console.log(err));
    },
    )
    }
    render() { 
        let progressHandle= (
        <progress max="100" value={this.state.progress} style={{width:"100%"}}>
            {this.state.progress}
        </progress>
        );
        return (  
            <Fragment>
               <div className="card col-md-3 mx-auto my-5">
               <h1 className="text-center ">Upload Video</h1>
                   <div className="card-body">
                       <form action="" onSubmit={this.handleSubmit}>
                           {this.state.progresStatus?progressHandle:null}
                           <div className="form-group">
                               <label htmlFor="video">Add Video</label>
                               <input type="file" name="video"
                                className="form-control"  
                                id="video"
                                onChange={this.handleFile}
                               />
                           </div>
                          
                           <div className="form-group">
                               <label htmlFor="title">Title</label>
                               <input type="text" name="title" 
                               className="form-control"  
                               id="title"
                               value={this.state.title}
                               onChange={this.handleChange}/>
                           </div>
                           
                           <div className="form-group">
                               <button className="btn btn-dark">Upoad</button>   
                            </div>
                       </form>
                   </div>
               </div>
            </Fragment>
        );
    }
}
 
export default UploadVideo;