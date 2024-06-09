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
            <Tab.Screen name="Cálculo de Distância" component={DistanceScreen} />
            <Tab.Screen name="Histórico" component={HistoryScreen} />
            <Tab.Screen name="Configurações" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
