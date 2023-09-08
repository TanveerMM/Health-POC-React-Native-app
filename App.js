import AppleHealthKit, {HealthInputOptions, HealthKitPermissions, HealthUnit} from 'react-native-health'
import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
} from 'react-native';
import useHealthData from './src/hooks/useHealthData';

//const {StepCounter} = NativeModules

const STEPS_GOAL = 10_000

const App = () => {
  // const [value, setValue] = useState("")
  // const stepData = [];
  // StepCounter.getStepCounter(value => {
  //   //var result = value
  //   stepData = value
  //  // setValue(result)
  //   console.warn('StepCOuner : '+ value )
  // });
  const { steps, distance } = useHealthData();

  return (
    
    <View>
      <Text style={{fontSize:30, marginTop:50}}>StepCounter {steps} </Text>
      <Text style={{fontSize:30, marginTop:50}}>Distance {(distance/1000).toFixed(2)} km </Text>
    
    </View>
  );
};


export default App;
