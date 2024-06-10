import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function ButtonGroup({ buttons }) {
    return (
        <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
                <Button key={index} title={button.title} onPress={button.onPress} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 10,
    },
});