import React,{useEffect, useState} from 'react';
import MusicCard from './MusicCard';
//import {SONGS} from './songsinfo'
import Lib from './Lib';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import Axios from  'axios'; 
var a=localStorage.getItem("SONGS");
export var SONGS=JSON.parse(a);
console.log(SONGS);
function Player(){
    const [check,setcheck]=useState(false);
    const [songs,setsongs]=useState(SONGS);
    const [currentsongindex, setcurrentsongindex] = useState(0);
    const [isPlaying,setisPlaying]=useState(false);
    const [mode,setmode]=useState("repeat");
    const changenextSong= ()=>{
        setcurrentsongindex((currentsongindex+1)%songs.length)
    }
    useEffect(
        ()=>{
            SONGS=JSON.parse(localStorage.getItem("SONGS"));
        }
    ,[songs]);
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
   const handleup=()=>{
      var bodyFormData=new FormData();
      bodyFormData.append("name",name);
      bodyFormData.append("track",track)
      console.log(bodyFormData);
      SONGS.push(name);
      localStorage.setItem("SONGS",JSON.stringify(SONGS));
      setsongs(SONGS);
      Axios({
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
    const deletesong=(name)=>{
        SONGS.splice(SONGS.indexOf(name));
        localStorage.setItem("SONGS",JSON.stringify(SONGS));
        setsongs(SONGS);
        Axios.get("https://musicapi007.herokuapp.com/delete/"+name);
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
    <div className="form-group">
    <input className="form-control" type="text" placeholder="song name"
    onChange={(e)=>{handlename(e)}}
    ></input>
    <input className="form-control-file" type="file" onChange={(e)=>{handlefile(e)}}></input>
    <button className='btn-primary' onClick={()=>{handleup()}}>Add Song</button>
    </div>
    </Container>
        </Collapse>      
    </Container>
);

}
export default Player;