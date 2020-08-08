import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';



export default StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15
    },
    containerStyle: {
      borderWidth: 2,
      borderColor: Colors.BLACK
    },
    removeRow: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      width: 290,
      height: 40,
      marginBottom: 20,
    },
    inputIcon: {
      width: 30,
      height: 30,
    },
    buttonBacground : {
      backgroundColor: Colors.WHITE
    },
    buttonNotAvailable: {
      width: 150,
      marginLeft: 40,
      justifyContent: 'center',
      backgroundColor: Colors.RED,
      borderColor: Colors.BLACK
    },
    buttonAvailable: {
      width: 150,
      marginLeft: 40,
      justifyContent: 'center',
      backgroundColor: Colors.BLUE,
      borderColor: Colors.BLACK
    },
    text: {
      color: Colors.WHITE
    },
    styleCol: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20
    },
    textInputA: {
      color: Colors.BLACK, 
      fontSize: 25,
      fontWeight: '600',
      marginBottom: 5
    },
    textInputB: {
      color: Colors.BLACK,
      fontSize: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    styleRow: {
      justifyContent: 'center', 
      alignItems: 'center'
    },
    textInputC: {
      color: Colors.BLACK,
      marginHorizontal: 10,
      padding: 10,
      borderColor: Colors.BLACK,
      borderWidth: 0.5,
      borderRadius: 10,
      marginBottom: 10,
    },
    noticeContainerA: {
      padding: 10,
      marginHorizontal: 114,
      backgroundColor: Colors.GREEN,
      width: 150,
      justifyContent: 'center',
      borderColor: Colors.BLACK,
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 10,
    },
    noticeContainerN: {
      padding: 10,
      marginHorizontal: 114,
      backgroundColor: Colors.RED,
      width: 150,
      justifyContent: 'center',
      borderColor: Colors.BLACK,
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 10,
    },
    addContainer: {
      padding: 10,
      marginHorizontal: 114,
      width: 150,
      justifyContent: 'center',
      borderColor: Colors.BLACK,
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 10,
    },
    logoutButton: {
      color: Colors.BLACK,
    },
    inputContainerB: {
      padding: 35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      height: 40,
    }
})