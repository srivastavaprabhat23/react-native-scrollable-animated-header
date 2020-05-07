import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import {withSelfMeasure} from './utils/selfMeasureBehaviour';
import {compose} from 'recompose';
import buildTransform from './utils/buildTransform';
import color from './color';
// import MyAppText from '../../../CommonView/MyAppText'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AnimatedText = ({    
    animationRange,
    onLayoutSetMeasurements,
    elementX,
    elementY,
    elementHeight,
    elementWidth}:any) => {

        const [ textElementWidth, setStateTextWidth ] = React.useState(0)

        const animateText = buildTransform(animationRange, elementX, elementY, elementHeight, elementWidth, Dimensions.get('screen').width-textElementWidth/2-(2*Dimensions.get('screen').height/64+Dimensions.get('screen').height/16), Dimensions.get('screen').height/64+Dimensions.get('screen').height/75, 0.5);
        const animateOpacity = {
            opacity: animationRange.interpolate({
                inputRange: [0, 0.9, 1],
                outputRange: [1, 0, 1],
            }),
        };

        return (
            // <MyAppText nativeBase bold>
                <Animated.Text 
                    style={[styles.text, animateText, animateOpacity]}
                    onLayout={event =>{ 
                        setStateTextWidth(event.nativeEvent.layout.width)
                        onLayoutSetMeasurements(event)}}
                    >
                    Lorem ipsum dolor sit
                </Animated.Text>
            // </MyAppText>
        )        
}

const styles = StyleSheet.create({
    text: {     
        // paddingTop:20,   
        fontSize: hp('5%'),
        color: color.white,
        // fontWeight: 'bold',
        justifyContent:'center',
        alignItems:'center',
    }
});

const enhance = compose(withSelfMeasure);

export default enhance(AnimatedText);