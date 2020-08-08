import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import Colors from '../constants/Colors';

interface LoadingProps {}

const Loading = (props: LoadingProps) => {
	return (
		<View style={styles.container}>
			<Spinner size="large" color={Colors.NAVYBLUE} />
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
