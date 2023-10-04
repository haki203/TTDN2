import React, { useRef } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  Animated,
} from 'react-native';
import { getFeatureViewAnimation } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import RegisterScreen from './RegisterScreen';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const UPPER_HEADER_HEIGHT = 52;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;

export default function MomoHeader() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');

  const depositViewAnimation = getFeatureViewAnimation(animatedValue, 36);
  const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, -16);
  const qrViewAnimation = getFeatureViewAnimation(animatedValue, -56);
  const scanViewAnimation = getFeatureViewAnimation(animatedValue, -92);

  const featureIconCircleAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  const featureNameAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  const featureIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 2],
      extrapolate: 'clamp',
    }),
  };

  const textInputAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>

      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Image
              source={require('../animation/images/searchh.png')}
              style={{ marginLeft: 8, width: 23, height: 23, }}
            />
            <AnimatedTextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              style={[styles.searchInput, textInputAnimation]}
            />
          </View>

          <Image
            source={require('../animation/images/active.png')}
            style={styles.bell}
          />
          <Image
            source={require('../animation/images/users.png')}
            style={styles.avatar}
          />
        </View>

        <View style={[styles.lowerHeader]}>
          <Animated.View style={[styles.feature, depositViewAnimation]}>
            <Animated.Image
              source={require('../animation/images/wallet.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../animation/images/wallet.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              NẠP TIỀN
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, withdrawViewAnimation]}>
            <Animated.Image
              source={require('../animation/images/credit-card.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../animation/images/credit-card.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              RÚT TIỀN
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, qrViewAnimation]}>
            <Animated.Image
              source={require('../animation/images/qr-code.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../animation/images/qr-code.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              MÃ QR
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, scanViewAnimation]}>
            <Animated.Image
              source={require('../animation/images/scan.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../animation/images/scan.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              QUÉT MÃ
            </Animated.Text>
          </Animated.View>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        onScrollEndDrag={() => {
          scrollViewRef.current?.scrollTo({
            y: scrollDirection.current === 'down' ? 100 : 0,
            animated: true,
          });
        }}
        scrollEventThrottle={16}>
        <View style={styles.spaceForHeader} />
        <View style={styles.scrollViewContent} >
          <Image style={{ height: '100%', width: '80%', aspectRatio: 22 / 36 }} source={require('../animation/images/books.png')} />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#AF0C6E',
  },
  upperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: -5,
  },
  bell: {
    width: 24,
    height: 24,
    marginHorizontal: 32,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  lowerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: LOWER_HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 42,
    fontSize: 17
  },
  feature: {
    alignItems: 'center',
  },
  featureName: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    marginTop: 12,
  },
  spaceForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
  scrollViewContent: {
    height: 1000,
    backgroundColor: '#e6e6ff',
  },
});
