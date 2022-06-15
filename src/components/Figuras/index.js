import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, set, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


export function Figuras({ bauX, setContador, data }){

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    async function incrementCount() {
        setContador((currentCount) => currentCount + 1);
        data.inBau = 1;
    }

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: (event) => {
            if(translateX.value >= ( bauX.x / 1.5 ) && translateX.value <= bauX.x * 1.5 ) {
                translateX.value = withTiming(100000000);
                translateY.value = withTiming(100000000);          
                runOnJS(incrementCount)();
            } else {
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
            }
        },
    })

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                },
            ]
        }
    })

    useEffect(() => {

    }, [incrementCount]);

    return (
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            {
                data?.inBau === 0 ? 
                <Animated.View style={[styles.object, rStyle]}>
                    <Animated.Image 
                    style={{
                        height: 50,
                        width: 50,
                        resizeMode: 'contain'
                    }}
                    source={
                        data?.type === 'Cavalo' ? require('../../assets/boneca.png') :
                        data?.type === 'Bicicleta' ? require('../../assets/carrinho.png') :
                        data?.type === 'Pinguin' ? require('../../assets/xbox.png') :
                        data?.type === 'Moto' ? require('../../assets/bola.png') :
                        data?.type === 'Ursinho' ? require('../../assets/lucasNeto.png') :
                        data?.type === 'Ovni' && require('../../assets/caminhao.png')
                    } />
                </Animated.View> : 
                <Animated.View style={{display: 'none'}}>
                <Animated.Image 
                style={{
                    height: 50,
                    width: 50,
                    resizeMode: 'contain'
                }}
                source={
                    data?.type === 'Cavalo' ? require('../../assets/boneca.png') :
                    data?.type === 'Bicicleta' ? require('../../assets/carrinho.png') :
                    data?.type === 'Pinguin' ? require('../../assets/xbox.png') :
                    data?.type === 'Moto' ? require('../../assets/bola.png') :
                    data?.type === 'Ursinho' ? require('../../assets/lucasNeto.png') :
                    data?.type === 'Ovni' && require('../../assets/caminhao.png')
                } />
            </Animated.View>
            }
        </PanGestureHandler>
    );
}
const styles = StyleSheet.create({
    object: {
        backgroundColor: 'rgba(50,50,50,0.1)',
        padding: 5,
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
})