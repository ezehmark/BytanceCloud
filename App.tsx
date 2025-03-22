import MyApp from "./userDetails.tsx";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
export default function App() {
  return (
    <>
      <MyApp />
      <StatusBar barStyle="dark-content" backgroundColor="#00ff00" />
    </>
  );
}
