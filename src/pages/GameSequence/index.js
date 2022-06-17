import React, { useState, useEffect, useRef } from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Figuras } from '../../components/Figuras';
import { useDispatch } from 'react-redux';
import { showQuest } from '../../store/modules/quest/actions';
import firestore from '@react-native-firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from '../../context/auth';

export function GameSequence({route}){

    const navigation = useNavigation();
    const { data, nome } = route.params;
    const user = useAuth();

    figurer = [
        {
            key: '1',
            type: 'Bicicleta',
            inBau: 0
        },
        {
            key: '2',
            type: 'Cavalo',
            inBau: 0
        },
        {
            key: '3',
            type: 'Moto',
            inBau: 0
        },
        {
            key: '4',
            type: 'Pinguin',
            inBau: 0
        },
        {
            key: '5',
            type: 'Ursinho',
            inBau: 0
        },
        {
            key: '6',
            type: 'Ovni',
            inBau: 0
        },
    ]    

    const [quantItem, setQuantItem] = useState(Math.floor(Math.random() * (7 - 3)) + 3);
    const [contador, setContador] = useState(0);
    const [objetivoJogo, setObjetivoJogo] = useState(0);
    const dispatch = useDispatch();

    const [ bauX, setBauX ] = useState({
        x: 0,
        y: 0
    });

    async function enviarAtividade(){
        if(quantItem === contador){
            setObjetivoJogo(1);
            dispatch(showQuest('Parabéns!', 'sucess'));

            try {
                await firestore().collection('tarefas')
                .add({
                  student: data?.name,
                  owner: user?.uid,
                  key: data?.id,
                  task:{
                    nome,
                    activity_type: 'Colocar item no baú',
                    quantidadePedida: quantItem,
                    quantidadeColocada: contador,
                    acertouQuestao: 'Certo'
                  },
                  created_at: firestore.FieldValue.serverTimestamp()
                })
          
          
              } catch (error) {
                console.log(error)
              }

            timer = setTimeout(() => {
                navigation.navigate('Dados Aluno', {data});
            }, 3000)

        }if(quantItem < contador){
            setObjetivoJogo(2);
            dispatch(showQuest('Colocou muitos brinquedos!', 'error'));

            try {
                await firestore().collection('tarefas')
                .add({
                  student: data?.name,
                  owner: user?.uid,
                  key: data?.id,
                  task:{
                    nome,
                    activity_type: 'Colocar item no baú',
                    quantidadePedida: quantItem,
                    quantidadeColocada: contador,
                    acertouQuestao: 'Errada'
                  },
                  created_at: firestore.FieldValue.serverTimestamp()
                })
          
          
              } catch (error) {
                console.log(error)
              }

            timer = setTimeout(() => {
                navigation.navigate('Dados Aluno', {data});
            }, 3000)

        }if(quantItem > contador){
            setObjetivoJogo(3);
            dispatch(showQuest('Colocou poucos brinquedos!', 'error'));

            try {
                await firestore().collection('tarefas')
                .add({
                  student: data?.name,
                  owner: user?.uid,
                  key: data?.id,
                  task:{
                    nome,
                    activity_type: 'Colocar item no baú',
                    quantidadePedida: quantItem,
                    quantidadeColocada: contador,
                    acertouQuestao: 'Errada'
                  },
                  created_at: firestore.FieldValue.serverTimestamp()
                })
          
          
              } catch (error) {
                console.log(error)
              }

              timer = setTimeout(() => {
                navigation.navigate('Dados Aluno', {data});
            }, 3000)

        }
    }


  return (
    <View style={styles.container}>        
        <View style={styles.header}>
            <Text style={styles.title}>
                Escolha {quantItem} brinquedos e arraste até a caixa:
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
                    setContador={setContador}
                    data={fig}
                    />
                ))}
            </View>

            <View 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
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
                <View style={{maxWidth: 200, marginTop: 20,}}>
                    <Text style={styles.styleTextQuant}>Quantidade de itens no baú: <Text style={{fontWeight: 'bold', fontSize: 30}}>{contador}</Text></Text>
                </View>
            </View>
        </View>
        <View style={styles.viewButton}>
            <TouchableOpacity style={styles.buttonConfirmar} onPress={() => enviarAtividade()}>
                <Text>Enviar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
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
        
    },
    styleTextQuant:{
        textAlign: 'center',
        fontSize: 15
    },
    viewButton:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    buttonConfirmar:{
        backgroundColor: '#98FB98',
        marginTop: 20,
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    modalStyle:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
        
    },
    textModal:{
        marginTop: 30,
        fontSize: 30
    },
    buttonModal:{
        width: 200,
        height: 30,
        backgroundColor: '#98FB98',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 30
    },
    subTextModal:{
        fontSize: 20
    },
    modalDentro:{
        width: 300,
        height: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        shadowColor: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    
})