/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';
import { AppContext } from '../../navigation/AppContext';
import Slider from 'react-native-slider';
import AxiosIntance from '../../axios/AxiosIntance';
import { err } from 'react-native-svg/lib/typescript/xml';
import { useFocusEffect } from '@react-navigation/native';

const colorTitle = '#272956';
const colorContent = 'white';
const { width, height } = Dimensions.get('window');
const backgroundHeader = '#272956';
const backgroundBody = 'white';
const fontFamily = 'Poppins';
const sizeIcon = 26;
const sizeIconFooter = 36;
const baseImgPath = '../../assets/images/';
const colorProgressText = '#5849B7';
const PlayScreen = props => {
  const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  const { navigation } = props;
  const { id } = props.route.params;
  const route = props.route;
  //----------------------------------------------------------------------
  const [AuthorData, setAuthorData] = useState({});
  const [bookData, setBookData] = useState({});
  const [audioUrl, setAudioUrl] = useState('...');
  const [dataAudio, setDataAudio] = useState([]);
  const [dataML, setDataML] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trackName, setTrackName] = useState('...');
  const [onVolume, setOnVolume] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isPlay, setIsPlay] = useState(false);
  const { isPlayAudio, setIsPlayAudio } = useContext(AppContext);
  const { lastIdPlay, setLastIdPlay } = useContext(AppContext);
  const [isSetup, setIsSetup] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(1); // Giá trị mặc định

  const changeSpeed = async () => {
    let newSpeed;

    switch (speed) {
      case 1.0:
        newSpeed = 1.5;
        break;
      case 1.5:
        newSpeed = 2.0;
        break;
      case 2.0:
        newSpeed = 0.25;
        break;
      case 0.25:
        newSpeed = 0.5;
        break;
      case 0.5:
        newSpeed = 1;
        break;
      case 1:
        newSpeed = 1.5;
        break;
      case 1.5:
        newSpeed = 2;
        break;
      default:
        newSpeed = 1.0; // Giá trị mặc định ban đầu
        break;
    }
    try {
      await TrackPlayer.setRate(newSpeed);
    } catch (error) {
      console.log(error);
    }
    setSpeed(newSpeed);
  };

  const changeVolume = newVolume => {
    setVolume(newVolume);
    TrackPlayer.setVolume(newVolume);
  };

  const updatePosition = async () => {
    const position = await TrackPlayer.getPosition();
    setPosition(position);
  };
  // Khởi tạo thoi gian hien tai
  useEffect(() => {
    //setIsTabVisible(false);
    const interval = setInterval(updatePosition, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleSeek = value => {
    TrackPlayer.seekTo(value);
  };

  const getAudio = async (id) => {
    console.log("isPlayAudio ne: ", isPlayAudio);
    setIsLoading(true)
    const response = await AxiosIntance().get('/product/get-audio/' + id);
    let dataAudioNe = [];
    if (response.result) {
      const res = await AxiosIntance().get('/product/get-muc-luc/' + id);
      if (res.result) {
        const newBody0 = { id: '0', chuong: 0, title: "Giới thiệu chung", url: response.audios[0].audio0 };
        const newBody1 = { id: '1', chuong: 1, title: res.ml[0].title, url: response.audios[0].audio1 };
        const newBody2 = { id: '2', chuong: 2, title: res.ml[1].title, url: response.audios[0].audio2 };
        const newBody3 = { id: '3', chuong: 3, title: res.ml[2].title, url: response.audios[0].audio3 };
        dataAudioNe.push(newBody0);
        dataAudioNe.push(newBody1);
        dataAudioNe.push(newBody2);
        dataAudioNe.push(newBody3);
      }
    }
    setDataAudio(dataAudioNe);
    initDuration();
    initPlayer(dataAudioNe);
    getInfo();
    setIsLoading(false)

  }
  async function initDuration() {
    try {
      const duration = await TrackPlayer.getDuration();
      setDuration(duration);
      const name = await TrackPlayer.getCurrentTrack();
    } catch (error) {
      console.log(error);
    }
  }
  async function initPlayer(dataAudio) {
    try {
      const setUp = await TrackPlayer.setupPlayer();

      console.log("setUp ne: ", setUp);
      // Thêm danh sách phát vào trình phát
      await TrackPlayer.add(dataAudio);
      getInfo();
      setIsSetup(true)
    } catch (error) {
      console.log("error when setup: ", error);
    }
  }
  // Khởi tạo trình phát âm nhạc
  useEffect(() => {

    getAudio(id);
  }, []);
  const getInfo = async () => {
    try {
      const duration = await TrackPlayer.getDuration();
      setDuration(duration);
      setIsSetup(true);
      const name = await TrackPlayer.getCurrentTrack();
      setIndex(name)

    } catch (error) {
      console.log(error);
    }
  };
  // Bắt đầu chơi
  async function playPlayer() {
    getInfo();
    if (isPlayAudio) {
      try {
        await TrackPlayer.pause();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await TrackPlayer.play();
      } catch (error) {
        console.log(error);
      }
    }
    setIsPlayAudio(!isPlayAudio)
    setIsPlay(!isPlay)
  }
  async function playPlayer2(bol) {
    getInfo();
    if (bol) {

    } else {
      try {

        await TrackPlayer.pause();
        // huy va dk lai cac track
        await TrackPlayer.reset()
        const response = await AxiosIntance().get('/product/get-audio/' + id);
        let dataAudioNe = [];
        if (response.result) {
          const res = await AxiosIntance().get('/product/get-muc-luc/' + id);
          if (res.result) {
            const newBody0 = { id: '0', chuong: 0, title: "Giới thiệu chung", url: response.audios[0].audio0 };
            const newBody1 = { id: '1', chuong: 1, title: res.ml[0].title, url: response.audios[0].audio1 };
            const newBody2 = { id: '2', chuong: 2, title: res.ml[1].title, url: response.audios[0].audio2 };
            const newBody3 = { id: '3', chuong: 3, title: res.ml[2].title, url: response.audios[0].audio3 };
            dataAudioNe.push(newBody0);
            dataAudioNe.push(newBody1);
            dataAudioNe.push(newBody2);
            dataAudioNe.push(newBody3);
            console.log("add track ne: ", await TrackPlayer.add(dataAudioNe));
          }
        }
        setDataAudio(dataAudioNe);
        getInfo();
        setIsSetup(true)
        setIsPlayAudio(false)
        setIsPlay(false)
      } catch (error) {
        console.log(error);
      }
    }

  }
  // Chuyển sang bài hát tiếp theo
  async function skipToNextTrack() {
    try {
      setOnVolume(false)
      await TrackPlayer.skipToNext();
      await TrackPlayer.pause();
      setIsPlayAudio(false);
      getInfo();
    } catch (error) {
      console.log(error);
    }
  }
  async function skipToPreviousTrack() {
    try {
      setOnVolume(false)
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.pause();
      setIsPlayAudio(false);
      getInfo();
      if (index > 0) {
        setIndex(index - 1);
      } else {
        setIndex(3);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  const handlePressScreen = () => {
    setOnVolume(false);
  };
  //----------------------------------------------------------------------
  const limitText1 = (text, num) => {
    try {
      if (text.length > num) {
        return text.substring(0, num) + '...';
      } else {
        return text;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DetailBook = async () => {
    try {
      const response = await AxiosIntance().get('/product/' + id);
      const Data2 = {
        id: response.product._id,
        title: response.product.title,
        authorId: response.product.authorId,
        category: response.product.categoryId,
        image: response.product.image,
        audio: response.product.audio,
      };
      setBookData(Data2);
      setAudioUrl(Data2.audio);
      const res = await AxiosIntance().get('/product/author/' + id);
      const Data1 = {
        id: res.author._id,
        authorname: res.author.name,
      };
      setAuthorData(Data1);
    } catch (error) {
      console.log("error get detail book ", error);
    }
  };

  const resetComponent = async () => {
    DetailBook();
    if (lastIdPlay == id) {
      console.log("id trung ne");
    } else {
      console.log("id khacs ne");
      playPlayer2(false)
      setIsPlayAudio(false)

      //await TrackPlayer.play()
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      resetComponent();
      return () => {
        setLastIdPlay(id)
        //await TrackPlayer.
      };
    }, [])
  );
  const onClickItemML = async (id) => {
    try {
      await TrackPlayer.skip(parseInt(id));
      await TrackPlayer.pause();
      setIsPlayAudio(false);
      getInfo();
      setIsModalVisible(false)
      setOnVolume(false)
    } catch (error) {
      console.log(error);
    }
  }
  const onClickSave = async () => {
    try {
      console.log("save");
    } catch (error) {
      console.log(error);
    }
  }
  try {
    return (
      <TouchableWithoutFeedback onPress={handlePressScreen}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Icon
              onPress={() => navigation.goBack()}
              name="caret-down"
              color={colorTitle}
              size={sizeIcon}
            />
            <Text style={styles.nameTrack}>{!isLoading ? limitText1(bookData.title, 25) : "..."}</Text>
            <View></View>
          </View>

          <View style={styles.playContainer}>
            {isLoading ? (
              <View
                style={{
                  width: 240,
                  height: 320,
                  borderRadius: 20,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  size={30}
                  color={'#d6d6d6'}></ActivityIndicator>
              </View>
            ) : (
              <Image
                style={{ width: 240, height: 320, borderRadius: 20 }}
                source={{ uri: bookData.image }}
              />
            )}
          </View>
          <View
            style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                fontSize: 16,
                color: '#272956',
              }}>
              {!isLoading ? limitText1(dataAudio[index].title, 45) : '...'}
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={{ width: '80%' }}>
              <View style={{ height: 30 }}>
                <Slider
                  minimumTrackTintColor={colorProgressText} // Màu của phần dưới thanh tua
                  maximumTrackTintColor="#7B7B7B" // Màu của phần trên thanh tua
                  thumbTintColor={colorProgressText} // Màu của nút tua
                  thumbStyle={{ width: 12, height: 12 }}
                  value={position}
                  minimumValue={0}
                  maximumValue={duration}
                  onValueChange={handleSeek}
                />
              </View>
              {isLoading ? (
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.progressText}>00:00</Text>
                  <Text style={styles.progressText}>09:00</Text>
                </View>
              ) : (
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.progressText}>0{formatTime(position)}</Text>
                  <Text style={styles.progressText}>0{formatTime(duration)}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.menuContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '80%',
              }}>
              <TouchableOpacity onPress={() => setOnVolume(!onVolume)}>
                <Image source={require(baseImgPath + 'VolumeUp.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToPreviousTrack}>
                <Image source={require(baseImgPath + 'back.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPlay} onPress={playPlayer}>
                {!isPlayAudio ? (
                  <Image source={require(baseImgPath + 'PlayMusic.png')} />
                ) : (
                  // <Image source={require(baseImgPath + "PlayMusic.png")} />
                  <View
                    style={{
                      backgroundColor: '#0000cc',
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 30,
                        width: 12,
                        backgroundColor: 'white',
                        margin: 2,
                        borderRadius: 10,
                      }}></View>
                    <View
                      style={{
                        height: 30,
                        width: 12,
                        backgroundColor: 'white',
                        margin: 2,
                        borderRadius: 10,
                      }}></View>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNextTrack}>
                <Image source={require(baseImgPath + 'next.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require(baseImgPath + 'Upload.png')} />
              </TouchableOpacity>
            </View>
            {onVolume ? (
              <View
                style={{
                  position: 'absolute',
                  width: '80%',
                  start: '10%',
                  top: '110%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.textFooter, { marginRight: 10 }]}>
                  Âm lượng
                </Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  minimumTrackTintColor={colorProgressText} // Màu của phần dưới thanh tua
                  maximumTrackTintColor="#7B7B7B" // Màu của phần trên thanh tua
                  thumbTintColor={colorProgressText} // Màu của nút tua
                  maximumValue={1}
                  value={volume}
                  onValueChange={newVolume => changeVolume(newVolume)}
                />
              </View>
            ) : (
              <View></View>
            )}
          </View>

          <View style={styles.footerContainer}>
            <View
              style={{
                marginTop: height * 0.08,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <TouchableOpacity onPress={() => onClickSave()} style={styles.itemFooter}>
                <Icon
                  name="heart-o"
                  color={colorTitle}
                  size={sizeIconFooter}
                />
                <Text style={styles.textFooter}>Lưu</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.itemFooter}>
                <IconMCI
                  name="playlist-play"
                  color={colorTitle}
                  size={sizeIconFooter}
                />
                <Text style={styles.textFooter}>Chương</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={changeSpeed} style={styles.itemFooter}>
                <IconMCI
                  name="play-speed"
                  color={colorTitle}
                  size={sizeIconFooter}
                />
                <Text style={styles.textFooter}>Tốc độ {speed.toFixed(1)}</Text>
              </TouchableOpacity>
            </View>
            <Modal
              style={{ height: '100%', width: '100%', backgroundColor: 'red' }}
              animationType="slide"
              transparent={true}
              visible={isModalVisible}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  width: '100%',
                  height: '100%',
                }}>
                <View style={{ paddingVertical: 10, backgroundColor: 'white', position: 'absolute', bottom: 0, width: '100%' }}>
                  <Icon onPress={() => setIsModalVisible(false)} style={{ position: 'absolute', right: 10 }} name="sort-desc" color={colorTitle} size={sizeIconFooter} />
                  <Text style={[styles.nameTrack, { fontSize: 18, paddingStart: 10 }]}>Chọn chương</Text>
                  <FlatList
                    style={{ marginTop: 20 }}
                    data={dataAudio}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => onClickItemML(item.id)} style={{ paddingVertical: 10, backgroundColor: '#f2f2f2', marginBottom: 10, paddingStart: 10, }}>
                        <Text style={[styles.nameTrack, { fontWeight: '500', fontSize: 16 }]}>{item.title}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={true}
                  />
                </View>
              </View>

            </Modal>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } catch (error) {
    console.log(error);
  }
};

export default PlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
  },
  nameTrack: {
    fontSize: 18,
    color: colorTitle,
    fontFamily: fontFamily,
    fontWeight: '700',
  },
  playContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  progressContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  progressText: {
    color: colorProgressText,
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  iconFooter: {
    width: 33,
    height: 35,
    marginBottom: 10,
  },
  itemFooter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  textFooter: {
    fontSize: 14,
    color: colorTitle,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
});
const trackList = [
  {
    id: '0',
    url: 'https://drive.usercontent.google.com/download?id=1gYmliovYIFcSJpgGjQKqUbk94JId9lDY&export=download&authuser=0&confirm=t&uuid=e6269e25-e56f-4dcd-bb53-30fd181e40e5&at=APZUnTWjpnITc9eJCw_1qsvhCKaj:1700929717334',
    title: 'Trí tuệ nhân tạo',
    artist: 'Artist 1',
  },
  {
    id: '1',
    url: 'https://drive.usercontent.google.com/download?id=1U51zQbFQZit7Sf22O9tWHGQch1EtCh1g&export=download&authuser=0&confirm=t&uuid=895a8b68-c29e-43ca-a0e7-94e7d818489f&at=APZUnTUH2VIBGwK7vBfQqnjQKyQ9:1700928676054',
    title: 'Đắc nhân tâm',
    artist: 'Artist 2',
  },
  // Thêm các bài hát khác vào đây
];
