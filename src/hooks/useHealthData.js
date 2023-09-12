import AppleHealthKit, {HealthInputOptions, HealthKitPermissions, HealthUnit} from 'react-native-health'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';

const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning],
      write: []
    },
  } 

const useHealthData = () => {
    const [hasPermissions, setHasPermissions] = useState(false);
    const [steps, setSteps] = useState(0);
    const [distance, setDistance] = useState(0);

    // iOS - HealthKit
  useEffect(() => {
    if(Platform.OS != 'ios') {
        return
    }
    
    AppleHealthKit.isAvailable((error, isAvailable) => {
        if(error) {
            console.log('Error checking availability')
            return
        }
        if(!isAvailable) {
            console.log('Apple Health not available')
            return
        }
        AppleHealthKit.initHealthKit(permissions, (error) => {
            if(error) {
              console.log("Error getting permissions");
              return
            }
            setHasPermissions(true)
          })
        }, [])
    })
   

  useEffect(() => {
    if(!hasPermissions) {
      return;
    }

    const options = {
      date: new Date().toISOString(),
      includeManuallyAdded: false,
      unit: 'meter',
    }

    AppleHealthKit.getStepCount(options, (error, results) => {
      if(error) {
        console.log('Error getting the steps')
        return
      }
      console.log(results.value)
      setSteps(results.value)
    })

    AppleHealthKit.getDistanceWalkingRunning(options, (error, results) => {
      if(error) {
        console.log('Error getting distance')
        return
      }
      console.log(results.value)
      setDistance(results.value)
    })
  }, [hasPermissions])

  // Android - Health Connect
  const readSampleData = async () => {
    // initialize the client
    const isInitialized = await initialize();
  
    if(!isInitialized) {
      return
    }

    // request permissions
    const grantedPermissions = await requestPermission([
      { accessType: 'read', recordType: 'Steps' },
      { accessType: 'read', recordType: 'Distance' },
      //{ accessType: 'read', recordType: 'FloorsClimbed' },
    ]);
  
    // check if granted
    const readGrantedPermissions = () => {
      grantedPermissions().then((permissions) => {
        console.log('Granted permissions ', { permissions });
      });
    };
  
  
    const stepsCount = await readRecords('Steps', {
      timeRangeFilter: {
        operator: 'between',
        startTime: '2023-09-11T12:00:00.405Z',
        endTime: '2023-09-12T23:53:15.405Z',
      },
    });
    //console.log(stepsCount)
    const totalSteps = stepsCount.reduce((sum, cur) => sum + cur.count, 0)
    setSteps(totalSteps)
    
    const distanceValue = await readRecords('Distance', {
      timeRangeFilter: {
        operator: 'between',
        startTime: '2023-09-09T12:00:00.405Z',
        endTime: '2023-09-12T23:53:15.405Z',
      },
    });
    const totalDistance = distanceValue.reduce((sum, cur) => sum + cur.distance.inMeters, 0)
    setDistance(totalDistance)
  }

  useEffect(() => {
    if(Platform.OS != 'android') {
      return
    }
    readSampleData()
  })
  return {
    steps,
    distance,
  }
}

export default useHealthData;