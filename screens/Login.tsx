import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AuthParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Header, Content, Item, Input, Grid, Row, Form, Button, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';
import {ImageBackground} from 'react-native';
import * as firebase from 'firebase';

interface LoginProps {}

type LoginRouteProps = RouteProp<AuthParamList, 'Login'>;
type LoginNavigationProps = StackNavigationProp<AuthParamList, 'Login'>;

type prop = {
    route: LoginRouteProps,
    navigation: LoginNavigationProps
}

const Login = ({ route, navigation }: prop) => {

	const [email, setEmail] = React.useState('')
	const [pwd, setPWD] = React.useState('')

	const login=()=> {
		firebase.auth().signInWithEmailAndPassword(email,pwd)
		.catch(err=>alert(err))
	}
  return (
		<Container>
			<ImageBackground source={require('../assets/images/background.jpg')} style={styles.image}>
				{/* <Header /> */}
				<Content>
					<Grid>
						<Row style={{ height: Layout.window.height * 0.1 }}></Row>
						<Row style={{ height: Layout.window.height * 0.4 }}>
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
								  	placeholder="Email"
								  	keyboardType='email-address'
								  	style={styles.TextInputStyle} 
								  	placeholderTextColor="black" 
									 onChangeText={text => setEmail(text)}
									value={email}/>
								</Item>
								<Item rounded style={styles.inputbox}>
								  <Input 
								  secureTextEntry 
								  placeholder="Password" 
								  style={styles.TextInputStyle} 
								  placeholderTextColor="black"
									  onChangeText={text => setPWD(text)}
									  value={pwd} 
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
							<TouchableOpacity style={styles.appButtonContainer} onPress={()=> login()}>
								<Text style={styles.appButtonText}>Log in</Text>
							</TouchableOpacity>
						</Row>
						<Row
							style={{
								height: Layout.window.height * 0.1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text>If you not Register...?</Text>
                            <Item onPress={() => navigation.push("Register")}>
                            <Text style={{color: 'yellow'}}>Register</Text>
                            </Item>
						</Row>
					</Grid>
				</Content>
			</ImageBackground>
		</Container>
  );
};

export default Login;

const styles = StyleSheet.create({
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
});

