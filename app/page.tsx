"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const features = [
  {title:"Sherlock Jr.",credit:"BUSTER KEATON · 1924",album:"Back in the High Life",artist:"STEVE WINWOOD · 1986",playlist:"PLNPGM2D7aODcHh3hX-AfX93IROksf0Q8Q",videoId:"",mp4:"https://archive.org/download/sherlock-jr.-1924/Sherlock%20Jr.1924.mp4",filmSource:"https://archive.org/details/sherlock-jr.-1924",note:"A projectionist dreams himself into the picture. Keaton’s visual comedy and impossible stunts meet Winwood’s bright, soulful rock.",availability:"A 1924 silent comedy. Film streams directly from Internet Archive with its audio muted."},
  {title:"Dick Tracy, Detective",credit:"WILLIAM BERKE · 1945",album:"Eliminator",artist:"ZZ TOP · 1983",playlist:"",videoId:"",mp4:"https://archive.org/download/dick_tracy_detctive/dick_tracy_detective.mp4",filmSource:"https://archive.org/details/dick_tracy_detctive",note:"Sharp suits, shadowy streets, hard-driving guitars. ZZ Top gives this black-and-white detective story a swaggering new pulse.",availability:"The 1945 feature, not the 1990 remake. Internet Archive labels this copy public domain."}
];
const eliminator = ["DW7LVSQ6dsM","4APi8VD23D8","PAyOcwZggnA","euzlaYW7Qho","Keux3G2Gb_M","rM_nGN_du84","ONLOQ7wrumE","_4aBM1yrkhI","2lcABAgr98c","DlBsvYj0P7w","8FBcQRTQnys"];
type Player = {cuePlaylist(ids:string[]):void;nextVideo():void;playVideo():void;pauseVideo():void;seekTo(t:number,allow:boolean):void;playVideoAt(i:number):void;mute():void;setLoop(value:boolean):void;destroy():void;getIframe():HTMLIFrameElement};
type YT = {Player:new(el:HTMLElement, options:Record<string,unknown>)=>Player};
let apiPromise:Promise<YT>|undefined;
function youtube():Promise<YT>{
 const w=window as unknown as {YT?:YT;onYouTubeIframeAPIReady?:()=>void};
 if(w.YT?.Player)return Promise.resolve(w.YT);
 if(!apiPromise)apiPromise=new Promise((resolve,reject)=>{
  w.onYouTubeIframeAPIReady=()=>resolve(w.YT!);
  const script=document.createElement("script");script.src="https://www.youtube.com/iframe_api";
  script.onerror=()=>{apiPromise=undefined;script.remove();reject(new Error("Player script unavailable"));};document.head.appendChild(script);
 });
 return apiPromise;
}

