import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const BottomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const descriptor = descriptors[route.key];
                if (!descriptor) {
                    return null;
                }
                const { options } = descriptor;
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={[styles.tabItem, { backgroundColor: isFocused ? '#eee' : '#fff' }]}
                    >
                        <Text style={{ color: isFocused ? '#333' : '#666' }}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomTabBar;