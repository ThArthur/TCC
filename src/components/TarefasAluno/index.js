import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ProgressRadius } from '../ProgressRadius';


const { width } = Dimensions.get('window');
const VALUE = -width

export default function TarefasAluno({ data }){

  const navigation = useNavigation();
  
  const dateFormatted = moment(data?.created_at?.seconds * 1000).format('DD/MM/YYYY');

  const pos = useSharedValue(VALUE);
  const opacity = useSharedValue(0);

  const progressTotal = data?.task?.acertouQuestao === 'Certo' ? 10 : 0 

  const progress = progressTotal === 10 ? 100 : 0


  const translateStyle = useAnimatedStyle(() => {
    return{
        transform: [{ translateX: pos.value }],
        opacity: opacity.value
    }
  })

  function show() {
    pos.value = withTiming(0, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }

  useEffect(() => {
    show()
  }, [])

  return(
    <Animated.View style={[styles.container, translateStyle]}>
        <TouchableOpacity onPress={() => navigation.navigate('Relatório', {data})}>
            
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{data?.task?.nome}</Text>
                    <Text style={styles.activity_type}>Atividade: {data?.task?.activity_type}</Text>
                </View>

                <View style={[styles.correctActivity, {
                    backgroundColor: data?.task?.acertouQuestao === 'Certo' ? '#06d6a0' : '#F92E6A'
                }]}>
                    <Text style={[styles.titleHeader]}>
                        {data?.task?.acertouQuestao === 'Certa' ? `Nota ${progressTotal}` : `Nota ${progressTotal}`}
                    </Text>
                </View> 
            </View>

            <View style={styles.statusStudent}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Progresso: </Text>
                    <ProgressRadius size={25} color={"#06d6a0"} percentage={progress}/>
                    <Text> {progress}%</Text>
                </View>
                
                {data?.task?.activity_type === 'Colocar item no baú' ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Quantidade exigida:</Text>
                        <Text> {data?.task?.quantidadePedida}</Text>
                    </View>
                : data?.task?.activity_type === 'Conte as figuras' ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Quantidade exigida:</Text>
                        <Text> {data?.task?.quantidadeCerta}</Text>
                    </View>
                : data?.task?.activity_type === 'Somar ou subtrair' &&
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Resultado da operação:</Text>
                        <Text> {data?.task?.resultadoDaOperacao}</Text>
                    </View>
                }
            </View>

            {data?.task?.activity_type === 'Colocar item no baú' ?
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Quantidade colocada:</Text>
                    <Text> {data?.task?.quantidadeColocada}</Text>
                </View>
            : data?.task?.activity_type === 'Conte as figuras' ? 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Quantidade colocada:</Text>
                    <Text> {data?.task?.quantidadeRespondida}</Text>
                </View>
            : data?.task?.activity_type === 'Somar ou subtrair' && 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Resultado colocado:</Text>
                    <Text> {data?.task?.resultadoColocado}</Text>
                </View>
            }

            <Text style={styles.dateCreated}>Data de criação: {dateFormatted}</Text>
        
        </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 10,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    correctActivity:{
        backgroundColor: '#06d6a0',
        padding: 2,
        alignItems: 'center',
        width: '25%',
        borderRadius: 5,
    }, 
    titleHeader:{
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFF'
    },
    contentHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    statusStudent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateCreated:{
        marginTop: 15,
        fontSize: 12,
        textAlign: 'right'
    },
    activity_type:{
        fontSize: 12,
        color: '#333'
    }
})