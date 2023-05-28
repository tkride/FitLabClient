import { StyleSheet } from 'react-native';

const borderRadius = 10;

const layout = {
  container: {
    flex: 1,
    marginTop: 0,
  },
  view: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    alignContent: 'center',
    // justifyContent: 'center',
  },
  scrollView: { height: '100%', },
  loginStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  calendarStyle: {
    borderRadius: borderRadius,
  },
  titleScreen: {
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'flex-start',
    // paddingLeft: 10,
    // elevation: 3,
    // Font
    fontSize: 20,
    // fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 10,
    marginBottom: 5,
    // Font
    fontSize: 22,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  subtitle: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    // textAlignVertical: 'center',
  },
  buttonUser: {
    position: 'absolute',
    top: 18,
    left: 15,
    height: 40,
    width: 40,
    activeOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    underlayColor: 'transparent',
    backgroundColor: '#0000',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#fff',
    elevation: 4,
    zIndex: 1,
  },
  buttonTheme: {
    position: 'absolute',
    top: 20,
    right: 20,
    // marginLeft: 10,
    height: 20,
    width: 20,
    activeOpacity: 0.5,
    underlayColor: 'transparent',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 20,
    height: 20,
    width: 20,
    margin: 5,
    activeOpacity: 0.5,
    underlayColor: 'transparent',
    zIndex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    // Font
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    // paddingLeft: 10,
    // Font
    fontSize: 14,
  },
  textBig: {
    fontSize: 16,
  },
  textBigger: {
    fontSize: 18,
  },
  selected: { },
  inactive: { },
  border: { },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
    // Font
    fontSize: 16,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  filterTag: {
    borderRadius: 15,
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
    alignSelf: 'center',
    // elevation: 4,
    elevation: 0,
    borderWidth: 0,
    // borderRadius: 5,
    // Font
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: '#ff0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigatorBottom: {
    headerShown: false,
    headerTitleAlign: 'center',
    headerStatusBarHeight: 10,
    headerBackgroundContainerStyle: {  marginTop: 25 },
    headerTitleStyle: { fontSize: 22, marginTop: 13 },
    tabBarIconStyle: { marginTop: 3 },
    tabBarStyle: { height: 43, elevation: 0 },
  },
  navigatorTop: {
    tabBarShowLabel: true,
    tabBarStyle: { marginTop: -5, height: 50, elevation: 0 },
    tabBarLabelStyle: { fontSize: 10, marginTop: -8 },
    tabBarIndicatorStyle: { height: 1 },
  },
  tableRoutine: {
    // borderWidth: 1,
  },
  rowRoutine: {
    fontSize: 14,
    borderWidth: 0,
  },
  tableHeadStyle: {
    height: 40,
    alignContent: "center",
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableRowStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tableHeadText: {
    margin: 2,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'nowrap',
    textAlign: 'center',
  },
  tableText: {
    margin: 2,
    fontSize: 14,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
};


const overBackLight = '#257cff';
const mainBackLight = '#fff';
const primaryLight = '#257cff';
const secondaryLight = '#257cff';
const tertiaryLight = '#ffab40';
const grayHeaderLight = '#dcdcdc';
const grayLight = '#f0f0f0';
const cardBackLight = '#257cff';
const cardBackRoutineLight = primaryLight;

const headerTextLight = '#fff';
const titleTextLight = '#ccc';
const textLight = '#000';

const selectedLight = secondaryLight;
const inactiveLight = 'gray';


const overBackDark = '#121212';
const mainBackDark = '#000';
const primaryDark = '#4a148c';
const secondaryDark = '#03dac5';
const tertiaryDark = '#ffff00';
const grayHeaderDark = '#cbcbcb';
const grayDark = '#f0f0f0';
const cardBackDark = '#121212';
const cardBackRoutineDark = primaryDark;

const headerTextDark = '#e1e1e1';
const titleTextDark = '#c1c1c1';
const textDark = '#8a8a8a';

const selectedDark = secondaryDark;
const inactiveDark = '#616161';

const light = {
  container: {
    backgroundColor: mainBackLight,
  },
  view: {
    // backgroundColor: overBackLight,
    backgroundColor: mainBackLight,
  },
  calendarStyle: {
    backgroundColor: primaryLight,
    margin: 10,
  },
  calendarSessionMark: {
    style: { backgroundColor: tertiaryLight },
    textSytle: titleTextLight,
  },
  titleScreen: {
    color: textLight,
    backgroundColor: mainBackLight,
  },
  title: {
    color: headerTextLight,
  },
  subtitle: {
    color: textLight,
  },
  icon: {
    color: secondaryLight,
  },
  buttonUser: {
    color: '#fff',
  },
  buttonTheme: {
    color: textLight, //'#fff',
  },
  backButton: {
    color: textLight,
  },
  button: {
    backgroundColor: primaryLight,
    color: textLight,
  },
  text: {
    color: textLight,
  },
  textBig: {
    color: textLight,
  },
  textBigger: {
    color: headerTextLight,
  },
  selected: {
    color: selectedLight
  },
  inactive: {
    color: inactiveLight
  },
  border: {
    borderColor: '#ac7ff6',
  },
  input: {
    color: textLight,
  },
  searchBar: {
    color: textLight,
    borderColor: grayHeaderLight,
  },
  filterTag: {
    backgroundColor: primaryLight,
    color: headerTextLight,
  },
  placeholderText: '#b4b4b4',
  scrollView: {},
  card: {
    backgroundColor: cardBackLight,
    color: textLight,
  },
  cardContent: {
    color: textLight,
  },
  navigatorBottom: {
    headerTitleStyle: { ...layout.navigatorBottom.headerTitleStyle, color: headerTextLight },
    headerStyle: { backgroundColor: overBackLight },
    tabBarActiveTintColor: selectedLight,
    tabBarInactiveTintColor: inactiveLight,
    tabBarStyle: { ...layout.navigatorBottom.tabBarStyle, backgroundColor: mainBackLight },
  },
  navigatorTop: {
    tabBarStyle: { ...layout.navigatorTop.tabBarStyle, backgroundColor: mainBackLight },
    tabBarActiveTintColor: selectedLight,
    tabBarInactiveTintColor: inactiveLight,
  },
  tableRoutine: {
    ...layout.tableRoutine,
    borderColor: selectedLight,
  },
  rowRoutine: {
    backgroundColor: cardBackRoutineLight,
    color: textLight,
  },
  tableHeadStyle: {
    ...layout.tableHeadStyle,
    backgroundColor: secondaryLight,
  },
  tableHeadText: {
    ...layout.tableHeadText,
    color: '#fff',
  },
  tableText: {
    ...layout.tableText,
    color: textLight,
  },
};


const dark = {
  container: {
    backgroundColor: mainBackDark,
  },
  view: {
    // backgroundColor: overBackDark,
    backgroundColor: mainBackDark,
  },
  calendarStyle: {
    backgroundColor: primaryDark,
    margin: 10,
  },
  calendarSessionMark: {
    backgroundColor: tertiaryDark,
    color: titleTextDark,
  },
  titleScreen: {
    color: titleTextDark,
    backgroundColor: mainBackDark,
  },
  title: {
    color: headerTextDark,
  },
  // title: {
    // color: titleTextDark,
  // },
  subtitle: {
    color: titleTextDark,
  },
  icon: {
    color: secondaryDark,
  },
  buttonUser: {
    color: '#fff',
  },
  buttonTheme: {
    color: textDark, //'#fff',
  },
  backButton: {
    color: '#fff',
  },
  // buttonRoutine: {
  //   underlayColor: secondaryDark,
  //   backgroundColor: '#1e1e1e',
  // },
  button: {
    backgroundColor: primaryDark,
    color: textDark,
  },
  button2: {
    backgroundColor: secondaryDark,
    color: '#000000',
  },
  text: {
    color: textDark,
  },
  textBig: {
    color: textDark,
  },
  textBigger: {
    color: titleTextDark,
  },
  selected: {
    color: selectedDark
  },
  inactive: {
    color: inactiveDark
  },
  border: {
    borderColor: '#000',
  },
  input: {
    color: textDark,
  },
  searchBar: {
    color: textDark,
    borderColor: grayHeaderDark,
  },
  filterTag: {
    backgroundColor: primaryDark,
    color: headerTextDark,
  },
  placeholderText: '#525252',
  scrollView: {},
  card: {
    backgroundColor: cardBackRoutineDark,
    color: titleTextDark,
  },
  cardContent: {
    color: titleTextDark,
  },
  navigatorBottom: {
    headerTitleStyle: { ...layout.navigatorBottom.headerTitleStyle, color: headerTextDark },
    headerStyle: { backgroundColor: overBackDark },
    tabBarActiveTintColor: selectedDark,
    tabBarInactiveTintColor: inactiveDark,
    tabBarStyle: { ...layout.navigatorBottom.tabBarStyle, backgroundColor: mainBackDark },
  },
  navigatorTop: {
    tabBarStyle: { ...layout.navigatorTop.tabBarStyle, backgroundColor: mainBackDark },
    tabBarActiveTintColor: selectedDark,
    tabBarInactiveTintColor: inactiveDark,
  },
  tableRoutine: {
    ...layout.tableRoutine,
    borderColor: selectedDark,
  },
  rowRoutine: {
    ...layout.rowRoutine,
    backgroundColor: 'red',
    color: 'gray',
  },
  tableHeadStyle: {
    ...layout.tableHeadStyle,
    // backgroundColor: overBackDark,
    backgroundColor: secondaryDark,
  },
  tableHeadText: {
    ...layout.tableHeadText,
    color: '#000',
  },
  tableText: { 
    ...layout.tableText,
    color: titleTextDark,
  }
};

const stylesLight = {
  container: { ...layout.container, ...light.container },
  view: { ...layout.view, ...light.view },
  loginStyle: { ...layout.loginStyle, ...light.loginStyle },
  cardBack: cardBackLight,
  cardBackRoutine: cardBackRoutineLight,
  mainBack: mainBackLight,
  overBack: overBackLight,
  primary: primaryLight,
  secondary: secondaryLight,
  tertiary: tertiaryLight,
  grayHeader: grayHeaderLight,
  gray: grayLight,
  headerText: headerTextLight,
  navigatorBottom: { ...layout.navigatorBottom, ...light.navigatorBottom },
  navigatorTop: { ...layout.navigatorTop, ...light.navigatorTop },
  tableRoutine: { ...layout.tableRoutine, ...light.tableRoutine },
  rowRoutine: { ...layout.rowRoutine, ...light.rowRoutine },
  tableHeadStyle: { ...layout.tableHeadStyle, ...light.tableHeadStyle },
  tableHeadText: { ...layout.tableHeadText, ...light.tableHeadText },
  tableRowStyle: { ...layout.tableRowStyle, ...light.tableRowStyle },
  tableText: { ...layout.tableText, ...light.tableText },
  scrollView: { ...layout.scrollView, ...light.scrollView },
  calendarStyle: { ...layout.calendarStyle, ...light.calendarStyle },
  calendarSessionMark: { ...layout.calendarSessionMark, ...light.calendarSessionMark },

  text: { ...layout.text, ...light.text },
  textBig: { ...layout.textBig, ...light.textBig },
  textBigger: { ...layout.textBigger, ...light.textBigger },
  selected: { ...layout.selected, ...light.selected },
  inactive: { ...layout.inactive, ...light.inactive },
  error: { ...layout.error, ...light.error },

  titleScreen: { ...layout.titleScreen, ...light.titleScreen },
  title: { ...layout.title, ...light.title },
  subtitle: { ...layout.subtitle, ...light.subtitle },
  icon: { ...layout.icon, ...light.icon },
  buttonUser: { ...layout.buttonUser, ...light.buttonUser },
  buttonTheme: { ...layout.buttonTheme, ...light.buttonTheme },
  backButton: { ...layout.backButton, ...light.backButton },
  button: { ...layout.button, ...light.button },
  border: { ...layout.border, ...light.border },
  input: { ...layout.input, ...light.input },
  searchBar: { ...layout.searchBar, ...light.searchBar },
  filterTag: { ...layout.filterTag, ...light.filterTag },
  placeholderText: light.placeholderText,
  // buttonRoutine: { ...layout.buttonRoutine, ...light.buttonRoutine },
  card: { ...layout.card, ...light.card },
  cardContent: { ...layout.cardContent, ...light.cardContent },
  borderRadius: borderRadius,
};

const stylesDark = {
  container: { ...layout.container, ...dark.container },
  view: { ...layout.view, ...dark.view },
  loginStyle: { ...layout.loginStyle, ...dark.loginStyle },
  cardBack: cardBackDark,
  cardBackRoutine: cardBackRoutineDark,
  mainBack: mainBackDark,
  overBack: overBackDark,
  primary: primaryDark,
  secondary: secondaryDark,
  tertiary: tertiaryDark,
  grayHeader: grayHeaderDark,
  gray: grayDark,
  headerText: headerTextDark,
  navigatorBottom: { ...layout.navigatorBottom, ...dark.navigatorBottom },
  navigatorTop: { ...layout.navigatorTop, ...dark.navigatorTop },
  tableRoutine: { ...layout.tableRoutine, ...dark.tableRoutine },
  tableHeadStyle: { ...layout.tableHeadStyle, ...dark.tableHeadStyle },
  tableHeadText: { ...layout.tableHeadText, ...dark.tableHeadText },
  tableRowStyle: { ...layout.tableRowStyle, ...dark.tableRowStyle },
  tableText: { ...layout.tableText, ...dark.tableText },
  scrollView: { ...layout.scrollView, ...dark.scrollView },
  calendarStyle: { ...layout.calendarStyle, ...dark.calendarStyle },
  calendarSessionMark: { ...layout.calendarSessionMark, ...dark.calendarSessionMark },

  text: { ...layout.text, ...dark.text },
  textBig: { ...layout.textBig, ...dark.textBig },
  textBigger: { ...layout.textBigger, ...dark.textBigger },
  selected: { ...layout.selected, ...dark.selected },
  inactive: { ...layout.inactive, ...dark.inactive },
  error: { ...layout.error, ...dark.error },

  titleScreen: { ...layout.titleScreen, ...dark.titleScreen },
  title: { ...layout.title, ...dark.title },
  subtitle: { ...layout.subtitle, ...dark.subtitle },
  icon: { ...layout.icon, ...dark.icon },
  buttonUser: { ...layout.buttonUser, ...dark.buttonUser },
  buttonTheme: { ...layout.buttonTheme, ...dark.buttonTheme },
  backButton: { ...layout.backButton, ...dark.backButton },
  button: { ...layout.button, ...dark.button },
  border: { ...layout.border, ...dark.border },
  input: { ...layout.input, ...dark.input },
  searchBar: { ...layout.searchBar, ...dark.searchBar },
  filterTag: { ...layout.filterTag, ...dark.filterTag },
  placeholderText: dark.placeholderText,
  // buttonRoutine: { ...layout.buttonRoutine, ...dark.buttonRoutine },
  card: { ...layout.card, ...dark.card },
  cardContent: { ...layout.cardContent, ...dark.cardContent },
  borderRadius: borderRadius,
};

export const styles = {
  light: StyleSheet.create(stylesLight),
  dark: StyleSheet.create(stylesDark),
};

