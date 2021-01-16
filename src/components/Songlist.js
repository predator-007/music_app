import React from 'react';
const Songlist=(
{
    songs,
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
        <li class={isPlaying&songs.indexOf(song)===currentsongindex
            ?"fa fa-music fa-lg list-group-item list-group-item-success":"fa fa-music fa-lg list-group-item list-group-item"}
        ><div class="container">
        <div class="row justify-content-between">
        <div class="col-8">
  
        <button className="btn" onClick={()=>changesong(songs.indexOf(song))}>{song}</button>
            
        </div>

        <div class="col-2">
    
        <button className="btn fa fa-trash fa-sm" onClick={()=>deletesong(song)}></button>
        </div>
        </div>
        
    </div>
      
    
        </li>
    );
}
export default Songlist;