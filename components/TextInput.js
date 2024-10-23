import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { View } from './View';
import { Icon } from './Icon';
import { Button } from './Button';
import { Colors } from '../config';

export const TextInput = ({
  width = '100%',
  left,
  right,
  handlePasswordVisibility,
  ...otherProps
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: 8,
        flexDirection: 'row',
        padding: 12,
        marginVertical: 12,
        width,
        borderWidth: 1,
        borderColor: Colors.mediumGray
      }}
    
    >
      {/* {left ? (
        // <Icon
        //   name={left}
        //   size={22}
        //   color={Colors.mediumGray}
        //   style={{ marginRight: 10 }}
        // />
      ) : null} */}
      <RNTextInput
        style={{
          flex: 1,
          width: '100%',
          fontSize: 18,
          color: Colors.black
        }}
        placeholderTextColor={Colors.mediumGray}
        {...otherProps}
      />
      {right ? (
        <Button onPress={handlePasswordVisibility}>
          <Icon
            name={right}
            size={22}
            color={Colors.mediumGray}
            style={{ marginRight: 10 }}
          />
        </Button>
      ) : null}
    </View>
  );
};
