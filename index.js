import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import HomeScreen from './src/components/FavouriteScreen';


HomeScreen

AppRegistry.registerComponent(appName, () => HomeScreen);
