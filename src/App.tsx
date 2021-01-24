import BackgroundGeolocation, { Location, StationaryLocation } from '@mauron85/react-native-background-geolocation';
import React, { useEffect } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { LANG_EN } from './constants/lang';
import { AsyncStorageApi, AsyncStorageKey } from './integrations';
import { Navigation } from './Navigation';
import { STYLES } from './styles';

const handleLocationUpdate = async (location: Location | StationaryLocation) => {
  const batteryLevel = (await DeviceInfo.getBatteryLevel()) * 100;
  const timestamp = Math.floor(Date.now() / 1000);
  const newTrackingData: TrackingItem[] = [];
  let finalTrackingData: TrackingItem[] = [];

  let existingActiveDeliveriesFromAS = await AsyncStorageApi.getItem(AsyncStorageKey.ACTIVE_DELIVERIES);
  let existingActiveDeliveries: number[] = [];
  if (existingActiveDeliveriesFromAS) {
    existingActiveDeliveries = JSON.parse(existingActiveDeliveriesFromAS);
  }

  let existingTrackingDataFromAS = await AsyncStorageApi.getItem(AsyncStorageKey.LOCATION);
  let existingTrackingData: TrackingItem[] = [];
  if (existingTrackingDataFromAS) {
    existingTrackingData = JSON.parse(existingTrackingDataFromAS);
  }

  if (existingActiveDeliveries.length) {
    existingActiveDeliveries.forEach((activeDelivery) => {
      newTrackingData.push({
        longitude: location.longitude,
        Latitude: location.latitude,
        battery_level: batteryLevel,
        delivery_id: activeDelivery,
        timestamp,
      });
    });
  }

  if (existingTrackingData.length) {
    finalTrackingData = [...existingTrackingData, ...newTrackingData];
  } else {
    finalTrackingData = newTrackingData;
  }

  await AsyncStorageApi.setItem(AsyncStorageKey.LOCATION, finalTrackingData);
};

const configureBackgroundLocationTracking = () => {
  BackgroundGeolocation.configure({
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 50,
    distanceFilter: 50,
    notificationsEnabled: false,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    debug: true,
    startOnBoot: false,
    stopOnTerminate: false,
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    interval: 1000,
    fastestInterval: 1000,
    activitiesInterval: 1000,
    stopOnStillActivity: false,
    startForeground: true,
  });

  BackgroundGeolocation.on('location', handleLocationUpdate);
  BackgroundGeolocation.on('stationary', handleLocationUpdate);
};

const App = () => {
  useEffect(() => {
    request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      switch (result) {
        case RESULTS.DENIED:
          Alert.alert(LANG_EN.LOCATION_PERMISSION_DENIED);
          break;
        case RESULTS.LIMITED:
          configureBackgroundLocationTracking();
          break;
        case RESULTS.GRANTED:
          configureBackgroundLocationTracking();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(LANG_EN.LOCATION_PERMISSION_BLOCKED);
          break;
      }
    });
  }, []);

  return (
    <SafeAreaView style={STYLES.flexChild}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
