import React from "react";
import { StyleSheet, View, Text } from "react-native";
import palette from "../../lib/styles/palette";
import { HEADERNAME_HEIGHT } from "../../lib/styles/variables";

/* 상단 네비게이션 위 이름 나오는 부분 */
function HeaderName() {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Your List</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      height: HEADERNAME_HEIGHT,
      backgroundColor: palette.redRose,
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      color: "white",
      fontSize: 25,
   },
});

export default React.memo(HeaderName);
