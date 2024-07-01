import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import Digit from './Digit';

interface MoneyAnimationProps {
  value: number;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  separator?: string;
}

const MoneyAnimation = ({
  value,
  wrapperStyle,
  style,
  separator,
}: MoneyAnimationProps) => {
  const [numbers, setNumbers] = useState<string[]>(
    value.toFixed(2).split('').reverse()
  );

  useEffect(() => {
    setNumbers(value.toFixed(2).split('').reverse());
  }, [value]);

  return (
    <View
      style={[
        {
          flexDirection: 'row-reverse',
          overflow: 'hidden',
        },
        wrapperStyle,
      ]}
    >
      {numbers.map((num, index) => {
        return (
          <Digit
            key={index}
            digit={num}
            style={style}
            separator={separator || ','}
          />
        );
      })}
    </View>
  );
};

export default MoneyAnimation;
