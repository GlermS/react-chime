import React from 'react';
import {
  useRemoteVideoTileState,
  RemoteVideo,
  LocalVideo,

} from 'amazon-chime-sdk-component-library-react';
import MeetingControl from '../MeetingControl';
import './videogrid.css'

export default function MyVideoGrid(props){
  const { tiles } = useRemoteVideoTileState();

  const videos = tiles.map((tileId) => {console.log(tileId);return <RemoteVideo tileId={tileId} />})

  return (
    <div className={`grid grid--size-${tiles.length}`} id="video-grid">
      <div className={"videos-container"}>
        <div className={"remote-container"}>
          { tiles.length ? videos: "Aguardando inicio de chamada"}
        </div>
        
        <LocalVideo id="local-video"></LocalVideo>
      </div>     
      
      <MeetingControl></MeetingControl>
    </div>
  )
}
