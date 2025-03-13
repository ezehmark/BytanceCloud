import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
  Platform,
  StyleSheet,
  ScrollView
} from "react-native";
import axios from "axios";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  useAnimatedProps,
} from "react-native-reanimated";
import { NetworkInfo } from "react-native-network-info";
import {LinearGradient} from 'expo-linear-gradient';
import { BlurView } from "expo-blur";
import NetInfo from "@react-native-community/netinfo";
const MyApp1: React.FC = () => {
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [isUserDetails,setIsUserDetails] = useState(false);        const userDetailsChecker=()=>{                                if(userDetails && userDetails.length >0){setIsUserDetails(true)}}

  const [uploaded, setUploaded] = useState(false);
  const [input, setInput] = useState("");
  const emailRef = useRef();
  const [progress, setProgress] = useState(0);
  const [isNetwork, setIsNetwork] = useState(true);




  const [borderCheck, setBorderCheck] = useState(false);


  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");

  const [focused, setFocused] = useState(false);

  const myRight = useSharedValue(-100);
  const appearAnim = useAnimatedStyle(() => {                       return { right: `${myRight.value}%` };                        });
  const myLeft = useSharedValue(-100);
  const appearAnim1 = useAnimatedStyle(() => {                      return { left: `${myLeft.value}%` }});

  useEffect(() => {
	  setTimeout(()=>{
    myLeft.value = -100;

    myRight.value = -100;
    myLeft.value = withSequence(
      withTiming(16, { duration: 1200 }),
      withTiming(0, { duration: 400 }),
      withTiming(10, { duration: 800})
    );

    myRight.value = withSequence(                                     withTiming(16, { duration: 1200 }),                             withTiming(0, { duration: 400 }),                               withTiming(10, { duration: 800})                              )},1000);
  }, []);


  useEffect(()=>{
          if(userDetails && userDetails.length > 1){setIsUserDetails(true)}
		  else{setIsUserDetails(false)}
          },[userDetails]);

  const handleFetch = async () => {
    setLoading(true);
    setFetch(true);

    await axios
      .get(`http://192.168.0.200:3500/api/userDetails/${name}?`)
      .then((response) => {
        console.log(response.data); // Debugging log
        // Adjust based on actual response data structure
        setPeople(response.data);
        setUserDetails(
          `${response.data.name} is now loaded from the best backend. He is ${response.data.age} years old.`);
        
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setUserDetails(error.response.data.message);
        } else {
          (error) => console.error(error);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setFetch(false);
        }, 2000);
        setVisible(false);
	
	
      });
  };

  const handlePost = async () => {
    setLoading(true);
    setUpload(true);

    if (!isNetwork) {
      window.alert(`Dear ${name}, please ensure your internet is on`);
      setLoading(false);
      return;
    }
    await axios
      .post(
        "http://192.168.0.200:3500/api/userDetails",
        {
          newPeople: [
            { name: "mummy", age: "60" },
            { name: "David", age: "45" },
            { name: "Joshua", age: "25" },
          ],
        },
        { headers: { "Content-Type": "application/json" } },
      )
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setUpload(false);
        }, 2000);
        setVisible(true);
	userDetailsChecker();
        setUploaded(true);
      });
  };
  const email = ["ezehmaker@gmail.com","simplebiggly@gmail.com","powerdonew@gmail.com","younggreat303@gmail.com","ezehmark001@gmail.com"];

  const[mailing,setMailing]=useState(false);

  const[myEmail,setMyEmail]=useState("");
  const[isEmail, setIsEmail] = useState(false);
  const handleIsEmail =(txt)=>{
	  if(txt.length >= 8 && txt.includes("@")){
		  setMyEmail(txt);
	  setIsEmail(true)}
  }
  const sendMail = async()=>{
	  setMailing(true);

	  await Promise.all(

	  await axios
	  .post("http://192.168.0.200:3500/send-mail",
		{recipient:isEmail?myEmail:user,subject:"Testing my Automatic Email",message:isEmail?`Dear ${myEmail.split("@")[0]},\nHurray! Please rejoice today, because this email is coming from my backend`:`Dear ${user.split("@")[0]},\nHurray! Please rejoice today, because this email is coming from my backend`})
		
			.then((response)=>setUserDetails(response.data.message))
			.catch((error)=>setUserDetails(error.response.data.message))
			.finally(()=>setMailing(false))
	  )
  }


  const [isfetch, setFetch] = useState(false);
  const [upload, setUpload] = useState(false);

  const [typing, setTyping] = useState("User typing.");
  let typingTime = useRef(null);
