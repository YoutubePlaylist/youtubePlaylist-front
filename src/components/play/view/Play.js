import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import YoutubePlayer from "react-native-youtube-iframe";
import palette from "../../../lib/styles/palette";
import seperateSecond from "../../../lib/utils/seperateSecond";

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   control: {
      position: "absolute",
      bottom: 0,
      height: 80,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: palette.redRose,
   },
   pauseButton: {
      width: 60,
      height: 60,
      borderRadius: 35,
      backgroundColor: palette.deepRedRose,
   },
   forwardBackContainer: {
      width: 120,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   forwardBackButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: palette.deepRedRose,
   },
});

function Play({
   playlist,
   playerRef,
   playing,
   cur,
   onReady,
   handleStateChange,
   togglePlaying,
   onPressItem,
   changeVol,
   vol,
   pressBackward,
   pressForwardward,
}) {
   const youtubePlayerWrap = (cur) => {
      return (
         <YoutubePlayer
            ref={playerRef}
            play={playing}
            forceAndroidAutoplay={true}
            volume={vol}
            height={9 * (Dimensions.get("window").width / 16)}
            onReady={onReady}
            videoId={playlist.items[cur].id}
            onChangeState={handleStateChange}
            initialPlayerParams={{
               start: playlist.items[cur].lapse[0],
               end: playlist.items[cur].lapse[1],
            }}
         />
      );
   };
   return (
      <View style={styles.container}>
         <View>{youtubePlayerWrap(cur)}</View>
         <View>
            <ScrollView>
               {playlist.items?.map((item, idx) => {
                  return (
                     <ListItem
                        bottomDivider
                        key={idx}
                        onPress={() => onPressItem(item, idx)}>
                        <Text>{idx + 1}) </Text>
                        <Image
                           source={{ uri: item.thumbnails }}
                           style={{ width: 100, height: 100 }}
                           transition
                        />
                        <ListItem.Content>
                           <ListItem.Title>{item.title}</ListItem.Title>
                           <ListItem.Subtitle>
                              {seperateSecond(item.lapse[0])} ~{" "}
                              {seperateSecond(item.lapse[1])}
                           </ListItem.Subtitle>
                        </ListItem.Content>
                     </ListItem>
                  );
               })}
            </ScrollView>
         </View>
         <View style={styles.control}>
            <Slider
               style={{ width: 120 }}
               minimumValue={0}
               maximumValue={100}
               value={vol}
               thumbTintColor={palette.blackBerry}
               minimumTrackTintColor={palette.blackBerry}
               maximumTrackTintColor={palette.lightPink}
               onValueChange={changeVol}
            />
            <View
               style={{
                  width: 120,
                  justifyContent: "flex-end",
                  alignItems: "center",
               }}>
               <Button
                  icon={{
                     name: `${playing ? "pause" : "play"}`,
                     type: "font-awesome",
                     color: palette.blackBerry,
                  }}
                  onPress={togglePlaying}
                  containerStyle={styles.pauseButton}
                  buttonStyle={styles.pauseButton}
                  raised
               />
            </View>
            <View style={styles.forwardBackContainer}>
               <Button
                  icon={{
                     name: "backward",
                     type: "font-awesome",
                     color: palette.blackBerry,
                  }}
                  containerStyle={styles.forwardBackButton}
                  buttonStyle={styles.forwardBackButton}
                  raised
                  onPress={pressBackward}
               />
               <Button
                  icon={{
                     name: "forward",
                     type: "font-awesome",
                     color: palette.blackBerry,
                  }}
                  containerStyle={styles.forwardBackButton}
                  buttonStyle={styles.forwardBackButton}
                  raised
                  onPress={pressForwardward}
               />
            </View>
         </View>
      </View>
   );
}

export default Play;