import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const Icon = ({ name, size, color, style }) => {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};
