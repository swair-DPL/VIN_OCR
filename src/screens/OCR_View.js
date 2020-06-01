import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    FlatList,
    Linking,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Button,

} from 'react-native';
export default class OCRView extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params.otherParam,
            edit: false
        }
    }
    render() {
        return <View style={styles.container}>

            <Text style={styles.text}>
                Resulted Data:
      </Text>
            <Text style={{ color: 'gray', fontSize: 18 }}>Vehile Identification Number</Text>
            {/* {this.list()} */}
            <TouchableOpacity onPress={() => {
                this.setState({ edit: true })
                // this.refs.textRef.focus();


            }
            }>
                <TextInput
                    // onFocus={() => this.setState({ edit: true })}
                    onBlur={() => this.setState({ edit: false })}
                    editable={this.state.edit}
                    // autoFocus={true}
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        // margin: 10,
                        // fontWeight: 'bold'
                    }}>
                    {this.state.data}
                </TextInput>
            </TouchableOpacity>
            <Text style={{ color: '#D3D3D3', fontSize: 10, marginTop: -10 }}>Double tap on VIN to edit it</Text>
            <TouchableOpacity style={{
                marginTop: '20%',
                height: 35, width: 100,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#rgb(76,186,217)'
            }}
                onPress={() => this.props.navigation.goBack()}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Confirm
        </Text>
            </TouchableOpacity>

        </View >
    }
    list = () => {
        return this.state.data.map(element => {
            console.log('element vad' + JSON.stringify(element))
            if (this.validVIN(element.text))
                return (
                    <Text style={{ margin: 10 }}>{element.text}</Text>
                );
            else return null;
        });
    };
    validVIN(str) {
        console.log('validity chk on ' + str + 'reutrns ' + str.match(".*[A-Z].*"))
        return str.match("^[A-Z0-9]{16}");
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },

});
