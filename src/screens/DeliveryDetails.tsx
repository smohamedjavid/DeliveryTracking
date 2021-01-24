import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { RouteProp } from '@react-navigation/native';
import React, { FC, memo, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch } from 'react-redux';

import { LANG_EN } from '../constants/lang';
import { AsyncStorageApi, AsyncStorageKey } from '../integrations';
import { DeliveryActions } from '../redux';
import { COLORS, SCALER, STYLES } from '../styles';

type ParamList = {
  DeliveryDetails: { id: number };
};

export interface DeliveryDetailsProps {
  route: RouteProp<ParamList, 'DeliveryDetails'>;
}

export const DeliveryDetails: FC<DeliveryDetailsProps> = memo((props) => {
  const dispatch = useDispatch();

  const deliveryID = props.route.params?.id || 0;

  const [iDeliveryDetail, setDeliveryDetail] = useState<GetDeliveryDetailsResponse>();

  useEffect(() => {
    dispatch(
      DeliveryActions.getDeliveryDetails({
        payload: {
          id: deliveryID,
        },
        handleSuccess: (res) => {
          setDeliveryDetail(res);
        },
      }),
    );
  }, []);

  const startUpdateLocation = async () => {
    BackgroundTimer.runBackgroundTimer(async () => {
      const trackingData = await AsyncStorageApi.getItem(AsyncStorageKey.LOCATION);
      if (trackingData) {
        dispatch(
          DeliveryActions.updateLocation({
            payload: {
              driver_id: 843934,
              tracking_data: JSON.parse(trackingData),
            },
            handleSuccess: () => {},
          }),
        );
      }
    }, 10000);
  };

  const handleOnPressMakeActive = async () => {
    const ActiveDeliveries = await AsyncStorageApi.getItem(AsyncStorageKey.ACTIVE_DELIVERIES);

    if (ActiveDeliveries) {
      const existingActiveDeliveries: number[] = JSON.parse(ActiveDeliveries);
      if (existingActiveDeliveries.includes(deliveryID)) {
        return;
      }
      existingActiveDeliveries.push(deliveryID);
      await AsyncStorageApi.setItem(AsyncStorageKey.ACTIVE_DELIVERIES, existingActiveDeliveries);
    } else {
      const newActiveDelivery = JSON.stringify([deliveryID]);
      await AsyncStorageApi.setItem(AsyncStorageKey.ACTIVE_DELIVERIES, newActiveDelivery);
    }
    BackgroundGeolocation.start();
    startUpdateLocation();
  };

  return (
    <View style={styles.rootView}>
      <ScrollView>
        <View style={styles.spacer} />
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.name}>{iDeliveryDetail?.customer_name}</Text>
          <View style={styles.spacer} />
          <Text>{iDeliveryDetail?.address}</Text>
          <View style={styles.textSpacer} />
          <Text>{iDeliveryDetail?.special_instructions}</Text>
        </View>
      </ScrollView>
      {iDeliveryDetail ? (
        <Pressable onPress={handleOnPressMakeActive}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>{LANG_EN.MAKE_ORDER_ACTIVE}</Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  rootView: STYLES.flexChild,
  spacer: { height: SCALER.h(16) },
  textSpacer: { height: SCALER.h(6) },
  deliveryDetailsContainer: {
    ...STYLES.marginHorizontal16,
    ...STYLES.px(SCALER.w(16)),
    ...STYLES.py(SCALER.h(20)),
    ...STYLES.shadow,
    borderRadius: SCALER.w(20),
    backgroundColor: COLORS.BLACK.d9,
  },
  name: {
    fontWeight: '700',
  },
  buttonContainer: {
    ...STYLES.flexColCC,
    height: SCALER.h(50),
    backgroundColor: COLORS.BLACK.d4,
  },
  buttonLabel: {
    fontWeight: '700',
    color: COLORS.BLACK.d9,
  },
});
