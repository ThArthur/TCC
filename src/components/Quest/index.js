import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import { hideQuest } from '../../store/modules/quest/actions'

const { height } = Dimensions.get('window');

let timer = null;

const type = {
  default: {
    icon: 'x',
    color: '#2ec4b6'
  },
  error: {
    icon: 'x',
    color: '#e63946'
  },
  sucess: {
    icon: 'check',
    color: '#2ec4b6'
  }
}

export function Quest(){
  
  const dispatch = useDispatch();
  const quest = useSelector((state) => state.quest);

  console.log(type[quest.type])

  const [pos] = useState(new Animated.Value(-height));

  function show() {
    clearTimeout(timer);
    Animated.timing(pos, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.circle
    })
    .start();

    timer = setTimeout(() => {
      hide()
    }, 2000)
  }

  function hide() {
    Animated.timing(pos, {
      toValue: -height,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.circle
    })
    .start(() => {
      dispatch(hideQuest())
    });
  }

  useEffect(() => {
    quest.show && show();
  } , [quest.show])

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: pos }] }]}>
        <Animated.View style={styles.backContainer}>
          <Icon name={type[quest.type].icon} size={100} color={type[quest.type].color} />
          <Text style={[styles.title, {
             color: type[quest.type].color,
          }]}>{quest.type === 'error' ? 'Ops ... Resposta incorreta!' : 'Boa!!! Resposta correta!'}{'\n'}
          <Text style={[styles.title, { fontWeight: 'normal', fontSize: 20 }]}>{quest.message}</Text>
          </Text>
        </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    width: '100%',
    zIndex: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backContainer:{
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    shadowColor: 'black',
    elevation: 5,
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})