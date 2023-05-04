import { StyleSheet } from 'react-native';


const layout = {
  container: {
    flex: 1,
    marginTop: 12.5,
  },
  view: {
    paddingLeft: 10,
    height: '80%',
  },
  titleScreen: {
    height: 50,
    marginBottom: 10,
    alignItems: 'flex-start',
    paddingLeft: 10,
    elevation: 8,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 5,
  },
  subtitle: {
    alignItems: 'center',
    // justifyContent: 'center',
    // marginLeft: 40,
    marginBottom: 5,
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
    top: 27,
    right: 20,
    height: 20,
    width: 20,
    activeOpacity: 0.5,
    underlayColor: 'transparent',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    height: 20,
    width: 20,
    margin: 5,
    activeOpacity: 0.5,
    underlayColor: 'transparent',
    zIndex: 1,
  },
  buttonRoutine: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 30,
    width: '50%',
    margin: 2,
    activeOpacity: 0.5,
    underlayColor: 'transparent',
    borderRadius: 2,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
  },
  text: {
    paddingLeft: 10,
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
  },
  scrollView: {
    height: '82%',
  },
  card: {
    marginTop: 10,
    marginBottom: 20,
    width: '85%',
    alignSelf: 'center',
    elevation: 4,
  },
};

const font = {
  container: {
  },
  view: {
  },
  titleScreen: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // textAlignVertical: 'center',
  },
  buttonUser: { },
  buttonTheme: { },
  backButton: { },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
  },
  selected: { },
  inactive: { },
  border: { },
  input: {
    fontSize: 18,
  },
  scrollView: {},
  card: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    color: '#ff0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

const light = {
  container: {
    backgroundColor: '#fff',
  },
  view: {
    backgroundColor: '#257cff',
  },
  titleScreen: {
    color: '#fff',
    backgroundColor: '#257cff',
  },
  title: {
    color: '#2e2e2e',
  },
  subtitle: {
    color: '#2e2e2e',
  },
  icon: {
    color: '#c38fff',
  },
  buttonUser: {
    color: '#fff',
  },
  buttonTheme: {
    color: '#fff',
  },
  backButton: {
    color: '#fff',
  },
  buttonRoutine: {
    underlayColor: '#38f',
    backgroundColor: '#257cff',
    color: '#fff',
  },
  button: {
    backgroundColor: '#3F51B5',
    color: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  text: {
    color: '#000',
  },
  selected: {
    color: '#257cff'
  },
  inactive: {
    color: 'gray'
  },
  border: {
    borderColor: '#ac7ff6',
  },
  input: {
    color: '#000',
  },
  placeholderText: '#b4b4b4',
  scrollView: {},
  card: {
    backgroundColor: '#29B6F6',
    color: '#dddddd',
  },
};

const dark = {
  container: {
    backgroundColor: '#121212',
  },
  view: {
    backgroundColor: '#202020',
  },
  titleScreen: {
    color: '#e1e1e1',
    backgroundColor: '#202020',
  },
  title: {
    color: '#e1e1e1',
  },
  subtitle: {
    color: '#d4d4d4',
  },
  icon: {
    color: '#03dac5',
  },
  buttonUser: {
    color: '#fff',
  },
  buttonTheme: {
    color: '#fff',
  },
  backButton: {
    color: '#fff',
  },
  buttonRoutine: {
    underlayColor: '#03dac5',
    backgroundColor: '#1e1e1e',
  },
  button: {
    backgroundColor: '#c38fff',
    color: '#000000',
  },
  button2: {
    backgroundColor: '#03dac5',
    color: '#000000',
  },
  buttonText: {
    color: '#000000',
  },
  text: {
    color: '#8a8a8a',
  },
  selected: {
    color: '#03dac5'
  },
  inactive: {
    color: '#616161'
  },
  border: {
    borderColor: '#000',
  },
  input: {
    color: '#dfdfdf',
  },
  placeholderText: '#525252',
  scrollView: {},
  card: {
    backgroundColor: '#1e1e1e',
    color: '#dddddd',
  },
};

const stylesLight = {
  container: { ...layout.container, ...font.container, ...light.container },
  titleScreen: { ...layout.titleScreen, ...font.titleScreen, ...light.titleScreen },
  title: { ...layout.title, ...font.title, ...light.title },
  subtitle: { ...layout.subtitle, ...font.subtitle, ...light.subtitle },
  icon: { ...layout.icon, ...font.icon, ...light.icon },
  buttonUser: { ...layout.buttonUser, ...font.buttonUser, ...light.buttonUser },
  buttonTheme: { ...layout.buttonTheme, ...font.buttonTheme, ...light.buttonTheme },
  backButton: { ...layout.backButton, ...font.backButton, ...light.backButton },
  button: { ...layout.button, ...font.button, ...light.button },
  buttonText: { ...layout.buttonText, ...font.buttonText, ...light.buttonText },
  text: { ...layout.text, ...font.text, ...light.text },
  selected: { ...layout.selected, ...font.selected, ...light.selected },
  inactive: { ...layout.inactive, ...font.inactive, ...light.inactive },
  border: { ...layout.border, ...font.border, ...light.border },
  input: { ...layout.input, ...font.input, ...light.input },
  placeholderText: light.placeholderText,
  buttonRoutine: { ...layout.buttonRoutine, ...font.buttonRoutine, ...light.buttonRoutine },
  scrollView: { ...layout.scrollView, ...font.scrollView, ...light.scrollView },
  card: { ...layout.card, ...font.card, ...light.card },
  error: { ...layout.error, ...font.error, ...light.error },
};

const stylesDark = {
  container: { ...layout.container, ...font.container, ...dark.container },
  titleScreen: { ...layout.titleScreen, ...font.titleScreen, ...dark.titleScreen },
  title: { ...layout.title, ...font.title, ...dark.title },
  subtitle: { ...layout.subtitle, ...font.subtitle, ...dark.subtitle },
  icon: { ...layout.icon, ...font.icon, ...dark.icon },
  buttonUser: { ...layout.buttonUser, ...font.buttonUser, ...dark.buttonUser },
  buttonTheme: { ...layout.buttonTheme, ...font.buttonTheme, ...dark.buttonTheme },
  backButton: { ...layout.backButton, ...font.backButton, ...dark.backButton },
  button: { ...layout.button, ...font.button, ...dark.button },
  buttonText: { ...layout.buttonText, ...font.buttonText, ...dark.buttonText },
  text: { ...layout.text, ...font.text, ...dark.text },
  selected: { ...layout.selected, ...font.selected, ...dark.selected },
  inactive: { ...layout.inactive, ...font.inactive, ...dark.inactive },
  border: { ...layout.border, ...font.border, ...dark.border },
  input: { ...layout.input, ...font.input, ...dark.input },
  placeholderText: dark.placeholderText,
  buttonRoutine: { ...layout.buttonRoutine, ...font.buttonRoutine, ...dark.buttonRoutine },
  scrollView: { ...layout.scrollView, ...font.scrollView, ...dark.scrollView },
  card: { ...layout.card, ...font.card, ...dark.card },
  error: { ...layout.error, ...font.error, ...dark.error },
};

export const styles = {
  light: StyleSheet.create(stylesLight),
  dark: StyleSheet.create(stylesDark),
};

