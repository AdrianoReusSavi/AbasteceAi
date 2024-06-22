import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

export default function InputFieldConsumo({ label, value, onChangeText, keyboardType = 'default', editable = true }) {
    return (
        <View style={styles.inputContainer}>
            <Text>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                editable={editable}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
        width: '70%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});