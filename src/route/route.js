import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import HomeAluno from '../pages/HomeAluno';
import DadosTarefas from '../pages/DadosTarefa';
import RelatorioGeral from '../pages/RelatorioGeral';
import CriarAluno from '../pages/CriarAluno';
import Login from '../pages/Login';
import CadastroOrientador from '../pages/CadastroOrientador';
import CriarAtividade from '../pages/CriarAtividade';
import EscolherAtividade from '../pages/EscolherAtividade';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <Stack.Screen options={{headerShown: false}} name="Cadastro Orientador" component={CadastroOrientador} />
          <Stack.Screen options={{headerShown: false, headerTintColor: '#F92E64'}} name="Lista de alunos" component={Home} />
          <Stack.Screen options={{headerTintColor: '#F92E64',}} name="Dados Aluno" component={HomeAluno} />
          <Stack.Screen options={{headerTintColor: '#F92E64',}} name="Relatório" component={DadosTarefas} />
          <Stack.Screen options={{headerTintColor: '#F92E64',}} name="Relatório Geral" component={RelatorioGeral} />
          <Stack.Screen options={{headerTintColor: '#F92E64',}} name="Criar aluno" component={CriarAluno} />
          <Stack.Screen options={{headerTintColor: '#F92E64',}} name="Criar atividade" component={CriarAtividade} />
          <Stack.Screen options={{headerTintColor: '#F92E64',}} name="Escolher atividade" component={EscolherAtividade} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}