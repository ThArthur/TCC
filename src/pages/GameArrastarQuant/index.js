import React, { useState, useEffect, useRef } from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function GameArrastarQuant(){

    const array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

    const arrayObject = [
        { id: 1, pos: array[Math.floor(Math.random() * array.length)], image: '../../assets/star.png', nome: 'Estrelas' },
        { id: 2, pos: array[Math.floor(Math.random() * array.length)], image: '../../assets/bola.png', nome: 'Boals' },
        { id: 3, pos: array[Math.floor(Math.random() * array.length)], image: '../../assets/pato.png', nome: 'Patos' },
        { id: 4, pos: array[Math.floor(Math.random() * array.length)], image: '../../assets/pinguin.jpg', nome: 'Pinguins' },
        { id: 5, pos: array[Math.floor(Math.random() * array.length)], image: '../../assets/umaBanana.png', nome: 'Bananas' },
    ]

    const randomObject = arrayObject[Math.floor(Math.random() * arrayObject.length)];

    const [numeroAleatorio, setNumeroAleatorio] = useState(10);
    const [tituloPergunta, setTituloPergunta] = useState('');
    const [imagemUtilizadaAleatorio, setImagemUtilizadaAleatorio] = useState(Math.floor(Math.random() * (6 - 1)) + 1);
    const [imagemUtilizada, setImagemUtilizada] = useState('');

    
    const [arrayOpcoes, setArrayOpcoes] = useState([]);
    const [arrayCerto, setArrayCerto] = useState(Math.floor(Math.random() * (4 - 0)) + 0);

    const [randomMath1, setRandomMath1] = useState(array[Math.floor(Math.random() * array.length)]);
    const [randomMath2, setRandomMath2] = useState(array[Math.floor(Math.random() * array.length)]);
    const [randomMath3, setRandomMath3] = useState(array[Math.floor(Math.random() * array.length)]);
    const [randomMath4, setRandomMath4] = useState(array[Math.floor(Math.random() * array.length)]);

    useEffect(() => {
        
        const arr = Array.from({ length: numeroAleatorio }).map(() => true);

        setArrayOpcoes([randomMath1, randomMath2, randomMath3, randomMath4]);

    }, [numeroAleatorio]);

    
    console.log(randomObject)

    
    return (
    <View style={styles.container}>
       <View style={styles.viewQuestion}>
            <Text style={styles.textQuestion}>Quantas {randomObject.nome} existem?</Text>
       </View>
       <View style={styles.containerQuestion}>
            {Array.from({ length: numeroAleatorio }).map((_, index) => (
                <Image key={index} style={styles.imageQuestion} source={randomObject.image}/>
            ))}
       </View>
       <View style={styles.viewResposta}>
        <View style={styles.viewRespostax}>
            <TouchableOpacity style={styles.buttonResposta}>
                <Text>{arrayOpcoes[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonResposta}>
                <Text>{arrayOpcoes[1]}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.viewRespostax}>
            <TouchableOpacity style={styles.buttonResposta}>
                <Text>{arrayOpcoes[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonResposta}>
                <Text>{arrayOpcoes[3]}</Text>
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
        marginLeft: 20,
        marginTop: 10
    },
    textQuestion:{
        fontSize: 25,
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
        margin: 20,
        borderWidth: 2,
        fontSize: 20,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F92E6A'
      },
      viewRespostax:{

      }
})