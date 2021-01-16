import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContent';
import DialogContent from '@material-ui/core/DialogContent';
import React, { useState } from 'react';
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
    const [dia,setdia]=useState(false);
    return(
        <li class={isPlaying&songs.indexOf(song)===currentsongindex
            ?"fa fa-music fa-lg list-group-item list-group-item-success":"fa fa-music fa-lg list-group-item list-group-item"}
        ><div class="container">
        <div class="row justify-content-between">
        <div class="col-8">
  
        <button className="btn" onClick={()=>changesong(songs.indexOf(song))}>{song}</button>
            
        </div>

        <div class="col-2">
    
        <button className="btn fa fa-trash fa-sm" onClick={()=>setdia(!dia)}></button>
        <Dialog
        open={dia}
        
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
           Do you want to delete Song {song} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setdia(!dia)} color="primary">
            No
          </Button>
          <Button onClick={()=>{setdia(!dia);deletesong(song)}} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
        </div>
        </div>
        
    </div>
      
    
        </li>
    );
}
export default Songlist;