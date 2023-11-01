import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Import Facebook SDK
import TrackPlayer from 'react-native-track-player';
import Hot2 from './src/components/Hot2';
import BookDetail from './src/components/BookDetail';
import ItemListComment from './src/components/ItemListComment';
import LoginUser from './src/components/LoginUser';

// facebook

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));

