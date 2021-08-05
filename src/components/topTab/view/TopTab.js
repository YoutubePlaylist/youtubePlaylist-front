import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PlaylistScreen from "../../../screens/Playlist";
import Auth from "../../../screens/Auth";
import SearchScreen from "../../../screens/Search";
import { StyleSheet } from "react-native";
import palette from "../../../lib/styles/palette";
import { useNavigationState } from "@react-navigation/native";
import HeaderName from "../../headerName/HeaderName";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
   barStyle: {
      backgroundColor: palette.redRose,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   indicator: {
      backgroundColor: palette.blackBerry,
   },
   labelStyle: {},
});

function TopTab() {
   const [swipeEnabled, setSwipeEnabled] = useState(true);
   const state = useNavigationState((state) => state.routes[0].state);
   useEffect(() => {
      if (
         state &&
         state.index === 1 &&
         state.routes &&
         state.routes[1]?.state?.index === 1
      ) {
         setSwipeEnabled(false);
      } else {
         setSwipeEnabled(true);
      }
   }, [state]);
   return (
      <>
         <Tab.Navigator
            initialRouteName="Playlist"
            swipeEnabled={swipeEnabled}
            tabBarOptions={{
               activeTintColor: palette.blackBerry,
               indicatorStyle: styles.indicator,
               labelStyle: styles.labelStyle,
               style: styles.barStyle,
            }}>
            <Tab.Screen
               name="Playlist"
               component={PlaylistScreen}
               options={{ tabBarLabel: "재생목록" }}
            />
            <Tab.Screen
               name="Search"
               component={SearchScreen}
               options={{ tabBarLabel: "검색" }}
            />
            <Tab.Screen
               name="Auth"
               component={Auth}
               options={{ tabBarLabel: "로그인" }}
            />
         </Tab.Navigator>
      </>
   );
}

export default TopTab;
