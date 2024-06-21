import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated } from 'react-native';
import { generateNumbersFrom, isSpecialChar } from './utils/digits';

interface DigitProps {
  digit: string;
}

const Digit = ({ digit }: DigitProps) => {
  const cachedDigit = useRef<string>(digit);
  const transition = useRef(new Animated.Value(0)).current;
  const [topDigits, setTopDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), true)
  );
  const [bottomDigits, setBottomDigits] = useState<number[]>(
    generateNumbersFrom(Number(digit), false)
  );

  useEffect(() => {
    if (!isSpecialChar(digit) && digit !== cachedDigit.current) {
      const topIndex = topDigits.findIndex((val) => val === Number(digit));
      const bottomIndex = bottomDigits.findIndex(
        (val) => val === Number(digit)
      );

      if (topIndex < bottomIndex) {
        Animated.timing(transition, {
          toValue: (topIndex + 1) * 24,
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
          toValue: -(bottomIndex + 1) * 24,
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
        {
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
        },
        {
          transform: [{ translateY: transition }],
        },
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
          fontSize: 24,
        }}
      >
        {cachedDigit.current}
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
