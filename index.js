import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Screen1 from './src/components/tab_view/Screen1';
import HomeScreen from './src/components/HomeScreen';


HomeScreen

AppRegistry.registerComponent(appName, () => HomeScreen);
