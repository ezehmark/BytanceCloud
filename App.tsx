import MyApp from "./userDetails.tsx";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
export default function App() {
	const handleNaBar = async()=>{
	await NavigationBar.setBackgroundColorAsync("#2e4a5f");
	await NavigationBar.setButtonStyleAsync("light")}
	useEffect(()=>{
	handleNaBar()},[]);
  return (
    <>
      <MyApp />
      <StatusBar barStyle="light-content" backgroundColor="#2e4a5f" />
    </>
  );
}
