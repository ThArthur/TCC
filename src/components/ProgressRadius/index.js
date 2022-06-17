import React from 'react';
import { Text, View } from "react-native";
import { CircularProgress } from 'react-native-svg-circular-progress'

export function ProgressRadius({ color, percentage, size }){
    return <CircularProgress size={size} progressWidth={10} donutColor={color} percentage={percentage}/>
}