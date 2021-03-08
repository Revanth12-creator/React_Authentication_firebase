import React, { Component ,Fragment} from 'react';
import firebase from '../../firebase';
import './videoCom.style.css';
class VideosCompo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videos:[],
            name:"",
         }
    }
    async componentDidMount(){
        let VideosData=this.state.videos;
        firebase.database().ref("/VideoList/")
        .on("value",
        (snap)=>{
            snap.forEach((x)=> {
                VideosData.push({
                    id:x.key,
                    // name:x.val().name,
                    url:x.val().url
                })
            })
        },
        )
        console.log(VideosData)
    }

    render() { 
        let VideosList=()=> {
            return this.state.videos.map((video)=>(
                <Fragment>
                <div className="  videoList" >
                    {/* <h1>{video.url}</h1> */}
                {/* <video controls>
                    <source src={video[0].url}/>
                </video> */}
               
                  <video controls>
                    <source src={video.url} />
                </video>
            </div>
               </Fragment>
            ))
        }
        console.log(this.state.videos)
        return ( 
            <Fragment>
               <div>
                   <h1 className="text-center my-5">Video List</h1>
                   {<VideosList/>}
               </div>
            </Fragment>
         );
    }
}
 
export default VideosCompo;