import * as React from 'react';
import { StyleSheet, Linking, Image, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TabOneParamList, AllUsers, Order, Shop } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as firebase from 'firebase';
import Loading from '../Loading';
import { Container, Content, Text, Icon, Grid, Row, View, Col, List, Card, CardItem, Button } from 'native-base';
// import { FloatingAction } from 'react-native-floating-action';
import { Avatar } from 'react-native-elements';
import styles from './styles'
import Colors from '../../constants/Colors';

type OrderViewRouteProps = RouteProp<TabOneParamList, 'OrderView'>;
type OrderViewNavigationProps = StackNavigationProp<TabOneParamList, 'OrderView'>;

type Prop = {
	route: OrderViewRouteProps;
	navigation: OrderViewNavigationProps;
};

interface OrderViewProps {}

const OrderView = (props: Prop) => {
	const orderId = props.route.params.orderId;
	const ref = firebase.database();
	const user = firebase.auth().currentUser;
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

			setOrder({});
			ref.ref('/Order/' + orderId + '/')
				.on('value', snapshot => {
                    let temp: Order = snapshot.val();
					setOrder(temp);
					setLoading(false);
                })


		})
		.catch((error) => {
			setLoading(false);
			alert(error.message);
		});	
	};

    const regect_order = async () => {
        setLoading(true);
		const order: Order = {
			acceptOrder: false,
		};
		await ref
			.ref('/Order/' + orderId + '/')
			.update(order)
			.then(() => {
                setLoading(false);
                props.navigation.pop();
			})
			.catch((error) => {
				alert(error.message);
		});
    }

    const accept_order = async () => {
        setLoading(true);
		const order: Order = {
			acceptOrder: true,
		};
		await ref
			.ref('/Order/' + orderId + '/')
			.update(order)
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				alert(error.message);
		});
    }

	/////////////////////////////////////////////////////	
	const deliver = async () => {
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

                            <Col style={styles.styleCol}>
                                <Text style={styles.textInputA}>
                                    {order.foodItem}
                                </Text>
                                <Text
                                    note
                                    style={styles.textInputB}
                                >
                                    {order.itemNo + '    '}
                                </Text>
                            </Col>
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
                    {order.acceptOrder === true ?(
                        <View>

                            {order.acceptOrder === true ?(
                                <View style={styles.noticeContainerA}>
                                    <Text style={{paddingHorizontal: 9}}>Oder Accepted</Text>
                                </View>
                                
                            ):(

                                <Row style={styles.removeRow}>
                                        <View style={styles.inputContainerB}>
                                            <Button onPress={() => regect_order()}><Text style={styles.logoutButton}>Reject</Text><Image source={require('../../assets/icon/goods.png')} style={styles.inputIcon}/></Button>
                                        </View>
                                        <View style={styles.inputContainerB}>
                                            <Button onPress={() => accept_order()}><Text style={styles.logoutButton}>Accept</Text><Image source={require('../../assets/icon/clearance.png')} style={styles.inputIcon}/></Button>
                                        </View>
                                </Row>

                            )}
                        </View>

                    ):(
                        <View style={styles.noticeContainerB}>
                            <Text style={{paddingHorizontal: 13}}>This Oder Already Rejected.</Text>
                        </View>
                    )}
					
					<Col style={styles.styleCol}>
						<Text style={styles.textInputA}>
							{order.foodItem}
						</Text>
						<Text
							note
							style={styles.textInputB}
						>
							{order.itemNo }
						</Text>
					</Col>
				</Grid>
			)}
			</Content>
		</Container>
	);
};

export default OrderView;
