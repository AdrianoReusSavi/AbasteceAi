import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './MapScreen';
import DistanceScreen from './DistanceScreen';
import HistoryScreen from './HistoryScreen'; // Importe a nova tela
import SettingsScreen from './SettingsScreen'; // Importe a nova tela

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="C�lculo de Dist�ncia" component={DistanceScreen} />
            <Tab.Screen name="Hist�rico" component={HistoryScreen} />
            <Tab.Screen name="Configura��es" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
