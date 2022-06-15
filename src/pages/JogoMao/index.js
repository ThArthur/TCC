import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { showQuest } from '../../store/modules/quest/actions';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../context/auth';

const arrayImages = [
    require('../../assets/1.png'),
    require('../../assets/2.png'),
    require('../../assets/3.png'),
    require('../../assets/4.png'),
    require('../../assets/5.png'),
];



export function JogoMao({route}){

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useAuth();
    const {
        data,
        nome
      } = route.params;

    const [valor, setValor] = useState('');

    const math = ['-', '+']
    const [operacao, setOperacao] = useState(Math.floor(Math.random() * 1) + 0);

    const [resultadoCalculado, setResultadoCalculado] = useState();

    const [valorX, setValorX] = useState(Math.floor(Math.random() * 5) + 1);
    const [valorY, setValorY] = useState(Math.floor(Math.random() * 5) + 1);
    const [aux, setAux] = useState(valorX);

    const arrayNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    function handleKeyboard(numeracion) {
       if(valor.length < 2) {
        setValor(valor + numeracion)
       } else {
           return;
       }
    }

    function subtracao() {

        setValorX(valorY);
        setValorY(aux);

     }

     function somar(){
        if(operacao === 0){
            if(valorX < valorY){
                subtracao();
            }
        }
        
        if(operacao === 0){
            setResultadoCalculado(valorX - valorY);
        }if(operacao === 1){
            setResultadoCalculado(valorX + valorY);
        }
        if(resultadoCalculado < 0){
            setResultadoCalculado(resultadoCalculado * -1)
        }
     }

    useEffect( () => {
        somar();

    }, [valor])

    async function verificarResposta(){        
        if(resultadoCalculado == valor){
            dispatch(showQuest('Parabéns!', 'sucess'));
            try {
                await firestore().collection('tarefas')
                .add({
                  student: data?.name,
                  owner: user?.uid,
                  key: data?.id,
                  task:{
                    nome,
                    activity_type: 'Somar ou subtrair',
                    resultadoDaOperacao: resultadoCalculado,
                    acertouQuestao: 'Certo',
                    resultadoColocado: valor,
                    operacaoFeita: valorX + math[operacao] + valorY
                  },
                  created_at: firestore.FieldValue.serverTimestamp()
                })
          
                timer = setTimeout(() => {
                    navigation.navigate('Dados Aluno', {data});
                }, 3000)
          
              } catch (error) {
                console.log(error)
              }
            
        }
        if(resultadoCalculado != valor){
            dispatch(showQuest('Você errou, tente novamente!', 'error'));
            try {
                await firestore().collection('tarefas')
                .add({
                  student: data?.name,
                  owner: user?.uid,
                  key: data?.id,
                  task:{
                    nome,
                    activity_type: 'Somar ou subtrair',
                    resultadoDaOperacao: resultadoCalculado,
                    acertouQuestao: 'Errado',
                    resultadoColocado: valor,
                    operacaoFeita: valorX + math[operacao] + valorY
                  },
                  created_at: firestore.FieldValue.serverTimestamp()
                })
          
                timer = setTimeout(() => {
                    navigation.navigate('Dados Aluno', {data});
                }, 3000)
          
              } catch (error) {
                console.log(error)
              }
        }
    }

    return (
    <View style={styles.container}>

        <Text style={styles.title}>Qual o resultado dessa conta?</Text>

        <View style={styles.contantesItens}>
           
            <View style={ styles.viewImages}>
                <View style={styles.handStyle}>
                    {
                        valorX === 1 ? 
                        <View style={styles.viewMaoJunta}>
                            <Image style={styles.imageMao} 
                            source={require('../../assets/1.png')} />

                            <Text style={styles.informationText}>{valorX}</Text>

                        </View>
                        

                        : valorX === 2 ?

                        <View style={styles.viewMaoJunta}>
                            <Image style={styles.imageMao} 
                            source={require('../../assets/2.png')} />

                            <Text style={styles.informationText}>{valorX}</Text>

                        </View>
                        :

                        valorX === 3 ?

                        <View style={styles.viewMaoJunta}>
                            <Image style={styles.imageMao} 
                            source={require('../../assets/3.png')} />

                            <Text style={styles.informationText}>{valorX}</Text>

                        </View>
                        : valorX === 4 ?

                        <View style={styles.viewMaoJunta}>
                            <Image style={styles.imageMao} 
                            source={require('../../assets/4.png')} />

                            <Text style={styles.informationText}>{valorX}</Text>

                        </View>

                        :

                        <View style={styles.viewMaoJunta}>
                            <Image style={styles.imageMao} 
                            source={require('../../assets/5.png')} />

                            <Text style={styles.informationText}>{valorX}</Text>

                        </View>

                    }
                    <View style={styles.viewOperac}>
                        <View style={{width: 80, height: 110, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.operacaoStyle}>{math[operacao]}</Text>
                        </View>
                        <View>
                            <Text style={styles.operacaoStyle}>{math[operacao]}</Text>
                        </View>
                    </View>

                    

                    {
                        valorY === 1 ? 

                        <View style={styles.viewMaoJunta}>
                            <Image  style={styles.imageMao}
                            source={require('../../assets/1.png')} />

                            <Text style={styles.informationText}>{valorY}</Text>
                         </View>

                        : valorY === 2 ?

                        <View style={styles.viewMaoJunta}>
                            <Image  style={styles.imageMao}
                            source={require('../../assets/2.png')} />

                            <Text style={styles.informationText}>{valorY}</Text>
                         </View>

                        :

                        valorY === 3 ?

                        <View style={styles.viewMaoJunta}>
                            <Image  style={styles.imageMao}
                            source={require('../../assets/3.png')} />

                            <Text style={styles.informationText}>{valorY}</Text>
                         </View>

                        : valorY === 4 ?

                        <View style={styles.viewMaoJunta}>
                            <Image  style={styles.imageMao}
                            source={require('../../assets/4.png')} />

                            <Text style={styles.informationText}>{valorY}</Text>
                         </View>

                        :

                        <View style={styles.viewMaoJunta}>
                            <Image  style={styles.imageMao}
                            source={require('../../assets/5.png')} />

                            <Text style={styles.informationText}>{valorY}</Text>
                         </View>

                    }

                </View>

                <View style={[styles.contentInformation, {flexDirection: 'column'}]}>
                    <View style={{width: 80, height: 110}}>

                    </View>
                    <View style={{width: 80, height: 110, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 50,
                        }}>=</Text>

                        <Text numberOfLines={2} style={styles.informationText}>{valor}</Text>

                    </View>
                    
                    
                </View>
                {valor.length > 0 &&
                    <View style={styles.buttons}>

                        <TouchableOpacity
                            onPress={() => verificarResposta()}
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
        borderColor: '#3333',
        width: 70,
    },
    title:{
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttons:{
        flexDirection: 'column',
        width: 100,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 20,
        marginTop: 15,
        alignItems: 'flex-end'
    },
    button:{
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5,
        width: 100,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor:{
        fontSize: 17,
        color: '#FFF',
        fontWeight: 'bold'
    },
    imageMao:{
        width: 80,
        height: 110,
        resizeMode: 'contain',
        marginBottom: 30
    },
    viewImages:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewMaoJunta:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    viewOperac:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    operacaoStyle:{
        fontSize: 70,
    }
})