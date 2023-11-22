import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import TrackPlayer from 'react-native-track-player';
import { AppContext } from '../../navigation/AppContext';
import Slider from 'react-native-slider';
const colorTitle = '#272956';
const colorContent = 'white';
const { width, height } = Dimensions.get('window');
const backgroundHeader = '#272956';
const backgroundBody = 'white';
const fontFamily = 'Poppins';
const sizeIcon = 26;
const baseImgPath = '../../assets/images/';
const colorProgressText = '#5849B7';
const PlayScreen = (props) => {
    const {isTabVisible, setIsTabVisible} = useContext(AppContext);
    const {navigation} = props
    //----------------------------------------------------------------------
    const [trackName, setTrackName] = useState("");
    const [onVolume, setOnVolume] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [isPlay, setIsPlay] = useState(false);
    const [isSetup, setIsSetup] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [volume, setVolume] = useState(0.5); // Giá trị mặc định

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

    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        TrackPlayer.setVolume(newVolume);
    };

    const updatePosition = async () => {
        const position = await TrackPlayer.getPosition();
        setPosition(position);
    };
    // Khởi tạo thoi gian hien tai
    useEffect(() => {
        setIsTabVisible(false)
        const interval = setInterval(updatePosition, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const handleSeek = (value) => {
        TrackPlayer.seekTo(value);
    };

    // Khởi tạo tong thoi gian
    useEffect(() => {
        async function initDuration() {
            const duration = await TrackPlayer.getDuration();
            setDuration(duration);
            const name = await TrackPlayer.getCurrentTrack();
            setTrackName(trackList[name].title);
        }
        initDuration();
    }, [isPlay]);

    // Khởi tạo trình phát âm nhạc
    useEffect(() => {
        try {
            if (isSetup) {
            } else {
                async function initPlayer() {
                    try {
                        await TrackPlayer.setupPlayer();
                        // Thêm danh sách phát vào trình phát
                        await TrackPlayer.add(trackList);
                        getInfo();
                    } catch (error) {
                        console.log(error);
                    }
                }
                initPlayer();
            }

        } catch (error) {
            console.log(error);
        }
    }, [isSetup]);
    const getInfo =async()=>{
        const duration = await TrackPlayer.getDuration();
        setDuration(duration);
        setIsSetup(true);
        const name = await TrackPlayer.getCurrentTrack();
        setTrackName(trackList[name].title);
    }
    // Bắt đầu chơi

    async function playPlayer() {
        if (isPlay) {
            try {
                await TrackPlayer.pause();
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                await TrackPlayer.play();
            } catch (error) {
                console.log(error);
            }
        }
        setIsPlay(!isPlay);
    }

    // Chuyển sang bài hát tiếp theo
    async function skipToNextTrack() {
        try {

            await TrackPlayer.skipToNext();
            await TrackPlayer.pause();
            setIsPlay(false);
            getInfo();
        } catch (error) {
            console.log(error);
        }
    }

    // Chuyển đến bài hát trước đó
    async function skipToPreviousTrack() {
        try {

            await TrackPlayer.skipToPrevious();
            await TrackPlayer.pause();
            setIsPlay(false);
            getInfo();
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

    const limitText = (text) => {
        if (text.length > 30) {
            return text.substring(0, 30) + '...';
        } else {
            return text;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressScreen}>
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <Icon onPress={()=>navigation.goBack()} name="caret-down" color={colorTitle} size={sizeIcon} />
                    <Text style={styles.nameTrack}>{limitText(trackName)}</Text>
                    <Icon name="ellipsis-h" color={colorTitle} size={sizeIcon} />
                </View>

                <View style={styles.playContainer}>
                    <Image style={{ width: 240, height: 320, borderRadius: 20 }} source={require(baseImgPath + 'Dac-Nhan-Tam.jpg')} />
                </View>
                <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'700',fontFamily:'Poppins',fontSize:18,color:'#272956'}}>Salinger was an American writer.</Text>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.progressText}>{formatTime(position)}</Text>
                            <Text style={styles.progressText}>{formatTime(duration)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '80%'
                    }}>
                        <TouchableOpacity onPress={() => setOnVolume(!onVolume)}>
                            <Image source={require(baseImgPath + "VolumeUp.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={skipToPreviousTrack}>
                            <Image source={require(baseImgPath + "back.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnPlay} onPress={playPlayer}>
                            {!isPlay ?
                                <Image source={require(baseImgPath + "PlayMusic.png")} />
                                :
                                // <Image source={require(baseImgPath + "PlayMusic.png")} />
                                <View style={{backgroundColor:'#0000cc',width:60,height:60,borderRadius:50,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:30,width:12,backgroundColor:'white',margin:2,borderRadius:10}}></View>
                                    <View style={{height:30,width:12,backgroundColor:'white',margin:2,borderRadius:10}}></View>
                                </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={skipToNextTrack}>
                            <Image source={require(baseImgPath + "next.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={require(baseImgPath + "Upload.png")} />
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

                            }}
                        >
                            <Text style={[styles.textFooter,{marginRight:10}]}>Volume</Text>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={0}
                                minimumTrackTintColor={colorProgressText} // Màu của phần dưới thanh tua
                                maximumTrackTintColor="#7B7B7B" // Màu của phần trên thanh tua
                                thumbTintColor={colorProgressText} // Màu của nút tua
                                maximumValue={1}
                                value={volume}
                                onValueChange={(newVolume) => changeVolume(newVolume)}
                            />

                        </View>
                    ) : (
                        <View></View>
                    )}
                </View>

                <View style={styles.footerContainer}>
                    <View style={{
                        marginTop: height*0.08,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '80%',
                    }}>
                        <TouchableOpacity style={styles.itemFooter}>
                            <Image style={[styles.iconFooter, { width: 30 }]} source={require(baseImgPath + "bookmark.png")} />
                            <Text style={styles.textFooter}>Bookmark</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemFooter}>
                            <Image style={styles.iconFooter} source={require(baseImgPath + "chapter.png")} />
                            <Text style={styles.textFooter}>Chapter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={changeSpeed} style={styles.itemFooter}>
                            <Image style={styles.iconFooter} source={require(baseImgPath + "speed.png")} />
                            <Text style={styles.textFooter}>Speed {speed.toFixed(1)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>

    )
}

export default PlayScreen

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
        borderBottomColor: '#d5d5d5'
    },
    nameTrack: {
        fontSize: 18,
        color: colorTitle,
        fontFamily: fontFamily,
        fontWeight: '500'
    },
    playContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        marginTop:10,
    },
    progressContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
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
        marginTop:30,
    },
    footerContainer: {
        alignItems: 'center',
        width: '100%'
    },
    iconFooter: {
        width: 33,
        height: 35,
        marginBottom: 10
    },
    itemFooter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '24%'
    },
    textFooter: {
        fontSize: 14,
        color: colorTitle,
        fontWeight: '400',
        fontFamily: 'Poppins'

    }

})
const trackList = [
    {
        id: '0',
        url: require('../../common/ai-la-gi.mp3'),
        title: 'Trí tuệ nhân tạo',
        artist: 'Artist 1',
    },
    {
        id: '1',
        url: require('../../common/dacnhantam.mp3'),
        title: 'Đắc nhân tâm',
        artist: 'Artist 2',
    },
    // Thêm các bài hát khác vào đây
];
