import React, { useState, useEffect, useRef } from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

import { showQuest } from '../../store/modules/quest/actions';

const array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

const arrayObject = [
    { 
        id: 1, 
        pos: array[Math.floor(Math.random() * array.length)], 
        image: require('../../assets/star.png'), 
        nome: 'Estrelas' 
    },
    { 
        id: 2, 
        pos: array[Math.floor(Math.random() * array.length)], 
        image: require('../../assets/bola.png'), 
        nome: 'Bola de futebol' 
    },
    { 
        id: 3, 
        pos: array[Math.floor(Math.random() * array.length)], 
        image: require('../../assets/pato.png'), 
        nome: 'Patos' 
    },
    { 
        id: 4, 
        pos: array[Math.floor(Math.random() * array.length)], 
        image: require('../../assets/pinguin.jpg'), 
        nome: 'Pinguins' 
    },
    { 
        id: 5, 
        pos: array[Math.floor(Math.random() * array.length)], 
        image: require('../../assets/umaBanana.png'), 
        nome: 'Bananas' 
    },
]

const randomObject = arrayObject[Math.floor(Math.random() * arrayObject.length)];

export function GameArrastarQuant(){

    const dispatch = useDispatch();

    function shuffle(arrayObject) {

        var i = array.length;
    
        while (i--) {
            return array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
        }
    
    }

    function handleSubmit(suffle) {
        if(suffle !== randomObject.pos) {
            dispatch(showQuest('Uma pena', 'error'))
            return;
        } else if(suffle === randomObject.pos){
            dispatch(showQuest('Uma pena', 'sucess'))

        }

    }

    return (
    <View style={styles.container}>
       <View style={styles.viewQuestion}>
            <Feather name="help-circle" size={25} color='#FFF'/> 
            <Text style={styles.textQuestion}>Jogo das figuras</Text>
       </View>
       
       <View style={styles.informations}>
        <Text style={styles.textHeader}>Quanto(a)s figuras de {randomObject.nome.toLocaleUpperCase()} contém?</Text>
        <Text style={styles.textHeader}>Você tem 5 chances</Text>
       </View>

       <View style={styles.containerQuestion}>
            {Array.from({ length: randomObject.pos }).map((_, index) => (
                <Image key={index} style={styles.imageQuestion} source={randomObject.image}/>
            ))}
       </View>

       <View style={styles.viewResposta}>
        <View style={styles.viewRespostax}>
            <TouchableOpacity onPress={() => handleSubmit(shuffle())} style={styles.buttonResposta}>
                <Text style={styles.textResponse}>{shuffle()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSubmit(shuffle())} style={styles.buttonResposta}>
                <Text style={styles.textResponse}>{shuffle()}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.viewRespostax}>
            <TouchableOpacity onPress={() => handleSubmit(shuffle())}style={styles.buttonResposta}>
                <Text style={styles.textResponse}>{shuffle()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSubmit(shuffle())} style={styles.buttonResposta}>
                <Text style={styles.textResponse}>{shuffle()}</Text>
            </TouchableOpacity>
        </View>
       </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    viewQuestion:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3a86ff',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    textQuestion:{
        fontSize: 20,
        color: "#FFF",
        fontWeight: 'bold',
        marginLeft: 15,
    },
    containerQuestion:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    viewResposta:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageQuestion:{
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    buttonResposta: {
        height: 60,
        width: 150,
        marginBottom: 15,
        marginHorizontal: 15,
        fontSize: 20,
        borderWidth: 2,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#3a86ff'
      },
      informations:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 5,
      },
      textResponse:{
        fontSize: 17,
        color: '#3a86ff',
        fontWeight: 'bold'
      },
      textHeader:{
        fontSize: 17,
        color: '#333'
      }
})