import React from 'react';
import {SONGS} from './Player';
const Songlist=(
{
    song,
    isPlaying,
    currentsongindex,
    setisPlaying,
    setcurrentsongindex,
    deletesong,
}
)=>{
    const changesong=(index)=>{
        setcurrentsongindex(index)
        if(!isPlaying)
        setisPlaying(!isPlaying)
    }
    return(
        <li class={isPlaying//&SONGS.indexOf(song)===currentsongindex
            ?"fa fa-music fa-lg list-group-item list-group-item-success":"fa fa-music fa-lg list-group-item list-group-item"}
        ><button className="btn" onClick={()=>changesong(SONGS.indexOf(song))}>{song}</button>
        <button style={
           { marginLeft: "80px"} 

        }className="btn fa fa-trash fa-sm" onClick={()=>deletesong(song)}></button></li>
        
    );
}
export default Songlist;