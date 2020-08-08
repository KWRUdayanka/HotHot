import * as React from 'react';
import { useCallback } from 'react';
import { StyleSheet, CameraRoll } from 'react-native';
import { Container, Content, Grid, Row, Form, Item, Input, Textarea, Text, Button, View } from 'native-base';
import Colors from '../../constants/Colors';
import * as firebase from 'firebase';
import { Menu, Shop, TabTwoParamList } from '../../types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Loading from '../Loading';

type CreateMenuRouteProps = RouteProp<TabTwoParamList, 'CreateMenu'>;
type CreateMenuNavigationProps = StackNavigationProp<TabTwoParamList, 'CreateMenu'>;

type Props = {
	route: CreateMenuRouteProps;
	navigation: CreateMenuNavigationProps;
};
interface CreateMenuProps {}

const createMenu = (props: Props) => {
	const [foodItem, setMenuName] = React.useState<string>('');
	const [itemNo, setItemNo] = React.useState<string>('');
	const [image, setImage] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');
	const [available] = React.useState<boolean>(true);
	const [isLoading, setLoading] = React.useState(false);
	const [after, setAfter] = React.useState(null);
  	const [hasNextPage, setHasNextPage] = React.useState(true);

	// const getPhotos = useCallback(async () => {
	// 	if (!hasNextPage) return;

	// 	const { edges, page_info: pageInfo } = await CamaraRoll.getPhotos({
	// 		first,
	// 		assetType,
	// 		groupTypes,
	// 	})
	// })

	const create_Menu = async () => {
		setLoading(true);
		const ref = firebase.database();
		const shop = firebase.auth().currentUser;
		const menu: Menu = {
			ownerId: shop?.uid,
			foodItem: foodItem,
			image:image,
			itemNo: itemNo,
			description: description,
			available:available,
		};
		const menuRef = await ref.ref('/Menu/').push();
		await ref
			.ref('/Menu/' + menuRef.key + '/')
			.update(menu)
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
		await ref
			.ref('/Shop/' + shop?.uid + '/')
			.once('value')
			.then((snapshot) => {
				const tempUser: Shop = snapshot.val();
				tempUser.menus = tempUser.menus ? [...tempUser.menus, menuRef.key] : [menuRef.key];
				ref.ref('/Shop/' + shop?.uid + '/')
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
	};


	if (isLoading) {
		return <Loading />;
	}
	return (
		<Container>
			<Content>
				<Grid>
					<Row>
						<Form style={{ flex: 1, paddingHorizontal: 10 }}>
							<Item
								regular
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
							>
								<Input
									placeholder="Food Item:"
									onChangeText={(txt) => setMenuName(txt)}
									value={foodItem}
								/>
							</Item>
							<Item
								regular
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
							>
								<Input
									placeholder="Item no:"
									onChangeText={(txt) => setItemNo(txt)}
									value={itemNo}
								/>
							</Item>
							<Item
								regular
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
							>
								<Input
									placeholder="Add a image:"
									onChangeText={(txt) => setImage(txt)}
									value={image}
								/>
							</Item>
							<Textarea
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
								bordered
								rowSpan={5}
								underline
								placeholder="Description:"
								onChangeText={(txt) => setDescription(txt)}
							/>
						</Form>
					</Row>
					<Row style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button
							bordered
							style={{ width: 200, borderRadius: 25, justifyContent: 'center' }}
							onPress={() => create_Menu()}
						>
							<Text>Create</Text>
						</Button>
					</Row>
				</Grid>
			</Content>
		</Container>
	);
};

export default createMenu;

const styles = StyleSheet.create({
	container: {},
});
