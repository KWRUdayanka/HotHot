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

type ViewShopRoteProps = RouteProp<TabTwoParamList, 'Foods'>;
type ViewShopNavigationProps = StackNavigationProp<TabTwoParamList, 'Foods'>;

type Props = {
	route: ViewShopRoteProps;
	navigation: ViewShopNavigationProps;
};

interface ShopScreenProps {}

const ViewShop = (props: Props) => {
	const shopId = props.route.params.shopId;
	const user = firebase.auth().currentUser;
	const ref = firebase.database();
	const [menuData, setMenuData] = React.useState<Array<Menu>>([]);
	const [userType, setUserType] = React.useState<AllUsers>({});
	const [isLoading, setLoading] = React.useState(true);

	React.useEffect(() => {
		loadData();
		return() => {
			setMenuData([]);
		}
	}, []);
	

	const loadData = async () => {
		setLoading(true);
		await ref.ref('/AllUsers/' + shopId + '/')
		.once('value')
		.then((snapshot) => {
			let temp: AllUsers = snapshot.val();
			setUserType(temp);
				ref.ref('/Shop/' + shopId + '/menus').on('value', (snapshot) => {
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



		})
		.catch((error) => {
			alert(error.message);
		});		

		

	};

	return (
		<Container>
			<Content>
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
				
			</Content>
		</Container>
	);
};

export default ViewShop;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
