import React from 'react';
import { StyleSheet, View, Alert, Button,Text,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import DistanceScreen from './screens/DistanceScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import GptScreen from './screens/GptScreen';
import BottomTabBar from './components/BottomTabBar';

function Header() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' ,}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Distância</Text>
            <Image
                source={require('./image/Logo-sem-fundo.png')}
                style={{ width: 60, height: 30, marginLeft:230 }}
            />
        </View>
    );
}

function HeaderGpt() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' ,}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Distância</Text>
            <Image
                source={require('./image/Logo-sem-fundo.png')}
                style={{ width: 60, height: 30, marginLeft:175 }}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Mapa', headerTitle: (props) => <Header {...props} /> }} />
            <Tab.Screen name="Distance" component={DistanceScreen} options={{ tabBarLabel: 'Distância', headerTitle: (props) => <Header {...props} />}} />
            <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarLabel: 'Histórico' , headerTitle: (props) => <Header {...props} /> }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Configurações', headerTitle: (props) => <Header {...props} />  }} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="GptScreen" component={GptScreen} options={{ title: 'GPT Screen', headerTitle: (props) => <HeaderGpt {...props} />  }} />
        </Stack.Navigator>
    );
}
