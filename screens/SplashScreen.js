
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image 
                source={require('./../image/Logo-sem-fundo.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Bem-vindo ao Abastece Ai!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});