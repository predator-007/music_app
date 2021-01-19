import React,{useEffect, useState} from 'react';
import MusicCard from './MusicCard';
import Lib from './Lib';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import Axios from  'axios'; 
import Fade  from '@material-ui/core/Fade';
var data;
var a=[];
async function getdata(){
     data=await Axios.get("https://musiclistapi007.herokuapp.com/");
    
    for(let i=0;i<data.data.length;i++)
    {
        a.push(data.data[i].title);
    }
    }
getdata();
function Player(){
    const [SONGS,setSONGS]=useState(a);
    const [check,setcheck]=useState(false);
    const [songs,setsongs]=useState(SONGS);
    const get=async()=>{
        const  data=await Axios.get("https://musiclistapi007.herokuapp.com/");
       const a=[]
       for(let i=0;i<data.data.length;i++)
       {
           a.push(data.data[i].title);
       }
       setsongs(a);
       console.log("executed");
    }
    useEffect(async()=>{
        const  data=await Axios.get("https://musiclistapi007.herokuapp.com/");
       const a=[]
       for(let i=0;i<data.data.length;i++)
       {
           a.push(data.data[i].title);
       }
       setsongs(a);
       },[])
       useEffect(async()=>{
          setSONGS(songs);
          },[songs])
    console.log(songs);
   
    const [currentsongindex, setcurrentsongindex] = useState(0);
    const [isPlaying,setisPlaying]=useState(false);
    const [mode,setmode]=useState("repeat");
    const [fade,setfade]=useState(false);
    const changenextSong= ()=>{
        setcurrentsongindex((currentsongindex+1)%songs.length)
    }
    const changeprevSong=()=>{
        var k=currentsongindex-1;
        if(k===-1)
        setcurrentsongindex(songs.length-1);
        else
        setcurrentsongindex(k);
    }
    const [track,settrack]=useState(null);
   const[name,setname]=useState(null);
   const handlefile=(e)=>{
      settrack(e.target.files[0]);
      console.log(track);
   }
   const handlename=(e)=>{
      setname(e.target.value);
      console.log(name);
   }
   const handleup=async()=>{
      var bodyFormData=new FormData();
      bodyFormData.append("name",name);
      bodyFormData.append("track",track)
      const data=await Axios.post("https://musiclistapi007.herokuapp.com/",{
         title : name
      })
      get();
      setSONGS(songs);
      const data1=await Axios({
         method: 'post',
         url: 'https://musicapi007.herokuapp.com/write',
         data: bodyFormData,
         headers:{'Content-Type': 'multipart/form-data'}
         })
         .then(function (response) {
             //handle success
             console.log(response);
         })
         .catch(function (response) {
             //handle error
             console.log(response);
         });
        };
    const deletesong=async(name)=>{
        const data1=await Axios.get("https://musicapi007.herokuapp.com/delete/"+name);
        const data=await Axios.delete("https://musiclistapi007.herokuapp.com/"+name);
        get();
        setSONGS(songs);
    }
return(
    <Container>
    <Collapse direction="down" in={!check}>
    <div>
    <MusicCard
    song={songs[currentsongindex]}
    mode={mode}
    setmode={setmode}
    isPlaying={isPlaying}
    setisPlaying={setisPlaying}
    changenextSong={changenextSong}
    changeprevSong={changeprevSong}
    />
    <div className="row justify-content-center">
        <span className="fa fa-bars fa-lg" onClick={()=>{
          setcheck(!check)
      }}></span>
    </div>    
    </div>
    </Collapse>
    
    <Collapse direction="up" in={check} >
        <br></br>
        <div>
        <div className="row justify-content-center">
        <span className="fa fa-bars fa-lg" onClick={()=>{
          setcheck(!check)
      }}></span>
      </div>
      </div>
      <br></br>
      <div>
      <Container>
        <Lib
        songs={songs}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        currentsongindex={currentsongindex}
        setcurrentsongindex={setcurrentsongindex}
        deletesong={deletesong}
        />
        </Container>
        </div>
    <br></br>
    <Container>
    <br></br>
        <div>
        <div className="row justify-content-center">
        <span className="fa fa-plus fa-lg" onClick={()=>{
          setfade(!fade)
      }}></span>
      </div>
      </div>
      <br></br>
    <Fade in={fade}>
    <div class="container">
    <div class="row justify-content-between">
        <div class="col-4 flex">
  
    <input className="form-control" type="text" placeholder="song name"
    onChange={(e)=>{handlename(e)}}
    ></input></div>
    <div class="col-4 flex">
    <input className="form-control-file" type="file" onChange={(e)=>{handlefile(e)}}></input>
    </div>
    <div class="col-4 flex">
    <button className='btn-primary' onClick={()=>{handleup()}}>Add Song</button>
    </div>
    </div>
    </div>
    </Fade>
    <br></br>
    </Container>

        </Collapse>      
    </Container>
);

}
export default Player;