import React, { useState,useRef } from 'react';
import "font-awesome/css/font-awesome.css";
import './MusicCard.css'
const MusicCard = ({

    song,
    mode,
    setmode,
    isPlaying,
    setisPlaying,
    changenextSong,
    changeprevSong,

}) =>
 {
     const audioRef=useRef(null);
     const [songTime,setsongTime]=useState(0);
     const [vol,setvol]=useState(0);
     const [inpv,setinpv]=useState("hidden");     
     const handlevol=(e)=>{
         setvol(e.target.value);
         audioRef.current.volume=vol;
     }
     const handleinpv= ()=>{
      if(inpv==="hidden")
      setinpv("visible")
      else
      setinpv("hidden")
      console.log(inpv)
    }
     const handlePlay=()=>{
        if(isPlaying)
        audioRef.current.pause();
        else
        audioRef.current.play();
        setisPlaying(!isPlaying);
     }

     const handleEnd=()=>{
         if(mode==="repeat"){
            audioRef.current.play();
         }
         else if(mode==="repeat-next"){
         changenextSong();
         }
         else if(mode==="non-repeat"){
         setisPlaying(!isPlaying)
         }
     }
     const changemode=()=>{
        if(mode==="repeat")
        {
            setmode("repeat-next");
        }
        else if(mode==="repeat-next")
        {
            setmode("non-repeat");
        }
        else if(mode==="non-repeat")
        {
            setmode("repeat");
        }
     }

     const tostring = (n) => {
        n = Math.floor(n);
        var m = Math.floor(n / 60);
        var s = (n % 60).toString().substring(0, 2);
        if (m < 10) m = "0" + m;
        if (s < 10) s = "0" + s;
        return m + ":" + s;
      };

    return( 
<div className="row justify-content-center">
    <div className="card d-flex m-5">
        <h5 className="card-title text-center mt-3">{song}</h5>
        
        <img src={"/image/headphones.jpg"} alt={song} className="card-img" style={{ height: "300px", width: "300px" }} />

        <div className="card-body justify-content-center">
        </div>
        <audio
            onEnded={handleEnd}
            loop={mode === "loop" ? true : false}
            onTimeUpdate={() => setsongTime(audioRef.current.currentTime)}
            src={"https://musicapi007.herokuapp.com/read/"+song}
            ref={audioRef}
            preload="auto"
            onLoadedData={() => (isPlaying) ? audioRef.current.play() : audioRef.current.pause()}
        ></audio>



            <div className="time-stamps">
            <span className="col-2 timestamp">
              {songTime === 0 ? "00:00" : tostring(songTime)}
            </span>
            <span className="col-8">
              <input
                className="time-stamp"
                onInput={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  console.log(e.target.value);
                }}
                type="range"
                min={0}
                value={songTime}
                max={
                  audioRef.current
                    ? isNaN(audioRef.current.duration)
                      ? 0
                      : audioRef.current.duration
                    : 0
                }
                step="any"
              />
            </span>
            <span className="col-2 timestamp">
              {audioRef.current
                ? isNaN(audioRef.current.duration)
                  ? "00:00"
                  : tostring(audioRef.current.duration)
                : "00:00"}
            </span>
          </div>





        <div className="controls mt-2 mb-1">
            <div className="row justify-content-center mb-2">
                <div className="col-7 " >
                    <button className="btn" onClick={
                        () =>
                            changeprevSong()
                    }>
                        <span className=" fa fa-step-backward fa-lg"

                        ></span>
                    </button>
                    <button className="btn"
                        onClick={
                            () => handlePlay()
                        }>
                        <span
                            className={" fa " + (isPlaying ? "fa-pause fa-lg" : "fa-play fa-lg")}

                        ></span>
                    </button>
                    <button className="btn" onClick={
                        () => changenextSong()
                    }>
                        <span className="fa fa-step-forward fa-lg"

                        ></span>
                    </button>
                    
                    <button className="btn" onClick={
                        () => changemode()
                    }>
                        <span className={" fa " + (mode === "repeat" ? "fa-repeat " : (mode === "repeat-next" ? "fa-angle-double-right fa-lg" : "fa-ban"))}
                        ></span>
                    </button>
                  
                    <div className="d-flex justify-content-start" data-tip data-for="volume">
                <button className="btn" id="volumeDropDown"
                onClick={()=>handleinpv()}>
                  <span
                    className={
                      "fa " + (vol > 0 ? "fa-volume-up fa-xs" : "fa-volume-off fa-xs")
                    }
                  ></span>
                </button>
                <input
                  style={
                      {
                      visibility : inpv
                      }
                  }
                  className="volume-dropdown pt-1"
                  data-tip
                  data-for="volume"
                  type="range"
                  value={vol}
                  min={0}
                  max={1}
                  step={"any"}
                  onInput={(e) => handlevol(e)}
                />
              </div>
                </div>
            </div>
        </div>
    </div>
</div>
);
}
export default MusicCard;