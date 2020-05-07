import React, { useState, useEffect } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Easing
} from 'react-native';
import { useScroller } from '../ScrollContext'
import { styles } from './styles'
import { HeaderProps } from './types'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HEADER_MAX_HEIGHT = hp('30%');
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const Header =(props:HeaderProps)=> {
  console.log("initial",props.height)
  const { titleShowing, opacity } = useScroller();

  const [titleFade] = useState(
    new Animated.Value(hp('2%'))
  );

  useEffect(() => {
    titleShowing === false &&
      
      Animated.timing(
        stateScrollY, {
        toValue: props.height,
        duration: 1,
        useNativeDriver: true,
        easing: Easing.linear
      }).start();

    titleShowing === true &&
      Animated.timing(
        stateScrollY, {
        toValue: props.height,
        duration: 1,
        useNativeDriver: true,
        easing: Easing.sin
      }).start();
  });

  // Animated.event(
  //   [{ nativeEvent: { contentOffset: { y: stateScrollY } } }],
  //   { useNativeDriver: true },
  // )  

  const [stateScrollY]=useState(
    new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    )
  )

  const [refreshing, setStateRefreshing]=useState(false)

  
  // Because of content inset the scroll value will be negative on iOS so bring
  // it back to 0.
  const scrollY = Animated.add(
    stateScrollY,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
  );
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles1.fill}>      
      <Animated.ScrollView
        style={styles1.fill}
        scrollEventThrottle={16}
        scrollToOverflowEnabled={true}
        onScroll={stateScrollY}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setStateRefreshing(true);
              setTimeout(() => setStateRefreshing(false), 1000);
            }}
            // Android offset for RefreshControl
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
        // iOS offset for RefreshControl
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}
      >
        
      </Animated.ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[
          styles1.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        {/* <Animated.Image
          style={[
            styles1.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslate }],
            },
          ]}
          source={require('./icon.png')}
        /> */}
      </Animated.View>
      {/* <Animated.View
        style={[
          styles1.bar,
          {
            transform: [
              { scale: titleScale },
              { translateY: titleTranslate },
            ],
          },
        ]}
      >
        <Text style={styles1.title}>Title</Text>
      </Animated.View> */}
    </View>
  );
}

const styles1 = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'yellow',
    // overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;