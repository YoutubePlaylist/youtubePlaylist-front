import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const YOUTUBE_HEIGHT = 9 * (width / 16);
export const WINDOW_HEIGHT = height;
export const HEADERNAME_HEIGHT = 50;
export const CONTROLBAR_HEIGHT = 80;
export const WINDOW_WIDTH = width;
export const TAP_HEIGHT = 48;

export const WEB_COPILOT_BOTTOM =
   height * 0.025 + HEADERNAME_HEIGHT + TAP_HEIGHT;
