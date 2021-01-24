import { Dimensions } from 'react-native';

import { SCALER } from './scaler';

const alignSelfStart = { alignSelf: 'flex-start' } as const;
const alignSelfCenter = { alignSelf: 'center' } as const;
const centerHorizontal = { justifyContent: 'center' } as const;
const centerVertical = { alignItems: 'center' } as const;
const centerHV = { ...centerHorizontal, ...centerVertical } as const;
const spaceBetweenHorizontal = { justifyContent: 'space-between' } as const;
const spaceBetweenVertical = { alignContent: 'space-between' } as const;
const spaceBetweenHV = { ...spaceBetweenHorizontal, ...spaceBetweenVertical } as const;
const spaceAroundHorizontal = { justifyContent: 'space-around' } as const;
const spaceAroundVertical = { alignContent: 'space-around' } as const;
const spaceAroundHV = { ...spaceAroundHorizontal, ...spaceAroundVertical } as const;

const flexChild = { flex: 1 } as const;
const flexGrow = { flexGrow: 1 } as const;
const flexNone = { flex: 0 } as const;

const flexEnd = { alignItems: 'flex-end' } as const;
const flexWrap = { flexWrap: 'wrap' } as const;
const justifyContentEnd = { justifyContent: 'flex-end' } as const;

const flexContainer = { display: 'flex' } as const;
const flexCol = { ...flexContainer, flexDirection: 'column' } as const;
const flexRow = { ...flexContainer, flexDirection: 'row' } as const;
const flexColCC = { ...flexCol, ...centerHV } as const;
const flexRowCC = { ...flexRow, ...centerHV } as const;
const flexColSbSb = { ...flexCol, ...spaceBetweenHV } as const;
const flexRowSbSb = { ...flexRow, ...spaceBetweenHV } as const;
const flexColSaSa = { ...flexCol, ...spaceAroundHV } as const;
const flexRowSaSa = { ...flexRow, ...spaceAroundHV } as const;
const fullHeight = { height: '100%' } as const;
const fullWidth = { width: '100%' } as const;
const fullHW = { ...fullHeight, ...fullWidth } as const;

const noMargin = { margin: 0 } as const;
const noPadding = { padding: 0 } as const;
const paddingHorizontal16 = { paddingHorizontal: SCALER.w(16) } as const;
const marginHorizontal16 = { marginHorizontal: SCALER.w(16) } as const;
const marginVertical16 = { marginVertical: SCALER.w(16) } as const;

const positionAbsolute = { position: 'absolute' } as const;

const border = (borderWidth: number, borderColor: string) => ({
  borderWidth: borderWidth,
  borderColor: borderColor,
});

const borderTB = (borderWidth: number, borderColor: string) => ({
  borderTopWidth: borderWidth,
  borderBottomWidth: borderWidth,
  borderColor: borderColor,
});

const circle = (height: number, backgroundColor?: string) => ({
  height: height,
  width: height,
  borderRadius: height / 2,
  backgroundColor: backgroundColor,
});

const circleBorder = (height: number, borderWidth: number, borderColor: string, backgroundColor?: string) => ({
  ...circle(height, backgroundColor),
  ...border(borderWidth, borderColor),
});

const px = (points: number) =>
  ({
    paddingLeft: points,
    paddingRight: points,
  } as const);

const py = (points: number) =>
  ({
    paddingTop: points,
    paddingBottom: points,
  } as const);

const mx = (points: number) =>
  ({
    marginLeft: points,
    marginRight: points,
  } as const);

const my = (points: number) =>
  ({
    marginTop: points,
    marginBottom: points,
  } as const);

const marginTop = (points: number) =>
  ({
    marginTop: points,
  } as const);

const marginLeft = (points: number) =>
  ({
    marginLeft: points,
  } as const);

const height = (points: number) =>
  ({
    height: points,
  } as const);

const shadow = {
  // shadow for android
  elevation: 3,
  // shadow for ios
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3,
} as const;

const txtAlignCenter = { textAlign: 'center' } as const;
const txtAlignRight = { textAlign: 'right' } as const;
const txtAlignLeft = { textAlign: 'left' } as const;
const txtCapitalize = { textTransform: 'capitalize' } as const;
const txtUnderline = { textDecorationLine: 'underline' } as const;

export interface DeviceSizeType {
  WIDTH: number;
  HEIGHT: number;
}

const DEVICE: {
  WINDOW: DeviceSizeType;
  SCREEN: DeviceSizeType;
} = {
  WINDOW: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
  SCREEN: {
    WIDTH: Dimensions.get('screen').width,
    HEIGHT: Dimensions.get('screen').height,
  },
};
const flexReverseRow = { ...flexContainer, flexDirection: 'row-reverse' } as const;
export const STYLES = {
  flexReverseRow,
  alignSelfStart,
  alignSelfCenter,
  border,
  borderTB,
  centerHorizontal,
  centerHV,
  centerVertical,
  circle,
  circleBorder,
  DEVICE,
  flexChild,
  flexCol,
  flexColCC,
  flexColSaSa,
  flexColSbSb,
  flexContainer,
  flexEnd,
  flexGrow,
  flexNone,
  flexRow,
  flexRowCC,
  flexRowSaSa,
  flexRowSbSb,
  flexWrap,
  fullHeight,
  fullHW,
  fullWidth,
  marginHorizontal16,
  marginVertical16,
  mx,
  my,
  height,
  marginLeft,
  marginTop,
  noMargin,
  noPadding,
  justifyContentEnd,
  paddingHorizontal16,
  positionAbsolute,
  px,
  py,
  shadow,
  spaceAroundHorizontal,
  spaceAroundHV,
  spaceAroundVertical,
  spaceBetweenHorizontal,
  spaceBetweenHV,
  spaceBetweenVertical,
  txtAlignCenter,
  txtAlignLeft,
  txtAlignRight,
  txtCapitalize,
  txtUnderline,
};
