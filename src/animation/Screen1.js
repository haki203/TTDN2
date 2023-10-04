import { StyleSheet, Text, View, Animated, PanResponder, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import MonoHeader from './MonoHeader'
import LoginScreen from './LoginScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window');
const Screen1 = () => {
  const [heightView, setHeight] = useState(height);
  const [bottom, setBottom] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, gestureState) => {
          return true;
        },
        onPanResponderMove: Animated.event([null, { dy: pan.y }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 200) {
            // Vuốt quá 200px, thay đổi màu nền và chiều cao
            setHeight(150);
            setHeight(50);
            setBottom(20)
          } else {
            // Nếu không vuốt quá 200px, quay về như cũ
            setHeight(height);
            setBottom(0)
          }
          // Đặt lại giá trị y của Animated.ValueXY về 0
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        },
      }),
    [pan]
  );
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MonoHeader />
      </View>
      <Animated.View
        style={{
          transform: pan.getTranslateTransform(),
          height: heightView,
          width: width,
          position: 'absolute',
          bottom: bottom
        }}
        {...panResponder.panHandlers}
      >
        {/* Nội dung của màn hình */}

        <View>
          {
            (heightView < 60) ?
              (
                <View style={{ backgroundColor: '#668cff', height: 70, padding: 10, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, }}>Đắc nhân tâm</Text>
                    <Text style={{ fontSize: 14, }}>Napoleon Hill</Text>
                  </View>
                </View>
              ) :
              (
                <View style={{ width: width, height: height,backgroundColor:'#FDFDFD' }}>
                  <Image style={{height: '110%', aspectRatio: 9 / 18,marginTop:5}} source={require('../animation/images/des.png')}/>
                </View>
              )
          }
        </View>
      </Animated.View>



    </View>
  );
};


export default Screen1

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen2: {
    height: '100%', // Chỉnh chiều cao tùy ý
    width: '100%', // Chỉnh chiều rộng tùy ý
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
})