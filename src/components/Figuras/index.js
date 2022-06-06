import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


export function Figuras({ bauX, contador, data }){

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

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
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)
            if(distance >= ( bauX.x / 1.5 )) {
                translateX.value = withTiming(bauX.x);
                translateY.value = withTiming(bauX.y);
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


  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[styles.object, rStyle]}>
            <Animated.Image 
            style={{
                height: 50,
                width: 50
            }}
            source={
                data?.type === 'Cavalo' ? require('../../assets/Hallowen.png') :
                data?.type === 'Bicicleta' ? require('../../assets/joyStick.png') :
                data?.type === 'Pinguin' ? require('../../assets/star.png') :
                data?.type === 'Moto' ? require('../../assets/Bola_de_Futebol.png') :
                data?.type === 'Ursinho' ? require('../../assets/jogoBau.png') :
                data?.type === 'Ovni' && require('../../assets/jogoMao.png')
            } />
        </Animated.View>
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
    },
})