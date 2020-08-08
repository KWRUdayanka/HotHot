import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Content, Item, Input, Grid, Row, Form, Button, Icon, Picker } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';
import { ImageBackground } from 'react-native';
import  * as firebase from 'firebase';
import Colors from '../constants/Colors';


interface RegisterProps {}

// type RegisterRouteProps = 
const Register = (props: RegisterProps) => {
  const [userName,setUserName] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [contactNumber,setPhone] = React.useState('')
  const [address,setAddress] = React.useState('')
  const [userType,setUserType] = React.useState("Select One")
  const [pwd,setPWD] = React.useState('')
  const [conpwd, setCONPWD] = React.useState('')


  const register= ()=>{

    firebase.auth().createUserWithEmailAndPassword(email,pwd)
    // if createUserWithEmailAndPassword(email,pwd) correct
    .then(()=>{
      const user = firebase.auth().currentUser;
      const token = user?.uid;
      user?.updateProfile({
        displayName:userName,
        photoURL:''
      })
      // realtime database
      const ref = firebase.database();
      

      // CREATE COLLECTION FOR ALL USERS
      ref.ref('AllUsers/' + token+ '/').set({
        userType: userType
      }).then(()=> {

        //CREATE COLLECTION FOR CUSTOMERS
        if (userType === 'Customer') {
          ref.ref('User/' +  token + '/').set({
            userName: userName,
            email: email,
            contactNumber: contactNumber,
            address: address,
            userType: userType
          }).catch(err=>alert(err));
        } 
        
        //CREATE COLLECTION FOR SHOPS
        else if (userType === 'Shop') {
          ref.ref('Shop/' +  token + '/').set({
            userName: userName,
            email: email,
            contactNumber: contactNumber,
            address: address,
            userType: userType
          }).catch(err=>alert(err));
        }


        //CREATE COLLECTION FOR DRIVERS
        else {
          ref.ref('Driver/' +  token + '/').set({
            userName: userName,
            email: email,
            contactNumber: contactNumber,
            address: address,
            userType: userType
          }).catch(err=>alert(err));
        }




      }).catch(err=>alert(err));
    })
    .catch(err=>{
      console.log(err);
      alert(err);
    })
  }
  return (
    // <View style={styles.container}>
    //   <Text>Register</Text>
    // </View>
    <Container>
      <ImageBackground source={require('../assets/images/background.jpg')} style={styles.image}>
        {/* <Header /> */}
        <Content>
          <Grid>
            <Row style={{ height: Layout.window.height * 0.1 }}></Row>
            <Row style={{ height: Layout.window.height * 0.8 }}>
              <Form
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  marginHorizontal: 20,
                }}
              >
                <Item rounded style={styles.inputbox}>
                  <Input
                   placeholder="Name" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black" 
                   onChangeText={text=>setUserName(text)}
                   value={userName}
                   />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                   placeholder="Email"
                   keyboardType='email-address'
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black" 
                   onChangeText={text=>setEmail(text)}
                   value={email}
                  />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                   placeholder="Contact Number" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black" 
                   onChangeText={text=>setPhone(text)}
                  />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                   placeholder="Address" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black" 
                   onChangeText={text=>setAddress(text)}
                  />
                </Item>
                <View style={styles.container} >
                  <Picker
                    selectedValue={userType}
                    style={{height:80}}
                    onValueChange={(value) => setUserType(value)}
                  >
                    <Picker.Item  label="Select One" value="Select One" />
                    <Picker.Item  label="Customer" value="Customer" />
                    <Picker.Item  label="Shop" value="Shop" />
                    <Picker.Item  label="Driver" value="Driver" />
                  </Picker>
                </View>
                <Item rounded style={styles.inputbox}>
                  <Input
                   secureTextEntry
                   placeholder="Password" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black"
                   onChangeText={text=>setPWD(text)}
                   value={pwd} 
                  />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                    secureTextEntry
                    placeholder="Confirm Password"
                    style={styles.TextInputStyle}
                    placeholderTextColor="black"
                    onChangeText={text => setCONPWD(text)}
                    value={conpwd}
                  />
                </Item>
              </Form>
            </Row>
            <Row
              style={{
                height: Layout.window.height * 0.1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity style={styles.appButtonContainer}
                onPress={()=>register()}
              >
                <Text style={styles.appButtonText}>Register</Text>
              </TouchableOpacity>
            </Row>
          </Grid>
        </Content>
      </ImageBackground>
    </Container>
  );
};



export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    color: Colors.BLACK,
    padding: 10,
    width: 310,
    borderColor: Colors.BLACK,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 50,
    // width: '93%',
  },
  inputbox: {
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: 'gray',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  textArea: {
    height: 80,
    justifyContent: "flex-start",
    borderRadius: 25,
    // paddingHorizontal: 90,
    width: '100%',
    marginVertical: 10,
    borderColor: 'gray',
    textAlign: 'center',
    // height: 50,
    fontSize: 17,
  },
});
