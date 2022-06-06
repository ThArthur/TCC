import React, { useState, useEffect } from 'react';

import { View, StyleSheet, Text, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Figuras } from '../../components/Figuras';

export function GameSequence(){

    let figurer = [
        {
            key: '1',
            type: 'Bicicleta'
        },
        {
            key: '2',
            type: 'Cavalo'
        },
        {
            key: '3',
            type: 'Moto'
        },
        {
            key: '4',
            type: 'Pinguin'
        },
        {
            key: '5',
            type: 'Ursinho'
        },
        {
            key: '6',
            type: 'Ovni'
        },
    ]
    
    const [ bauX, setBauX ] = useState({
        x: 0,
        y: 0
    });

    const [ bauItens, setBauItens ] = useState([]);
    var contador = 0;

  return (
    <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.title}>
                Escolha seu brinquedo preferido e coloque no baú,
                contando-os Clique na quantidade escolhida {' '}
                {contador}
            </Text>
        </View>

        <View style={styles.content}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '25%'
            }}>
                {figurer.map(fig => (
                    <Figuras 
                    key={fig.key} 
                    bauX={bauX}
                    contador={contador}
                    data={fig}
                    />
                ))}
            </View>


            <View 
            onLayout={event => {
                if(!event) return;
                const layout = event.nativeEvent.layout;
                setBauX({
                    x: layout.x,
                    y: layout.y
                })
            }}>
                <Image
                style={styles.box}
                source={require('../../assets/jogoBau.png')}
                />
            </View>
        </View>

    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    header:{
        paddingVertical: 25,
        paddingHorizontal: 25,
    },
    content:{
        paddingRight: 50,
        paddingLeft: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 20,
        color: '#000'
    },
    box:{ 
        height: 150,
        width: 150,
    }
    
})