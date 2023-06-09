import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import pattern from "../../assets/7628.jpg";
import logo from "../../assets/PM.png";
import { button1 } from "../common/button";
import {
  errormessage,
  formgroup,
  head1,
  head2,
  input,
  label,
  link,
  link2,
} from "../common/formcss";
import IPPORT from "../IPport";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  
  const [fdata, setFdata] = useState({
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState({});

  //   useEffect(() => {
  //     AsyncStorage.setItem("@userData", JSON.stringify(userData));
  //   }, [userData]);

  const setObjectValue = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("key", jsonValue);
    } catch (e) {
      // save error
      console.log(e);
    }

    console.log("Done.");
  };

  console.log(fdata);
  console.log(userData);

  const [errormsg, setErrormsg] = useState(null);

  // const Sendtobackend = () => {
  //   // console.log(fdata);
  //   if (fdata.email == "" || fdata.password == "") {
  //     setErrormsg("All fields are required");
  //     return;
  //   } else {
  //     fetch(`http://${IPPORT}:4000/signin`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(fdata),
  //     })
  //       .then((res) => res.json())
  //       // .then((data) => {
  //       //   //   console.log(data);
  //       //   setUserData(data);
  //       //   console.log(`consoling: ${userData}`);
  //       //   setObjectValue(userData);

  //       //   if (data.error) {
  //       //     setErrormsg(data.error);
  //       //   } else {
  //       //     alert("logged successfully");
  //       //     AsyncStorage.setItem("@userLogin", JSON.stringify(fdata));
  //       //     console.log(AsyncStorage.getItem("@userLogin"));
  //       //     navigation.navigate("HomeScreen");
  //       //   }
  //       // });
  //   }
  // };

  const Sendtobackend = async () => {
    let response = await fetch(`http://${IPPORT}:4000/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(fdata),
    });

    // if (response.status != 200) {
    //   let responseData = JSON.parse(await response.json());
    //   console.log(responseData);
    // }

    let responseData = await response.json();

    if (response.status == 200) {
      console.log(responseData.email);
      await AsyncStorage.setItem("userId", responseData.id);
      await AsyncStorage.setItem("userToken", responseData.token);
      await AsyncStorage.setItem("userName", responseData.name);
      await AsyncStorage.setItem("userEmail", responseData.email);

      // console.log(`From async Id: ${await AsyncStorage.getItem("userId")}`);
      // console.log(`From async token: ${await AsyncStorage.getItem("userToken")}`);
      // console.log(`From async name: ${await AsyncStorage.getItem("userName")}`);
      // console.log(`From async email: ${await AsyncStorage.getItem("userEmail")}`);

      navigation.navigate("HomeScreen");
      // setErrormsg("All fields are required");
    } else {
      console.log(responseData.error);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />

      <View style={styles.container1}>
        <View style={styles.s1}>
          {/* <Image style={styles.logo} source={logo} /> */}
        </View>
        <View style={styles.s2}>
          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign in to continue</Text>
          {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput
              style={input}
              placeholder="Enter your email"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput
              style={input}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              onPressIn={() => setErrormsg(null)}
            />
          </View>
          <View style={styles.fp}>
            <Text style={link}>Forgot Password?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Sendtobackend();
            }}
          >
            <Text style={button1}>Login</Text>
          </TouchableOpacity>
          <Text style={link2}>
            Don't have an account?&nbsp;
            <Text style={link} onPress={() => navigation.navigate("Signup")}>
              Create a new account
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  patternbg: {
    position: "absolute",
    top: 0,
    width: "120%",
    height: "45%",
    zIndex: -1,
  },
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  s1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
  },
  small1: {
    color: "#fff",
    fontSize: 17,
  },
  h1: {
    fontSize: 30,
    color: "#fff",
  },
  s2: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  formgroup: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: "#000",
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFB0CC",
    borderRadius: 20,
    padding: 10,
  },
  fp: {
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  logo: {
    height: 300,
    resizeMode: "contain",
  },
});
