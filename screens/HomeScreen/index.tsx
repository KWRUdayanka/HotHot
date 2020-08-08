import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import {
	Button,
	Container,
	Header,
	Left,
	Icon,
	Body,
	Title,
	Right,
	Content,
	List,
	ListItem,
	Thumbnail,
	Text,
	View,
} from 'native-base';
import * as firebase from 'firebase';
import { RouteProp } from '@react-navigation/native';
import { TabTwoParamList, Menu, AllUsers, Shop, User } from '../../types';
import Swiper from 'react-native-swiper'
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../constants/Colors';

type HomeScreenRoteProps = RouteProp<TabTwoParamList, 'Home'>;
type HomeScreenNavigationProps = StackNavigationProp<TabTwoParamList, 'Home'>;

type Props = {
	route: HomeScreenRoteProps;
	navigation: HomeScreenNavigationProps;
};

interface ShopScreenProps {}

const HomeScreen = (props: Props) => {
	const user = firebase.auth().currentUser;
	const ref = firebase.database();
	const [menuData, setMenuData] = React.useState<Array<Menu>>([]);
	const [shopData, setShopData] = React.useState<Array<Shop>>([]);
	const [userType, setUserType] = React.useState<AllUsers>({});
	const [isLoading, setLoading] = React.useState(true);

	React.useEffect(() => {
		loadData();
		return() => {
			setMenuData([]);
			setShopData([]);
		}
	}, []);
	

	const loadData = async () => {
		setLoading(true);
		await ref.ref('/AllUsers/' + user?.uid + '/')
		.once('value')
		.then((snapshot) => {
			let temp: AllUsers = snapshot.val();
			setUserType(temp);

			

			if ( temp.userType == 'Customer' ) {
				
				ref.ref('/Shop/').once('value', (snapshot) => {
					var shops = snapshot.val();
					if (!snapshot.exists()) {
						console.log('no shops');
						setLoading(false);
						return;
					}
					for (var key in shops) {
						if (shops.hasOwnProperty(key)) {
							const shop  = {
								shopId: [key],
								shopName: shops[key].userName,
								contactNumber: shops[key].contactNumber,								
							};
							setShopData((preShopData) => [...preShopData, shop]);
							setLoading(false);
						}
					}
				})
				
			} 
			
			
			else if ( temp.userType == 'Shop' ) {
				ref.ref('/Shop/' + user?.uid + '/menus').on('value', (snapshot) => {
					setMenuData([]);
					let menuKeys: Array<string> = snapshot.val();
					if (!menuKeys) {
						console.log('no menu');
						return;
					}
					menuKeys.map(async (value, i) => {
						await ref
							.ref('/Menu/' + value + '/')
							.once('value')
							.then((snapshot2) => {
								let menu: Menu = snapshot2.val();
								menu.menuId = value;
								setMenuData((preMenuData) => [...preMenuData, menu]);
								setLoading(false);
							});
					});
				});
			}



		})
		.catch((error) => {
			alert(error.message);
		});		

		

	};

	return (
		<Container>
			<Content>
			{userType.userType === 'Customer' ? (
				<List>
					{shopData.length === 0 ?(
						<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 30 }}>
						<Text style={{ fontWeight: 'bold', color: Colors.NAVYBLUE }}>No Details</Text>
					</View>
					):(
						shopData.map((value, i) => {
							return (
								<ListItem
									noIndent
									key={i}
									onPress={() =>
										props.navigation.push('Foods', {
											shopId: value.shopId,
											name: value.shopName,
										})
									}
								>
									<Left>
										<Thumbnail source={require('../../assets/icon/shop.png')}/>
										<Body>
											<Text>{value.shopName}</Text>
											<Text note>{value.contactNumber}</Text>
										</Body>
									</Left>
								</ListItem>
							);
						})
					)}
				</List>
				
			) : (
				<List>
					{menuData.length === 0 ? (
						<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 30 }}>
							<Text style={{ fontWeight: 'bold', color: Colors.NAVYBLUE }}>No Details</Text>
						</View>
					) : (
						menuData.map((value, i) => {
							return (
								<ListItem
									noIndent
									key={i}
									onPress={() =>
										props.navigation.push('MenuView', {
											menuId: value.menuId,
											title: value.foodItem,
										})
									}
								>
									<Left>
										<Thumbnail source={require('../../assets/icon/fast-food.png')}/>
										<Body>
											<Text>{value.foodItem}</Text>
											<Text note>{value.itemNo}</Text>
										</Body>
									</Left>
								</ListItem>
							);
						})
					)}
				</List>
			)}
				
			</Content>
			{userType.userType === 'Shop' ? (
				<FloatingAction
				floatingIcon={<Icon name="md-add" style={{ color: '#fff' }} />}
				onPressMain={() => props.navigation.push('CreateMenu')}
				showBackground={false}
			/>
			) : null}
		</Container>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