let dotsInterval = useRef(null);
  const typeSetter = () => {
	  setBorderCheck(true);
	  let dots = ["User typing.", "User typing..","User typing..."];
	  let index = 0;
	  if(typingTime.current){
	  clearTimeout(typingTime.current)}



	 
	
		 dotsInterval.current=setInterval(()=>{
		  setTyping(dots[index]);
		  index = (index + 1) % dots.length},800);
	
		
    typingTime.current = setTimeout(() => {
	    clearInterval(dotsInterval);
      setBorderCheck(false);
    }, 2500);
  }
  
  return (
	
    <LinearGradient
    colors={["#ecc37e","#2e4a5f","#2e4a5f"]}
    start={{x:0,y:0}}
    end={{x:1,y:1}}
    style={styles.outer}>

    <Text                                                        style={{                                                     top: 5,                                                    borderRadius: 10,                                           padding: 4,                                                borderColor: "#00ff00",                                    borderWidth:1,
	    backgroundColor:"rgba(0,0,0,1)",
            opacity:borderCheck?1:0,
            position: "absolute",
            right: "10%",
            color: "#00ff00",
            width:95,
            textAlign:"left",
            fontSize:12,                                             }}
        >
          {typing}
        </Text>

    <TouchableOpacity onPress={()=>sendMail()} style={{bottom:105,position:"absolute",backgroundColor:"black",borderRadius:5,padding:10,zIndex:60,width:80,alignItems:"center",justifyContent:"center"}}>
    <Text style={{fontSize:12,color:"red"}}>{mailing?"Sending...":"Send Mail"}</Text></TouchableOpacity>
      <View style={[{borderTopWidth:1,borderBottomWidth:0.5,borderBottomColor:"#ecc37e",overflow:"hidden",borderColor:focused?"#00ff00":"red"},styles.container]}>

        <Animated.View
          style={[
            {
              backgroundColor: "#ff7b00",
              left: "10%",
              top: 350,
              color: "#2e4a5f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              padding: 10,
              width: 110,
              fontSize: 14,
	      zIndex:55,
              borderRadius: 10,
            },
            appearAnim1
          ]}
        >
          {" "}
          <TouchableOpacity
            onPress={handleFetch}
            disabled={loading}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          ><Text style={{color:"#e0e2d7"}}>
            {isfetch ? "Loading.." : "Fetch Data"}</Text>
          </TouchableOpacity>{" "}
        </Animated.View>

        {loading ? (<View style={{zIndex:150,height:"1200%",width:"120%",alignItems:"center",backgroundColor:"rgba(46,74,95,0.4)",justifyContent:"center",position:"absolute"}} intensity={5} tint={"dark"}>
        <ActivityIndicator
	style={{padding:20,backgroundColor:"black",borderRadius:10,alignSelf:"center",position:"absolute"}}
	size={"large"}
	color={"blue"}/>
	</View>
		) : (
          <View style={[{opacity:isUserDetails?1:0},styles.userDetails]}>                                
            <Text
              style={{
                color: "black",
                margin: 10,
		opacity: 1,

              }}
            >
              {" "}
              {userDetails}
            </Text>
          </View>
        )}
        <Animated.View style={[styles.uploadBtn, appearAnim]}>
          <TouchableOpacity
            onPress={handlePost}
            disabled={loading}
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={{ color:"#ccc",fontSize: 14, padding: 10 }}>
              {upload ? "Uploading.." : "Upload"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        {visible && (<>
		<LinearGradient                                            colors={["rgba(46,74,95,1)","rgba(46,74,95,1)","rgba(46,74,95,0.8)","transparent","transparent","transparent","transparent","transparent","rgba(46,74,95,0.8)","rgba(46,74,95,1)","rgba(46,74,95,1)"]}     

		start={{x:1,y:0}}                                          end={{x:0,y:1}}                                            style={{                                                     bottom: 300,                                               borderRadius: 20,                                          zIndex: 150,                                               position: "absolute",                                      height: 50,                                                width: 270                                             }}
		pointerEvents={"none"}><View style={{backgroundColor:"transparent",position:"absolute"}}
		/>
		</LinearGradient>


		<View  style={{
              bottom: 300,
              borderRadius: 20,
              zIndex: 100,
              position: "absolute",
              height: 50,
              width: 250,
            }} >
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              data={people}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
		onPress={()=>setName(item.name)}
                  style={{
                    height: 40,
                    width: 100,
                    color: "blue",
                    borderRadius: 15,
                    justifyContent: "center",
                    margin: 5,
                    backgroundColor: "#4b9490",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#black" }}>{item.name}</Text>
                  <Text style={{ color: "#ccc", fontSize: 10 }}>
                    Age: {item.age}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
	  </>
        )}

	<Text style={{position:"absolute",bottom:130,padding:8,borderRadius:5,fontSize:12,width:"80%",zIndex:50,borderWidth:0.5,borderColor:"#4b9490",textAlign:"center",color:"#4b9490"}}>This app enables you to fetch saved users from Mark's backend database. You can also press "Upload" to send new users to the DB. Happy using ✔️</Text>

	<Text style={{position:"absolute",bottom:30,padding:8,borderRadius:5,fontSize:12,width:"80%",zIndex:50,borderWidth:0,borderColor:"#ea0707",textAlign:"center",color:"#ccc"}}>Clicking the button "Send Mail" will send email message to specific recipients ✔️</Text>

        <Text style={styles.feedback}>{feedback}</Text>

        <TextInput
          style={[
            styles.input,
            {
              borderColor: focused ? "#00ff00" : "#ecc37e",
              backgroundColor: focused ? "rgba(215,230,249,0.3)" : "#2e4a5f",
              borderWidth: focused ? 0.4 : 0.5,
              color: focused ? "#ccc" : "#ecc37e",
              textAlignVertical: "top",
              outlineWidth: 0,
            },
          ]}
          returnKeyType="Next"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? "Start typing..." : "Type Name"}
          multiline={true}
          numberOfLines={3}
	  value={name}
          onSubmitEditing={() => emailRef.current.focus()}
          onChangeText={(text) => {
            typeSetter();setName(text);
          }}
        />
        <TextInput style={styles.input2} 
	onChangeText={(txt)=>{handleIsEmail(txt)}}returnKeyType="Done" ref={emailRef} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    top: 35,
    width: "90%",
    height: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#cfccc5",
    borderWidth: 1,
    borderColor: "black",
  },

  input2: {
    position: "absolute",
    top: 70,
    width: "90%",
    height: 40,
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#2e4a5f",
    borderWidth: 0.5,
    outlineWidth:0,
    borderColor: "#ecc37e",
  },
  outer: {
    flex: 1,
    backgroundColor: "#ecc37e",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 600,
    width: "95%",
    backgroundColor: "#2e4a5f",
    textWrap: "noWrap",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: 20,
    borderTopRightRadius:40,
    borderTopWidth:1,
    elevation: 0,
    shadowRadius: 5,

    shadowOffset: { width: 0, height: 4},
    shadowColor: "rgba(0,0,0,0.2)",
  },
  userDetails: {
    top: 150,
    position: "absolute",
   width:"85%", 
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "black",
    textAlign: "center",
    color: "green",
    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "#00ff00",
  },
  feedback: {
    top: 5,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#2e4a5f",
    color: "red",
    position: "absolute",
  },
  uploadBtn: {
    backgroundColor: "#ea0707",
    right: "10%",
    position: "absolute",
    alignSelf: "center",
    top: 350,
    fontWeight: "bold",
    width: 110,
    height: 40,
    zIndex:60,

    padding: 10,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyApp1;
