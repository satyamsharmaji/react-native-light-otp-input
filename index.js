import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Keyboard } from "react-native";

const OtpPinInput = (props) => {
  const [focus, setFocus] = useState(0);
  const [showBlinkingLine, setBlinkingLine] = useState(true);
  const [inputFilled, setInputFilled] = useState(-1);

  useEffect(() => {
    const KeyboardShowEvent = Keyboard.addListener("keyboardDidShow", () => {
      setFocus(props.value.length - 1);
    });
    const KeyboardHideEvent = Keyboard.addListener("keyboardDidHide", () => {
      setFocus(-1);
    });
    setFocus(props.value.length - 1);
    setInputFilled(props.value.length - 1);
    return () => {
      KeyboardShowEvent.remove();
      KeyboardHideEvent.remove();
    };
  }, [props.value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkingLine((showBlinkingLine) => !showBlinkingLine);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: 40,
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          position: "absolute",
          zIndex: 9,
        }}
      >
        {Array.from({ length: props.pin }).map((item, index) => {
          return (
            <View
              key={index + "_input"}
              style={{
                width: 40,
                height: 40,
                borderWidth: focus === index ? 2 : 1,
                borderColor: "#000",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: inputFilled >= index ? "#ccc" : "transparent",
                // borderBottomColor: focus === index ? "red" : '#000',
                // borderBottomWidth: focus === index ? 2 : 1
              }}
            >
              <Text>{props.value[index]}</Text>
            </View>
          );
        })}
      </View>
      <TextInput
        autoFocus
        caretHidden={true}
        value={props.value}
        onChangeText={(text) => {
          props.onChange(text);
          if (text.length == props.pin) {
            props.onFilled();
          }
        }}
        style={{
          width: "100%",
          height: 40,
          opacity: 0,
        }}
        maxLength={props.pin}
        keyboardType={"number-pad"}
      />
    </View>
  );
};
export default OtpPinInput;
