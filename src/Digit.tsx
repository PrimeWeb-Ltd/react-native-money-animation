import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, StyleSheet, Easing } from 'react-native';
import type { StyleProp, TextStyle, EasingFunction } from 'react-native';
import { generateNumbersFrom, isSpecialChar } from './utils/digits';
import { PixelRatio } from 'react-native';

interface DigitProps {
  digit: string;
  style: StyleProp<TextStyle>;
  separator?: string;
  duration?: number;
  easing?: EasingFunction;
}

const Digit = ({ digit, style, separator, easing, duration }: DigitProps) => {
  const cachedDigit = useRef<string>(digit);
  const transition = useRef(new Animated.Value(0)).current;
  const [topDigits, setTopDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), true)
  );
  const [bottomDigits, setBottomDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), false)
  );
  const fontScale = PixelRatio.getFontScale();
  const flattenStyle = StyleSheet.flatten(style) || {};
  const fontSize = flattenStyle.fontSize || 24;
  const lineHeight = (flattenStyle.lineHeight || 32) * fontScale;

  useEffect(() => {
    if (!isSpecialChar(digit) && digit !== cachedDigit.current) {
      const topIndex = topDigits.findIndex((val) => val === Number(digit));
      const bottomIndex = bottomDigits.findIndex(
        (val) => val === Number(digit)
      );

      if (topIndex < bottomIndex) {
        Animated.timing(transition, {
          toValue: (topIndex + 1) * lineHeight,
          duration: duration || 1200,
          useNativeDriver: true,
          easing: easing || Easing.out(Easing.exp),
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
          toValue: -(bottomIndex + 1) * lineHeight,
          duration: duration || 1200,
          useNativeDriver: true,
          easing: easing || Easing.out(Easing.exp),
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
            ? ((fontSize * 32) / 100) * fontScale
            : ((fontSize * 62) / 100) * fontScale,
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
              top: -(lineHeight * (i + 1)),
              fontSize: fontSize,
              lineHeight: lineHeight,
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
            lineHeight: lineHeight,
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
              lineHeight: lineHeight,
              position: 'absolute',
              bottom: -(lineHeight * (i + 1)),
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
