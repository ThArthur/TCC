import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import HomeAluno from '../pages/HomeAluno';
import DadosTarefas from '../pages/DadosTarefa';
import RelatorioGeral from '../pages/RelatorioGeral';
import CriarAluno from '../pages/CriarAluno';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Lista de alunos" component={Home} />
            <Stack.Screen name="Dados Aluno" component={HomeAluno} />
            <Stack.Screen name="Relatório" component={DadosTarefas} />
            <Stack.Screen name="Relatório Geral" component={RelatorioGeral} />
            <Stack.Screen name="Criar aluno" component={CriarAluno} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}