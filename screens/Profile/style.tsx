import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';



export default StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5
    },
    inputImage: {
      width: 100,
      height: 100
    },
    removeRow: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputContainer: {
      padding: 35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      height: 40,
    },
    inputIcon: {
      width: 30,
      height: 30,
    },
    styleRow: {
      justifyContent: 'center', 
      alignItems: 'center'
    },
    textInput: {
      color: Colors.BLACK,
      padding: 10,
      width: 350,
      borderColor: Colors.BLACK,
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 10,
    },
    logoutButton: {
      color: Colors.BLACK,
    },
})