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
import { TabOneParamList, Order, AllUsers, Shop, User } from '../../types';
import Swiper from 'react-native-swiper'
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../constants/Colors';

type NotificationScreenRoteProps = RouteProp<TabOneParamList, 'Notification'>;
type NotificationScreenNavigationProps = StackNavigationProp<TabOneParamList, 'Notification'>;

type Props = {
	route: NotificationScreenRoteProps ;
	navigation: NotificationScreenNavigationProps;
};

interface NotificationScreenProps {}

const NotificationScreen = (props: Props) => {
  const user = firebase.auth().currentUser;
  const ref = firebase.database();
  const [orderData, setOrderData] = React.useState<Array<Order>>([]);
	const [shopData, setShopData] = React.useState<Array<Shop>>([]);
	const [userType, setUserType] = React.useState<AllUsers>({});
	const [isLoading, setLoading] = React.useState(true);


  React.useEffect(() => {
		loadData();
		return() => {
			setOrderData([]);
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
      
      if (temp.userType === 'Customer') {
        
      } 
      
      
      else if (temp.userType === 'Shop') {
        
        
        ref.ref('/Shop/' + user?.uid + '/orders').on('value', (snapshot) => {
					setOrderData([]);
					let orderKeys: Array<string> = snapshot.val();
					if (!orderKeys) {
						console.log('no notifications');
						return;
					}
					orderKeys.map(async (value, i) => {
						await ref
							.ref('/Order/' + value + '/')
							.once('value')
							.then((snapshot2) => {
								let order: Order = snapshot2.val();
                order.orderId = value;
								setOrderData((preOrderData) => [...preOrderData, order]);
								setLoading(false);
              })
              .catch((error) => {
                alert(error.message);
              });
          });
        });  
      }

    })
		.catch((error) => {
			alert(error.message);
		});		


  }

  return (
    <Container>
      <Content>
      <List>
					{orderData.length === 0 ? (
						<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 30 }}>
							<Text style={{ fontWeight: 'bold', color: Colors.NAVYBLUE }}>No Details</Text>
						</View>
					) : (
						orderData.map((value, i) => {
							return (
								<ListItem
									noIndent
									key={i}
									onPress={() =>
										props.navigation.push('Order', {
											orderId: value.orderId,
											title: value.foodItem,
										})
									}
								>
									<Left>
										<Thumbnail source={require('../../assets/icon/bell.png')}/>
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

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {}
});
