import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity } from 'react-native';
import AnimatedText from './AnimatedText';
import AnimatedImage from './AnimatedImage';
import color from './color';
import { Ionicons as Icon } from '@expo/vector-icons';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';


const HeaderBackground = ({animationRange}) => {
    const animateHeader = {
        transform: [
            {
                translateY: animationRange.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -Dimensions.get('screen').height/4+(2*Dimensions.get('screen').height/64+Dimensions.get('screen').height/16)],
                }),
            },
        ],
    };

    return <Animated.View style={[styles.headerBackground, animateHeader]} />;
};


const AnimatedHeader = ({animationRange}) =>   
    <View style={styles.container} pointerEvents="box-none"> 
        {/* <TouchableOpacity
            style={{position:"absolute",top:Dimensions.get('screen').height/64,height:Dimensions.get('screen').height/16,width:Dimensions.get('screen').height/16,left:2*Dimensions.get('screen').height/64,zIndex:2}}
            onPress={() => {
                navigationProps.openDrawer();
            }}
            >
            <Icon name="md-menu" size={Dimensions.get('screen').height/16} style={{color:color.tertiary}}/>
        </TouchableOpacity>  */}
        <HeaderBackground animationRange={animationRange} />
        <Animated.View style={styles.container} pointerEvents="box-none">
         
            <AnimatedImage animationRange={animationRange}/>
            <AnimatedText animationRange={animationRange}/>
        </Animated.View>       
    </View>

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        flex: 0, 
        // zIndex: 2, 
        height:hp('30%'), 
        width:'100%', 
        backgroundColor: 'transparent',

        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: color.primary,
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,
        
        // elevation: 24,
     },
    headerBackground: {
        position: 'absolute',
        flex: 0,        
        height: hp('30%'),
        width: '100%',
        backgroundColor: color.primary,
        // zIndex: 2,
        // shadowColor: color.primary,
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,
        
        // elevation: 24,
    }
});

export default AnimatedHeader;