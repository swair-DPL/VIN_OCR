/* eslint-disable no-console */
import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    Animated,
    Image,
    Easing
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';

export default class CameraScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };
    state = {
        valid_VIN: false,
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        recordOptions: {
            mute: false,
            maxDuration: 5,
            quality: RNCamera.Constants.VideoQuality['288p'],
        },
        canDetectText: true,
        textBlocks: [],
    };
    
    constructor() {
        super()
        this.springValue = new Animated.Value(0.3)

    }
    spring() {
        this.springValue.setValue(0.3)
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 1
            }
        ).start()
    }
    navigationFun = (value) => {
        this.props.navigation.navigate('OCRView', {
            otherParam: value,
        })

        this.setState({ valid_VIN: false })
    }
    renderTextBlocks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {
                // this.toggle('canDetectText')
                // this.state.textBlocks.map(this.validVIN)
                this.state.textBlocks.map(this.renderTextBlock)
            }
        </View>
    );

    validVIN = (value) => {
        console.log('Vlaue ===>' + value)
        const str = value
        console.log('validity chk on ' + str + 'reutrns ' + str.match(".*[A-Z].*"))
        const res = str.match("^[A-Z0-9]{17}");
        if (res) {
            if (!this.state.valid_VIN) {

                console.log('validating vin x' + this.state.valid_VIN)
                this.setState({ valid_VIN: true })
                this.spring()
            }
            const tem = str.substring(0, 17)
            setTimeout(() => { this.navigationFun(tem) }, 1500)
            console.log('Validateeeeed' + value)
        }
        return res
    }
    renderTextBlock = ({ bounds, value }) => (
        this.validVIN(value) &&
        <React.Fragment key={value + bounds.origin.x}>
            <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
                {value}
            </Text>
            <View
                style={[
                    styles.text,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
            />
        </React.Fragment>
    );

    textRecognized = object => {
        const { textBlocks } = object;
        this.setState({ textBlocks });
    };



    renderCamera() {
        const {  canDetectText } = this.state;
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}
                trackingEnabled
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}

                onTextRecognized={canDetectText ? this.textRecognized : null}
            >
                {!!canDetectText && this.renderTextBlocks()}
                {this.state.valid_VIN && <View style={{ position: 'absolute', width: '100%', bottom: '10%', alignItems: 'center' }}>
                    <Animated.Image
                        style={{
                            width: 50,
                            height: 50,
                            transform: [{scale: this.springValue}]
                        }}
                        source={require('images/done.png')}
                    />
                    {/* <Image
                        style={{ height: 50, width: 50, }}
                        source={require('images/done.png')}
                    /> */}
                </View>}
            </RNCamera>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 10,
        // backgroundColor: '#rgb(76,186,217)',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#rgb(76,186,217)',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#rgb(76,186,217)',
        position: 'absolute',
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});
