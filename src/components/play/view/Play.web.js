import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import palette from "../../../lib/styles/palette";
import {
   CONTROLBAR_HEIGHT,
   HEADERNAME_HEIGHT,
   IS_MOBILE_WEB,
   MOBILE_WEB_PALYER_HEIGHT,
   TAP_HEIGHT,
   WINDOW_HEIGHT,
} from "../../../lib/styles/variables";
import ControlBar from "../elements/ControlBar";
import VideoList from "../elements/VideoList";
import ReactPlayer from "react-player";

const PLAYER_HEIGHT = 300;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
   },
   playerContainer: {
      backgroundColor: "black",
      alignItems: "center",
   },
});

function Play({
   playlist,
   changePlaylistOrder,
   onPressEditVideo,
   onPressDeleteVideo,
   playerRef,
   playing,
   cur,
   togglePlaying,
   onPressItem,
   changeVol,
   vol,
   pressBackward,
   pressForwardward,
   setPlaying,
   onStart,
   onEnded,
   onProgress,
   playingByPlayer,
   setPlayingByPlayer,
}) {
   return (
      <View style={styles.container}>
         <View style={styles.playerContainer}>
            <ReactPlayer
               ref={playerRef}
               url={`https://www.youtube.com/watch?v=${playlist.items[cur]?.videoId}`}
               width={IS_MOBILE_WEB ? "100%" : 534}
               height={IS_MOBILE_WEB ? MOBILE_WEB_PALYER_HEIGHT : PLAYER_HEIGHT}
               playing={playing}
               volume={vol / 100}
               controls={true}
               onStart={onStart}
               onPause={() => {
                  setPlayingByPlayer(false);
               }}
               onPlay={() => {
                  setPlayingByPlayer(true);
                  setPlaying(true);
               }}
               onProgress={({ playedSeconds }) => onProgress(playedSeconds)}
               onEnded={onEnded}
            />
         </View>
         <View
            style={{
               height:
                  WINDOW_HEIGHT * 0.95 -
                  PLAYER_HEIGHT -
                  CONTROLBAR_HEIGHT -
                  HEADERNAME_HEIGHT -
                  Math.random(),
            }}>
            <ScrollView>
               <VideoList
                  playlist={playlist}
                  changePlaylistOrder={changePlaylistOrder}
                  onPressEditVideo={onPressEditVideo}
                  onPressDeleteVideo={onPressDeleteVideo}
                  onPressItem={onPressItem}
                  cur={cur}
               />
            </ScrollView>
         </View>
         <ControlBar
            vol={vol}
            changeVol={changeVol}
            togglePlaying={togglePlaying}
            pressBackward={pressBackward}
            pressForwardward={pressForwardward}
            playing={playing}
            playingByPlayer={playingByPlayer}
         />
      </View>
   );
}

export default Play;
