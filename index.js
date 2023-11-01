import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Import Facebook SDK
import TrackPlayer from 'react-native-track-player';
import Hot2 from './src/components/Hot2';

// facebook

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));

