import React from 'react';
import { View, TextInput, Text } from 'react-native';

const OtpPinInput = (props) => {
    return (
        <View>
            {Array.from({ length: props.pin }).map((index) => {
                return (
                    <View>
                        <Text>{props.value[index]}</Text>
                    </View>
                )
            })}
            <TextInput
                value={props.value}
                onChangeText={(text) => props.onChangeText(text)}
                style={{
                    width: '100%',
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#000'
                }} />
        </View>
    )
}
export default OtpPinInput