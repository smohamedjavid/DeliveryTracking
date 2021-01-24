import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Fragment, memo } from 'react';
import { StatusBar } from 'react-native';

import { Deliveries, DeliveryDetails } from './screens';

const Stack = createStackNavigator();

export const Navigation = memo(() => {
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={global.ROUTES.DELIVERIES} screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name={global.ROUTES.DELIVERIES} component={Deliveries} />
          <Stack.Screen name={global.ROUTES.DELIVERY_DETAILS} component={DeliveryDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
});
