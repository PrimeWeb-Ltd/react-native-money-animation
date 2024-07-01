import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import { generateNumbersFrom, isSpecialChar } from './utils/digits';

interface DigitProps {
  digit: string;
  style: StyleProp<TextStyle>;
  separator?: string;
}

const Digit = ({ digit, style, separator }: DigitProps) => {
  const cachedDigit = useRef<string>(digit);
  const transition = useRef(new Animated.Value(0)).current;
  const [topDigits, setTopDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), true)
  );
  const [bottomDigits, setBottomDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), false)
  );
  const fontSize = StyleSheet.flatten(style)?.fontSize || 24;

  useEffect(() => {
    if (!isSpecialChar(digit) && digit !== cachedDigit.current) {
      const topIndex = topDigits.findIndex((val) => val === Number(digit));
      const bottomIndex = bottomDigits.findIndex(
        (val) => val === Number(digit)
      );

      if (topIndex < bottomIndex) {
        Animated.timing(transition, {
          toValue: (topIndex + 1) * fontSize,
          duration: 600,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            cachedDigit.current = digit;
            setTopDigits(generateNumbersFrom(Number(digit), true));
            setBottomDigits(generateNumbersFrom(Number(digit), false));
            transition.setValue(0);
          }
        });
      } else {
        Animated.timing(transition, {
          toValue: -(bottomIndex + 1) * fontSize,
          duration: 600,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            cachedDigit.current = digit;
            setTopDigits(generateNumbersFrom(Number(digit), true));
            setBottomDigits(generateNumbersFrom(Number(digit), false));
            transition.setValue(0);
          }
        });
      }
    }
  }, [digit]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Animated.View
      style={[
        initialStyles.wrapper,
        {
          width: isSpecialChar(digit)
            ? (fontSize * 32) / 100
            : (fontSize * 62) / 100,
        },
        {
          transform: [{ translateY: transition }],
        },
      ]}
    >
      {topDigits.map((n, i) => (
        <Text
          style={[
            style,
            {
              position: 'absolute',
              top: -(fontSize * (i + 1)),
              fontSize: fontSize,
            },
          ]}
          key={n}
        >
          {n}
        </Text>
      ))}
      <Text
        style={[
          style,
          {
            fontSize: fontSize,
          },
        ]}
      >
        {isSpecialChar(digit) ? separator : cachedDigit.current}
      </Text>
      {bottomDigits.map((n, i) => (
        <Text
          style={[
            style,
            {
              fontSize: fontSize,
              position: 'absolute',
              bottom: -(fontSize * (i + 1)),
            },
          ]}
          key={n}
        >
          {n}
        </Text>
      ))}
    </Animated.View>
  );
};

const initialStyles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Digit;
