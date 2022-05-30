import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import HomeAluno from '../pages/HomeAluno';
import DadosTarefas from '../pages/DadosTarefa';
import RelatorioGeral from '../pages/RelatorioGeral';
import CriarAluno from '../pages/CriarAluno';
import CriarAtividade from '../pages/CriarAtividade';
import EscolherAtividade from '../pages/EscolherAtividade';

const AppStack = createNativeStackNavigator();

export default function AppRoute() {
  return (
      <AppStack.Navigator initialRouteName="Lista de alunos" >
        <AppStack.Screen 
        options={{headerShown: false, headerTintColor: '#F92E64'}} 
        name="Lista de alunos" 
        component={Home} />

        <AppStack.Screen 
        options={{headerTintColor: '#F92E64',}} 
        name="Dados Aluno" 
        component={HomeAluno} 
        />

        <AppStack.Screen 
        options={{headerTintColor: '#F92E64',}}
        name="Relatório" 
        component={DadosTarefas} 
        />

        <AppStack.Screen 
        options={{headerTintColor: '#F92E64',}} 
        name="Relatório Geral" 
        component={RelatorioGeral} 
        />

        <AppStack.Screen 
        options={{headerTintColor: '#F92E64',}} 
        name="Criar aluno" 
        component={CriarAluno} 
        />

        <AppStack.Screen 
        options={{headerTintColor: '#F92E64',}} 
        name="Criar atividade" 
        component={CriarAtividade} 
        />
        
        <AppStack.Screen 
        options={{headerTintColor: '#F92E64',}} 
        name="Escolher atividade" 
        component={EscolherAtividade} 
        />
      </AppStack.Navigator>
  );
}