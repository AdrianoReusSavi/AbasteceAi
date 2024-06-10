import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './screens/MapScreen';
import DistanceScreen from './screens/DistanceScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomTabBar from './components/BottomTabBar';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
                <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Mapa' }} />
                <Tab.Screen name="Distance" component={DistanceScreen} options={{ tabBarLabel: 'Distância' }} />
                <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarLabel: 'Histórico' }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Configurações' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}