function Theater({index,onNext}:{index:number;onNext:()=>void}){
 const feature=features[index], tracks=index===1?eliminator:null;
 const albumMount=useRef<HTMLDivElement>(null),native=useRef<HTMLVideoElement>(null),album=useRef<Player|null>(null),alive=useRef(true);
 const [connected,setConnected]=useState(false),[revision,setRevision]=useState(0);
 const [started,setStarted]=useState(false),[playing,setPlaying]=useState(false),[ended,setEnded]=useState(false);
 const [filmError,setFilmError]=useState(""),[musicError,setMusicError]=useState(""),[status,setStatus]=useState("");
 function pause(){native.current?.pause();album.current?.pauseVideo();setPlaying(false);if(!album.current)setRevision(v=>v+1);}
 function finished(){pause();setEnded(true);setStatus(index===0?"First feature finished. Continue to Dick Tracy below.":"Feature finished. Re-sync anytime to restart both sources together.");}
 useEffect(()=>{
  alive.current=true;let disposed=false;let player:Player|undefined;
  setConnected(false);setMusicError("");
  const container=albumMount.current!;
  const iframe=document.createElement("iframe");
  const params=new URLSearchParams({enablejsapi:"1",origin:window.location.origin,playsinline:"1",loop:"1"});
  if(tracks)params.set("playlist",tracks.slice(1).join(","));
  else {params.set("listType","playlist");params.set("list",feature.playlist);}
  iframe.src="https://www.youtube.com/embed/"+(tracks?tracks[0]:"videoseries")+"?"+params;
  iframe.title=feature.artist+" — "+feature.album;
  iframe.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";
  iframe.allowFullscreen=true;
  iframe.referrerPolicy="strict-origin-when-cross-origin";
  container.appendChild(iframe);
  const timer=window.setTimeout(()=>{if(!disposed)setStatus("Shared music controls have not connected. You can still tap Play inside the visible music player and use the film’s controls.");},15000);
  youtube().then(api=>{
   if(disposed)return;
   player=new api.Player(iframe,{
    events:{
     onReady:()=>{if(disposed)return;clearTimeout(timer);album.current=player!;if(tracks)player!.cuePlaylist(tracks);player!.setLoop(true);setConnected(true);},
     onError:(event:{data:number})=>{if(disposed)return;native.current?.pause();setPlaying(false);setMusicError("YouTube could not play this song (code "+event.data+"). Try Next song or Reload music. The film is still available independently.");},
     onAutoplayBlocked:()=>{if(disposed)return;native.current?.pause();setPlaying(false);setStatus("Tap Play inside the music player to enable sound, then Resume pairing.");}
    }
   });
  }).catch(()=>{if(!disposed)setStatus("Shared controls unavailable. Play music directly in its visible player; the movie has its own controls.");});
  return()=>{disposed=true;alive.current=false;clearTimeout(timer);album.current=null;player?.destroy();container.replaceChildren();};
 },[revision]);
 useEffect(()=>{const screen=native.current;return()=>{screen?.pause();};},[]);
 function play(restart=false){
  if(filmError)return;
  const reset=restart||!started||ended;
  setEnded(false);setStarted(true);setPlaying(true);
  if(reset){if(native.current)native.current.currentTime=0;album.current?.playVideoAt(0);}else album.current?.playVideo();
  if(native.current){native.current.muted=true;native.current.play().catch(()=>{if(alive.current){pause();setStatus("The film did not start. Try its Play control, then Resume pairing.");}});}
  setStatus(restart?"Re-sync requested: picture and soundtrack restarted together from the opening point.":album.current?"Playback requested for both. If music is silent, tap Play inside its player. If an ad or buffering shifts timing, tap Re-sync both.":"Film started independently. Tap Play in the music player; shared controls are still connecting.");
 }
 return <section className="theater" aria-label={feature.title+" paired with "+feature.album}>
  <div className="screen-area"><div className="strip"><span>PICTURE / {String(index+1).padStart(2,"0")}</span><span>FILM SOUND MUTED</span></div>
   <video ref={native} src={feature.mp4} controls muted playsInline preload="metadata" aria-label={feature.title} onEnded={finished} onVolumeChange={()=>{if(native.current&&!native.current.muted)native.current.muted=true;}} onError={()=>{pause();setFilmError("Internet Archive could not load this film. Reload the page or check the film source below.");}}/>
   <div className="caption"><div><p className="eyebrow">{feature.credit}</p><h2>{feature.title}</h2></div><span>FEATURE {index+1} OF 2</span></div>
  </div>
  <aside><div className="strip"><span>ALTERNATE SOUNDTRACK</span><span>↻ REPEAT</span></div><div className="deck"><p className="eyebrow">{feature.artist}</p><h2>{feature.album}</h2><div className="album-player" ref={albumMount}/><div className="transport"><Button disabled={!!filmError} onClick={()=>playing?(pause(),setStatus(connected?"Both players paused.":"Film paused; music player reset.")):play()}>{playing?"Ⅱ Pause pairing":started?"▶ Resume pairing":"▶ Start pairing"}</Button><Button variant="outline" disabled={!!filmError} onClick={()=>play(true)}>↻ Re-sync both</Button></div>
   <div className="music-tools"><Button variant="outline" disabled={!connected} onClick={()=>{album.current?.nextVideo();setMusicError("");setStatus("Next song requested. Re-sync both if you want to return to the shared opening point.");}}>Next song →</Button><Button variant="outline" onClick={()=>{native.current?.pause();setPlaying(false);setRevision(v=>v+1);setStatus("Reloading the music player. This resets the music position; use Re-sync both afterward.");}}>Reload music</Button></div>
   {(filmError||musicError)&&<p className="error" role="alert">{filmError||musicError}</p>}<p className="message" role="status">{status||(connected?"Ready. Start the picture and its new soundtrack.":"Music player loading. Film controls are available now.")}</p>
   {ended&&index===0&&<Button className="next" onClick={onNext}>Continue to Dick Tracy →</Button>}
   <p className="fine">{feature.availability}</p>{tracks&&<p className="fine">The 11-song album sequence is assembled from individual ZZ Top uploads, including remastered versions—not a third-party playlist.</p>}
   <p className="fine">YouTube advertising stays inside YouTube’s player. Re-sync restarts both sources after an ad or network delay rather than trying to bypass it.</p>
   <div className="source-links"><a href={feature.filmSource} target="_blank" rel="noreferrer">Film source ↗</a><a href={tracks?"https://www.youtube.com/watch?v="+tracks[0]:"https://www.youtube.com/playlist?list="+feature.playlist} target="_blank" rel="noreferrer">Music source ↗</a></div>
  </div></aside><div className="curation"><p className="eyebrow">CURATOR’S NOTE</p><p>{feature.note}</p></div>
 </section>;
}

export default function Home(){
 const [selected,setSelected]=useState(0);
 return <main><header><a className="logo" href="./">VIN<span>TECH</span><i>↗</i></a><p>DOUBLE-FEATURE SOUNDTRACK CINEMA</p><span className="header-note">TWO FILMS / TWO FREQUENCIES</span></header>
  <div className="intro"><div><p className="eyebrow">TONIGHT’S DOUBLE BILL</p><h1>ROLL FILM.<br/><em>TURN IT UP.</em></h1></div><p>Comedy, crime, and a different kind of score.<br/>Two curated pairings. No uploads.</p></div>
  <nav className="bill" aria-label="Choose a feature">{features.map((f,i)=><Button key={f.title} variant="outline" className={selected===i?"bill-item selected":"bill-item"} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="number">0{i+1}</span><span><small>{i===0?"BUSTER KEATON · 1924":"THE 1945 CLASSIC"}</small><strong>{f.title}</strong><small>{f.album} · {i===0?"Steve Winwood":"ZZ Top"}</small></span><span className="arrow">{selected===i?"SELECTED":"PLAY →"}</span></Button>)}</nav>
  <Theater key={selected} index={selected} onNext={()=>setSelected(1)}/>
  <div className="how"><p><b>One pairing at a time.</b> Switching features stops the previous players. Use the pairing buttons for shared playback; individual player controls work separately.</p><p><b>Re-sync after interruptions.</b> If YouTube inserts an ad or either source buffers, tap Re-sync both to return the picture and soundtrack to the same opening point.</p></div>
  <footer><span>VINTECH</span><p>Curated by AI. Connected to source players. Made for unexpected connections.</p><span>Infinity ®</span></footer>
 </main>;
}
