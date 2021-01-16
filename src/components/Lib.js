import React from 'react';
import Songlist from './Songlist';
const Lib=({
    songs,
    isPlaying,
    setisPlaying,
    currentsongindex,
    setcurrentsongindex,
    deletesong,
}
)=>{
return(
<div className="Lib-container">
        <div className="Music-list">
        {
            songs.map((song) =>(
                <ul class="list-group">
                <Songlist
                songs={songs}
                song={song}
                isPlaying={isPlaying}
                currentsongindex={currentsongindex}
                setcurrentsongindex={setcurrentsongindex}
                setisPlaying={setisPlaying}
                deletesong={deletesong}
                />
                </ul>
            ))

        }
        </div>
</div>

);
}
export default Lib;