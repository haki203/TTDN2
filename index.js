import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import TrackPlayer from 'react-native-track-player';
import Hot2 from './src/components/Hot2';
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));

