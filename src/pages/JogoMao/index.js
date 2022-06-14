import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const arrayImages = [
    require('../../assets/1.png'),
    require('../../assets/2.png'),
    require('../../assets/3.png'),
    require('../../assets/4.png'),
    require('../../assets/5.png'),
];

const math = ['-', '+']


const randomImage = arrayImages[Math.floor(Math.random() * arrayImages.length)];
const randomImage2 = arrayImages[Math.floor(Math.random() * arrayImages.length)];

const randomMath = math[Math.floor(Math.random() * math.length)];

export function JogoMao(){

    const [valor, setValor] = useState('');

    const valorXT = String(randomImage)
    const valorY = String(randomImage2)
    const valorX = randomMath === '-' ? Number(valorXT) > Number(valorY) ? 1 : String(randomImage) : String(randomImage)

    const arrayNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


    function handleKeyboard(numeracion) {
       if(valor.length < 2) {
        setValor(valor + numeracion)
       } else {
           return;
       }
    }

    return (
    <View style={styles.container}>

        <Text style={styles.title}>Qual o resultado?</Text>

        <View style={styles.contantesItens}>
           
            <View>
                <View style={styles.handStyle}>
                    <Image style={{
                        marginRight: 25,
                    }} source={randomMath === '-' ? Number(valorXT) > Number(valorY) ? arrayImages[0] : randomImage : randomImage} />

                    <Text style={{
                        fontSize: 50,
                    }}>{randomMath}</Text>

                    <Image style={{
                        marginLeft: 25,
                    }} source={randomImage2} />

                </View>

                <View style={styles.contentInformation}>

                    <Text style={styles.informationText}>{valorX}</Text>

                     <Text style={{
                        fontSize: 50,
                    }}>{randomMath}</Text>

                    <Text style={styles.informationText}>{valorY}</Text>
                    
                    <Text style={{
                        fontSize: 50,
                    }}>=</Text>

                    <Text numberOfLines={2} style={styles.informationText}>{valor}</Text>
                </View>
                {valor.length > 0 &&
                    <View style={styles.buttons}>

                        <TouchableOpacity
                            onPress={() => setValor('')}
                            style={styles.button}>
                                <Text style={styles.textColor}>Finalizar</Text>
                            </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setValor('')}
                            style={[styles.button, { backgroundColor: 'red', marginLeft: 15,}]}>
                                <Text style={styles.textColor}>Limpar</Text>
                            </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={styles.numaration}>
                {arrayNumbers.map(item => (
                    <TouchableOpacity onPress={() => handleKeyboard(item)} style={styles.numberStyle} key={item}>
                        <Text style={styles.numberText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
        
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFF"
    },
    contantesItens:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
    },
    handStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    numaration:{
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    numberStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderWidth: 1, 
        borderRadius: 25,
        marginHorizontal: 5,
        marginBottom: 15,
    },
    numberText:{
        fontSize: 25
    },
    contentInformation:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    informationText:{
        fontSize: 50,
        width: '15%',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#3333'
    },
    title:{
        marginTop: 25,
        textAlign: 'center',
        fontSize: 17,
    },
    buttons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 15,
    },
    button:{
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5,
    },
    textColor:{
        fontSize: 17,
        color: '#FFF',
        fontWeight: 'bold'
    }
})