import { TOGGLE_PLAYBACK } from './actionTypes';
import { SEEK_TO_TIME } from './actionTypes';
export const togglePlayback = () => ({
  type: TOGGLE_PLAYBACK,
});
export const toggleIsPlay = () => {
  return {
    type: 'TOGGLE_IS_PLAY',
  };
};
export const seekToTime = (time) => ({
  type: SEEK_TO_TIME,
  payload: time,
});
export const setIsPlay = isPlay => {
  return {
    type: 'SET_IS_PLAY',
    payload: isPlay,
  };
};