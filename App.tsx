import MyApp from "./userDetails.tsx";
import {useEffect} from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
export default function App() {
	useEffect(() => {
    const configureNavigationBar = async () => {
      await NavigationBar.setBackgroundColorAsync('transparent');
      await NavigationBar.setButtonStyleAsync('dark'); 
    };

    configureNavigationBar();
  }, []);

  return (<>
	  <StatusBar barStyle="dark-content"
	  backgroundColor={"#2e4a5f"}
	  translucent={true}/>

	  <SafeAreaView style ={{flex:1,backgroundColor:"#2e4a5f"}}>
	  <MyApp />
	  </SafeAreaView>
</>)

}
