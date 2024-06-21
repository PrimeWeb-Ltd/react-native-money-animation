import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { generateNumbersFrom, isSpecialChar } from './utils/digits';

interface DigitProps {
  digit: string;
  newDigit?: string;
}

const Digit = ({ digit, newDigit }: DigitProps) => {
  const offset = useSharedValue(0);
  const [topDigits, setTopDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), true)
  );
  const [bottomDigits, setBottomDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), false)
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  useEffect(() => {
    if (digit === newDigit) {
      setTopDigits(generateNumbersFrom(Number(newDigit), true));
      setBottomDigits(generateNumbersFrom(Number(newDigit), false));
      offset.value = withTiming(0, { duration: 1 });
    }
  }, [digit, newDigit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isSpecialChar(digit) && digit !== newDigit) {
      const topIndex = topDigits.findIndex((val) => val === Number(newDigit));
      const bottomIndex = bottomDigits.findIndex(
        (val) => val === Number(newDigit)
      );

      if (topIndex < bottomIndex) {
        offset.value = withTiming((topIndex + 1) * 24, { duration: 600 });
      } else {
        offset.value = withTiming(-(bottomIndex + 1) * 24, { duration: 600 });
      }
    }
  }, [digit, newDigit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View
      style={[
        {
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
        },
        animatedStyles,
      ]}
    >
      {topDigits.map((n, i) => (
        <Text
          style={{
            position: 'absolute',
            top: -(24 * (i + 1)),
            fontSize: 24,
          }}
          key={n}
        >
          {n}
        </Text>
      ))}
      <Text
        style={{
          // backgroundColor: 'yellow',
          fontSize: 24,
        }}
      >
        {digit}
      </Text>
      {bottomDigits.map((n, i) => (
        <Text
          style={{
            position: 'absolute',
            fontSize: 24,
            bottom: -(24 * (i + 1)),
          }}
          key={n}
        >
          {n}
        </Text>
      ))}
    </Animated.View>
  );
};

export default Digit;
