import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from '../types';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack = createStackNavigator<AuthParamList>();


export default function AuthNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name= 'Login' component={Login} />
            <AuthStack.Screen name='Register' component={Register} />
        </AuthStack.Navigator>

    );
}