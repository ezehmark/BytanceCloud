import MyApp1 from "./userDetails";
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <>
      {/* Ensures the status bar is visible */}
      <StatusBar barStyle="dark-content" backgroundColor="#ecc37e" translucent={true} />

      {/* SafeAreaView should cover the entire screen */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ecc37e' }}>
        <MyApp1 />
      </SafeAreaView>
    </>
  );
}
