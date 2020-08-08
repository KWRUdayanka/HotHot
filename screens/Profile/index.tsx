import * as React from 'react';
import { AsyncStorage, StyleSheet, Linking, Image, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TabThreeParamList, Menu, AllUsers, User, Shop, Driver } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as firebase from 'firebase';
import Loading from '../Loading';
import { Container, Content, Text, Icon, Grid, Row, View, Col, List, Card, CardItem, Button } from 'native-base';
// import { FloatingAction } from 'react-native-floating-action';
import { Avatar } from 'react-native-elements';
import styles from './style'

type ProfileRouteProps = RouteProp<TabThreeParamList, 'Profile'>;
type ProfileNavigationProps = StackNavigationProp<TabThreeParamList, 'Profile'>;

type Prop = {
	route: ProfileRouteProps;
	navigation: ProfileNavigationProps;
};

interface ProfileProps {}

const Profile = (props: Prop) => {
	const ref = firebase.database();
	const user = firebase.auth().currentUser;
	const [profileData, setProfileData] = React.useState<User>({});
	const [userName, setUserName] = React.useState<string>('');
	const [userType, setUserType] = React.useState<AllUsers>({});
	const [isLoading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			loadProfileData();
		});

		return unsubscribe;
	}, [props]);



	const loadProfileData = async () => {
		setLoading(true);
		await ref.ref('/AllUsers/' + user?.uid + '/')
		.once('value')
		.then((snapshot) => {
			let temp: AllUsers = snapshot.val();
			setUserType(temp);

			if ( temp.userType == 'Customer' ) {
				setProfileData({});
				ref.ref('/User/' + user?.uid + '/')
					.once('value')
					.then((snapshot) => {
						let temp: User = snapshot.val();
						setProfileData(temp);
						setLoading(false);
					})
					.catch((error) => {
						setLoading(false);
						alert(error.message);
					});			
			} 
			
			else if ( temp.userType == 'Shop' ){
				setProfileData({});
				ref.ref('/Shop/' + user?.uid + '/')
					.once('value')
					.then((snapshot) => {
						let temp: User = snapshot.val();
						setProfileData(temp);
						setLoading(false);
					})
					.catch((error) => {
						setLoading(false);
						alert(error.message);
					});
			}

		})
		.catch((error) => {
			alert(error.message);
		});	
	};
	const changeData = () => {

	}

	const signOut = () => {
		firebase.auth().signOut().then(() => console.log('Log Out User..'));
	}

	// const _signOutAsync = async () => {
	// 	// await AsyncStorage.clear();
	// 	props.navigation.navigate('AuthStack');
	// };

	const contact = (phone?: string) => {
		Linking.openURL('tel:' + phone);
	};

	return (
		<Container>
			<Content>
			{userType.userType === 'Customer' ? (
				<Grid>
				<View style={styles.container}>
					<Image source={require('../../assets/icon/shop.png')} style={styles.inputImage}/>
				</View>
				<View style={styles.styleRow}>
					<Text style={styles.textInput}>User Name:
						<Text> {profileData.userName}
						</Text>
					</Text>
					<Text style={styles.textInput}
						onPress={() => contact(profileData.contactNumber)}
					>
						Contact No: {profileData.contactNumber} <Image source={require('../../assets/icon/phone.png')} style={styles.inputIcon}/>
					</Text>
				</View>
				<Row style={styles.styleRow}>
					<Text
						style={styles.textInput}
					>
						Address: {profileData.address}
					</Text>
				</Row>
				<Row style={styles.removeRow}>
					<View style={styles.inputContainer}>
						<Button onPress={() => changeData()}><Text style={styles.logoutButton}>Edit</Text><Image source={require('../../assets/icon/pencil.png')} style={styles.inputIcon}/></Button>
					</View>
					<View style={styles.inputContainer}>
						<Button onPress={() => signOut()}><Text style={styles.logoutButton}>Logout</Text><Image source={require('../../assets/icon/logout.png')} style={styles.inputIcon}/></Button>
					</View>
				</Row>
			</Grid>
			) : (
				<Grid>
					<View style={styles.container}>
						<Image source={require('../../assets/icon/shop.png')} style={styles.inputImage}/>
					</View>
					<View style={styles.styleRow}>
						<Text style={styles.textInput}>Shop Name:
							<Text> {profileData.userName}
							</Text>
						</Text>
						<Text style={styles.textInput}
							onPress={() => contact(profileData.contactNumber)}
						>
							Contact No: {profileData.contactNumber} <Image source={require('../../assets/icon/phone.png')} style={styles.inputIcon}/>
						</Text>
					</View>
					<Row style={styles.styleRow}>
						<Text
							style={styles.textInput}
						>
							Address: {profileData.address}
						</Text>
					</Row>
					<Row style={styles.removeRow}>
						<View style={styles.inputContainer}>
							<Button onPress={() => changeData()}><Text style={styles.logoutButton}>Edit</Text><Image source={require('../../assets/icon/pencil.png')} style={styles.inputIcon}/></Button>
						</View>
						<View style={styles.inputContainer}>
							<Button onPress={() => signOut()}><Text style={styles.logoutButton}>Logout</Text><Image source={require('../../assets/icon/logout.png')} style={styles.inputIcon}/></Button>
						</View>
					</Row>
				</Grid>
			)}
			</Content>
		</Container>
	);
};

export default Profile;
