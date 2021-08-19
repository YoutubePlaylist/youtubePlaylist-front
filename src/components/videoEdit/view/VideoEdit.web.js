import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import palette from "../../../lib/styles/palette";
import ControlVideo from "../elements/ControlVideo";
import SecondController from "../elements/SecondController";
import Summary from "../elements/Summary";
import ReactPlayer from "react-player";
import {
   useTourGuideController, // hook to start, etc.
} from "rn-tourguide";
import TourGuide from "../elements/TourGuide";

const PLAYER_HEIGHT = 300;

function VideoEdit({
   item,
   playerRef,
   playing,
   lapse,
   selectedLapsed,
   endTime,
   loaded,
   setPlaying,
   onSelectLapse,
   checkItem,
   lapseLowCounter,
   lapseHighCounter,
   handleValueChange,
   onStart,
   handleOnProgress,
   playingByPlayer,
   setPlayingByPlayer,
   togglePlaying,
   volumneChange,
   vol,
   onReady,
   isFirst,
}) {
   const onEnded = useCallback(() => {
      playerRef.current?.seekTo(selectedLapsed[0], "seconds");
   }, [selectedLapsed[0]]);

   const {
      canStart, // a boolean indicate if you can start tour guide
      start, // a function to start the tourguide
   } = useTourGuideController();

   useEffect(() => {
      if (canStart && loaded) {
         start();
      }
   }, [canStart, loaded]);

   return (
      <View style={styles.container}>
         <View style={styles.playerContainer}>
            <ReactPlayer
               ref={playerRef}
               url={`https://www.youtube.com/watch?v=${item?.videoId}`}
               width={534}
               height={PLAYER_HEIGHT}
               playing={playing}
               volume={vol / 100}
               controls={true}
               onReady={onReady}
               onPause={() => {
                  setPlayingByPlayer(false);
               }}
               onPlay={() => {
                  setPlaying(true);
                  setPlayingByPlayer(true);
               }}
               onEnded={onEnded}
               onProgress={({ playedSeconds }) =>
                  handleOnProgress(playedSeconds)
               }
               onStart={onStart}
            />
         </View>
         <ScrollView>
            <TourGuide />
            <Summary item={item} />
            {loaded && lapse[1] ? (
               <SecondController
                  lapse={lapse}
                  lapseLowCounter={lapseLowCounter}
                  lapseHighCounter={lapseHighCounter}
                  handleValueChange={handleValueChange}
                  endTime={endTime}
                  onSelectLapse={onSelectLapse}
                  setPlaying={setPlaying}
               />
            ) : (
               <></>
            )}
         </ScrollView>
         <ControlVideo
            vol={vol}
            playing={playing}
            checkItem={checkItem}
            playingByPlayer={playingByPlayer}
            togglePlaying={togglePlaying}
            volumneChange={volumneChange}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
      borderColor: palette.deepCoolGray,
      borderLeftWidth: 1,
      borderRightWidth: 1,
   },
   playerContainer: {
      backgroundColor: "black",
      alignItems: "center",
   },
});

export default VideoEdit;
