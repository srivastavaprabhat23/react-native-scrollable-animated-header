import React, {useState,useEffect} from 'react';
import {
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Platform,
	AsyncStorage,
	Dimensions,
    Animated,
    KeyboardAvoidingView,
    RefreshControl
} from 'react-native';
import color from './color';
// import Footer from './CommonViews/Footer';
// import Header  from './CommonViews/Header';
import AnimatedHeader from './AnimatedHeader';
// import ContentRouting from './CommonViews/ContentRouting';
import {compose, withState, withProps} from 'recompose';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HeaderProps } from './types';
import { useScroller } from '../ScrollContext'


export const scrollRangeForAnimation = hp('40%');

const HeaderPlaceholder =()=> <View style={{
    flex: 0, 
    height: hp('30%'), 
    width: '100%',
    backgroundColor:color.primary,
}} />;


export const Header = (props:HeaderProps) => {  
  // const [scrollY,setScrollY]=useState(new Animated.Value(props.height))
  let scrollY=new Animated.Value(props.height)
  const animationRange =  scrollY.interpolate({
    inputRange: [0, scrollRangeForAnimation],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  let _scrollView = null;
  const onScrollEndSnapToEdge = event => {
      const y = event.nativeEvent.contentOffset.y;
      if (0 < y && y < scrollRangeForAnimation / 2) {
          if (_scrollView) {
              _scrollView.scrollTo({y: 0});
          }
      } else if (scrollRangeForAnimation / 2 <= y && y < scrollRangeForAnimation) {
          if (_scrollView) {
              _scrollView.scrollTo({y: scrollRangeForAnimation});
          }
      }
  };
  
  // const [AppVersion,setStateAppVersion] = React.useState(0)

  // AsyncStorage.getItem("AppVersion",(err,AppVersion)=>{
  // 	setStateAppVersion(AppVersion)
  // });	
  const [refreshing, setStateRefreshing]=useState(false)

  return (
    <View style={styles.container} pointerEvents="box-none">	
      <Animated.ScrollView
        style={styles1.fill}
        scrollEventThrottle={16}
        scrollToOverflowEnabled={true}
        onScrollEndDrag={onScrollEndSnapToEdge}
        onMomentumScrollEnd={onScrollEndSnapToEdge}
        onScroll={Animated.event(
          [
              {
                  nativeEvent: {contentOffset: {y: scrollY}},
              },
          ],
          {
              useNativeDriver: true,
          }
      )}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => {
        //       setStateRefreshing(true);
        //       setTimeout(() => setStateRefreshing(false), 1000);
        //     }}
        //     // Android offset for RefreshControl
        //     progressViewOffset={scrollRangeForAnimation}
        //   />
        // }
        // // iOS offset for RefreshControl
        // contentInset={{
        //   top: scrollRangeForAnimation,
        // }}
        // contentOffset={{
        //   y: -scrollRangeForAnimation,
        // }}
      >
        <HeaderPlaceholder/>
      </Animated.ScrollView>              
      <AnimatedHeader animationRange={animationRange}/>  
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    // zIndex:1,
    backgroundColor:color.lightTertiary,
  },
  scrollView: {
    flex:1, 
    // zIndex: 1
  }
});

export default Header;

const styles1 = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor:"red"
  },
  content: {
    flex: 1,
  },
  header: {  
    backgroundColor: 'yellow',
    height: scrollRangeForAnimation,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: scrollRangeForAnimation,
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
    paddingTop: Platform.OS !== 'ios' ? scrollRangeForAnimation : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

