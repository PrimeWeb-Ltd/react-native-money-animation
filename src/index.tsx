import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  EasingFunction,
} from 'react-native';
import Digit from './Digit';

interface MoneyAnimationProps {
  value: number;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  separator?: string;
  easing?: EasingFunction;
  duration?: number;
}

const MoneyAnimation = ({
  value,
  wrapperStyle,
  style,
  separator,
  easing,
  duration,
}: MoneyAnimationProps) => {
  const [numbers, setNumbers] = useState<string[]>(
    value.toFixed(2).split('').reverse()
  );

  useEffect(() => {
    setNumbers(value.toFixed(2).split('').reverse());
  }, [value]);

  return (
    <View style={[initialStyles.container, wrapperStyle]}>
      {numbers.map((num, index) => {
        return (
          <Digit
            key={index}
            digit={num}
            style={style}
            separator={separator || ','}
            easing={easing}
            duration={duration}
          />
        );
      })}
    </View>
  );
};

const initialStyles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    overflow: 'hidden',
  },
});

export default MoneyAnimation;
