import AsyncStorage from '@react-native-async-storage/async-storage';

const CONFIG_KEY = 'app_config';

export const saveConfig = async (config) => {
    try {
        await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
    }
};

export const loadConfig = async () => {
    try {
        const configString = await AsyncStorage.getItem(CONFIG_KEY);
        return configString ? JSON.parse(configString) : { fuelPrice: '', kmPerLiter: '' };
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        return { fuelPrice: '', kmPerLiter: '' };
    }
};