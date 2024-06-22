import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import DistanceScreen from './screens/DistanceScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import GptScreen from './screens/GptScreen';
import BottomTabBar from './components/BottomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Mapa' }} />
            <Tab.Screen name="Distance" component={DistanceScreen} options={{ tabBarLabel: 'Distância' }} />
            <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarLabel: 'Histórico' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Configurações' }} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="GptScreen" component={GptScreen} options={{ title: 'GPT Screen' }} />
        </Stack.Navigator>
    );
}
