import React, { useCallback, useEffect, useRef } from "react";
import { copilot } from "react-native-copilot";
import CustomStepNumber from "../../elements/CustomStepNumber";
import CustomTootip from "../../elements/CustomTootip";
import VideoEdit from "../view/VideoEdit";

function VideoEditContainer({
   start,
   item,
   playing,
   playingByPlayer,
   setPlayingByPlayer,
   playerRef,
   lapse,
   endTime,
   selectedLapsed,
   loaded,
   setPlaying,
   checkItem,
   setLapse,
   togglePlaying,
   volumneChange,
   vol,
   onReady,
   clearIsFirstV,
   isFirst,
   lapseLowCounter,
   lapseHighCounter,
   onSelectLapse,
   checkIcon,
}) {
   const scrollViewRef = useRef();
   useEffect(() => {
      const handleLapse = async () => {
         const time = await playerRef.current?.getCurrentTime();
         if (time <= selectedLapsed[1] && selectedLapsed[1] <= time + 0.5) {
            playerRef.current?.seekTo(selectedLapsed[0], true);
         }
      };
      const intervalId = setInterval(handleLapse, 500);
      return () => clearInterval(intervalId);
   }, [selectedLapsed]);

   useEffect(() => {
      if (isFirst && loaded && endTime) {
         setTimeout(() => start(false, scrollViewRef.current), 100);
         clearIsFirstV();
      }
   }, [isFirst, loaded, endTime]);

   const handleValueChange = useCallback(
      (low, high) => {
         if (low < high) {
            setLapse((prev) => {
               if (low != prev[0]) {
                  playerRef.current?.seekTo(low, true);
               } else if (high != prev[1]) {
                  playerRef.current?.seekTo(high, true);
               }
               return [low, high];
            });
         }
      },
      [playerRef]
   );

   const onChangeState = useCallback(
      (e) => {
         if (e === "ended") {
            playerRef.current?.seekTo(selectedLapsed[0], true);
         } else if (e === "paused") {
            setPlayingByPlayer(false);
         } else if (e === "playing") {
            setPlayingByPlayer(true);
            setPlaying(true);
         }
      },
      [selectedLapsed]
   );

   return (
      <VideoEdit
         item={item}
         playerRef={playerRef}
         playing={playing}
         playingByPlayer={playingByPlayer}
         lapse={lapse}
         handleValueChange={handleValueChange}
         endTime={endTime}
         loaded={loaded}
         checkItem={checkItem}
         lapseLowCounter={lapseLowCounter}
         lapseHighCounter={lapseHighCounter}
         togglePlaying={togglePlaying}
         volumneChange={volumneChange}
         vol={vol}
         onReady={onReady}
         onSelectLapse={onSelectLapse}
         onChangeState={onChangeState}
         checkIcon={checkIcon}
         scrollViewRef={scrollViewRef}
      />
   );
}

export default copilot({
   tooltipComponent: CustomTootip,
   stepNumberComponent: CustomStepNumber,
})(VideoEditContainer);
