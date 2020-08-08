import * as React from 'react';
import { StyleSheet, Linking, Image, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TabTwoParamList, Menu, AllUsers, Order, Shop } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as firebase from 'firebase';
import Loading from '../Loading';
import { Container, Content, Text, Icon, Grid, Row, View, Col, List, Card, CardItem, Button } from 'native-base';
// import { FloatingAction } from 'react-native-floating-action';
import { Avatar } from 'react-native-elements';
import styles from './style'
import Colors from '../../constants/Colors';

type MenuViewRouteProps = RouteProp<TabTwoParamList, 'MenuView'>;
type MenuViewNavigationProps = StackNavigationProp<TabTwoParamList, 'MenuView'>;

type Prop = {
	route: MenuViewRouteProps;
	navigation: MenuViewNavigationProps;
};

interface MenuViewProps {}

const MenuView = (props: Prop) => {
	const menuId = props.route.params.menuId;
	const ref = firebase.database();
	const user = firebase.auth().currentUser;
	const [menu, setMenu] = React.useState<Menu>({});
	const [order, setOrder] = React.useState<Order>({});
	const [userType, setUserType] = React.useState<AllUsers>({});
	const [isLoading, setLoading] = React.useState(true);
	const [available] = React.useState<boolean>(false);

	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			loadMenu();
		});

		return unsubscribe;
	}, [props]);

	const loadMenu = async () => {

		setLoading(true);
		await ref.ref('/AllUsers/' + user?.uid + '/')
		.once('value')
		.then((snapshot) => {
			let temp: AllUsers = snapshot.val();
			setUserType(temp);

			setMenu({});
			ref.ref('/Menu/' + menuId + '/')
				.on('value', snapshot => {
					let temp: Menu = snapshot.val();
					setMenu(temp);
					setLoading(false);
				});


		})
		.catch((error) => {
			setLoading(false);
			alert(error.message);
		});	
	};

	const removing_Menu = async () => {
		setLoading(true);
		await ref
			.ref('/Menu/' + menuId)
			.remove()
			.then(() => {
				setLoading(false);
				props.navigation.pop();
			})
			.catch((error) => console.log(error))
	}


	const notAvailable_Menu = async () => {
		setLoading(true);
		const menu: Menu = {
			available:  true,
		};
		await ref
			.ref('/Menu/' + menuId + '/')
			.update(menu)
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const available_Menu = async () => {
		setLoading(true);
		const menu: Menu = {
			available: available,
		};
		await ref
			.ref('/Menu/' + menuId + '/')
			.update(menu)
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				alert(error.message);
			});

		};


	/////////////////////////////////////////////////////	
	const deliver = async () => {
		setLoading(true);
		const ref = firebase.database();
		const order: Order = {
			userId: user?.uid,
			foodItem: menu.foodItem,
			itemNo: menu.itemNo,
			shopId: menu.ownerId,
		};
		const orderRef = await ref.ref('/Order/').push();
		await ref
			.ref('/Order/' + orderRef.key + '/')
			.update(order)
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
		await ref
			.ref('/Shop/' + menu.ownerId + '/')
			.once('value')
			.then((snapshot) => {
				const tempUser: Shop = snapshot.val();
				tempUser.orders = tempUser.orders ? [...tempUser.orders, orderRef.key] : [orderRef.key];
				ref.ref('/Shop/' + menu.ownerId + '/')
				.update(tempUser)
				.then(() => {
					console.log(tempUser)
						setLoading(false);
						props.navigation.pop();
					})
					.catch((error) => {
						alert(error.message);
						setLoading(false);
					});
			})
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Container>
			<Content>
			{userType.userType === 'Customer' ? (
					<Grid>
						<Row style={styles.container}>
							<Avatar
								source={{
									uri:
										'https://firebasestorage.googleapis.com/v0/b/shopapp-14fd0.appspot.com/o/default_images%2Fdefault_shop.jpg?alt=media&token=8e80458e-bbb4-4497-991d-a477544c3433',
								}}
								size={150}
								// showAccessory
								containerStyle={styles.containerStyle}
							/>
							{/* <Icon name="md-link" style={{ color: Colors.BLACK, fontSize: 15 }} type="Ionicons" /> */}
						</Row>
						
							<View>
								{menu.available ? (
									<View style={styles.noticeContainerA}>
										<Text>Available</Text>
									</View>
								) : (
									<View style={styles.noticeContainerN}>
										<Text style={styles.text}>NotAvailable</Text>
									</View>
									
								)}
								{menu.available ? (
									<View style={styles.inputContainerB}>
										<Button onPress={() => deliver()}><Text style={styles.logoutButton}>Deliver</Text><Image source={require('../../assets/icon/delivery-man.png')} style={styles.inputIcon}/></Button>
									</View>
								) : (null)}
							</View>
						<Col style={styles.styleCol}>
							<Text style={styles.textInputA}>
								{menu.foodItem}
							</Text>
							<Text
								note
								style={styles.textInputB}
							>
								{menu.itemNo}
							</Text>
						</Col>
						{menu.description ? (
						<Row style={styles.styleRow}>
							<Text
								style={styles.textInputC}
							>
								{menu.description}
							</Text>
						</Row>
						) : null}
					</Grid>
			):(

				<Grid>
					<Row style={styles.container}>
						<Avatar
							source={{
								uri:
									'https://firebasestorage.googleapis.com/v0/b/shopapp-14fd0.appspot.com/o/default_images%2Fdefault_shop.jpg?alt=media&token=8e80458e-bbb4-4497-991d-a477544c3433',
							}}
							size={150}
							// showAccessory
							containerStyle={styles.containerStyle}
						/>
						{/* <Icon name="md-link" style={{ color: Colors.BLACK, fontSize: 15 }} type="Ionicons" /> */}
					</Row>
					<Row style={styles.removeRow}>
						<View style={styles.inputContainer}>
							<Button style={styles.buttonBacground} onPress={() => removing_Menu()}><Image source={require('../../assets/icon/delete.png')} style={styles.inputIcon}/></Button>
							{menu.available ? (
								<Button
								bordered
								style={styles.buttonAvailable}
								onPress={() => available_Menu()}
							>
								<Text style={styles.text}>Available</Text>
							</Button>
							) : (
								<Button
									bordered
									style={styles.buttonNotAvailable}
									onPress={() => notAvailable_Menu()}
								>
									<Text style={styles.text}>NotAvailable</Text>
								</Button>
								
							)}
						</View>
					</Row>
					<Col style={styles.styleCol}>
						<Text style={styles.textInputA}>
							{menu.foodItem}
						</Text>
						<Text
							note
							style={styles.textInputB}
						>
							{menu.itemNo}
						</Text>
					</Col>
					{menu.description ? (
						<Row style={styles.styleRow}>
							<Text
								style={styles.textInputC}
							>
								{menu.description}
							</Text>
						</Row>
					) : null}
				</Grid>
			)}
			</Content>
		</Container>
	);
};

export default MenuView;
