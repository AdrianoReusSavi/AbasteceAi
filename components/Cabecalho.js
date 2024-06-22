import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image 
                source={require('./../image/Logo.png')}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1000,
        padding: 10,
    },
    logo: {
        width: 50,
        height: 50,
    }
});

export default Header;