import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './screens/MapScreen';
import DistanceScreen from './screens/DistanceScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomTabBar from './components/BottomTabBar';
import { ThemeProvider } from './components/ThemeContext'; // Certifique-se de importar o ThemeProvider

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
                    <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
                    <Tab.Screen name="Distance" component={DistanceScreen} options={{ title: 'Distância' }} />
                    <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
                    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}