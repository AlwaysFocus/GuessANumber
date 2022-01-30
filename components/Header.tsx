import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const Header = (props:any) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.darkPrimary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'supermercadoOne'
    }
});

export default Header;

