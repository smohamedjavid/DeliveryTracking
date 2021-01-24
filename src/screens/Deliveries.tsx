import { useNavigation } from '@react-navigation/native';
import React, { FC, Fragment, memo, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { DeliveryActions } from '../redux';
import { COLORS, SCALER, STYLES } from '../styles';

export interface DeliveriesProps {}

export const Deliveries: FC<DeliveriesProps> = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [iDeliveriesList, setDeliveriesList] = useState<GetDeliveriesListResponse>([]);

  useEffect(() => {
    dispatch(
      DeliveryActions.getDeliveriesList({
        handleSuccess: (res) => {
          setDeliveriesList(res);
        },
      }),
    );
  }, []);

  const handleOnPressDelivery = (id: number) => {
    navigation.navigate(global.ROUTES.DELIVERY_DETAILS, { id });
  };

  return (
    <ScrollView style={styles.scrollView}>
      {iDeliveriesList.map((delivery, index) => {
        return (
          <Fragment key={index}>
            <View style={styles.spacer} />
            <Pressable
              style={STYLES.px(SCALER.w(16))}
              onPress={() => {
                handleOnPressDelivery(delivery.id);
              }}>
              <View style={styles.deliveryItemContainer}>
                <Text style={styles.name}>{delivery.customer_name}</Text>
                <Text>{delivery.address}</Text>
              </View>
            </Pressable>
          </Fragment>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  spacer: { height: SCALER.h(16) },
  deliveryItemContainer: {
    ...STYLES.px(SCALER.w(16)),
    ...STYLES.py(SCALER.h(20)),
    ...STYLES.shadow,
    borderRadius: SCALER.w(20),
    backgroundColor: COLORS.BLACK.d9,
  },
  name: {
    fontWeight: '700',
  },
});
