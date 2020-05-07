import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import {withSelfMeasure} from './utils/selfMeasureBehaviour';
import {compose} from 'recompose';
import {Dimensions} from 'react-native';
import buildTransform from './utils/buildTransform';


const AnimatedImage = ({
    animationRange,
    onLayoutSetMeasurements,
    elementX,
    elementY,
    elementHeight,
    elementWidth}:any) => {

        const animateImage = buildTransform(animationRange, elementX, elementY, elementHeight, elementWidth, Dimensions.get('screen').width-Dimensions.get('screen').height/16-Dimensions.get('screen').height/64, Dimensions.get('screen').height/64, 0.5);        
        return (
            <Animated.Image 
                source={require('./icon.png')} 
                style={[styles.image, animateImage]} 
                onLayout={event => onLayoutSetMeasurements(event)} />                
        )        
}

const styles = StyleSheet.create({
    image: {  
        marginTop: 20,
        width: Dimensions.get('screen').height/8,
        height: Dimensions.get('screen').height/8              
    }
});

const enhance = compose(withSelfMeasure);

export default enhance(AnimatedImage);