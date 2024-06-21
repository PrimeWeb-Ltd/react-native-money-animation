import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Digit from './Digit';

interface MoneyAnimationProps {
  value: number;
}

const MoneyAnimation = ({ value }: MoneyAnimationProps) => {
  const [numbers, setNumbers] = useState<string[]>(
    value.toFixed(2).split('').reverse()
  );
  const newValueNumbers = value.toFixed(2).split('').reverse();
  console.log(numbers, 'value---');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumbers(value.toFixed(2).split('').reverse());
    }, 700);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [value]);

  return (
    <View
      style={{
        flexDirection: 'row-reverse',
        backgroundColor: 'red',
        overflow: 'hidden',
      }}
    >
      {numbers.map((num, index) => {
        return (
          <Digit key={index} digit={num} newDigit={newValueNumbers[index]} />
        );
      })}
    </View>
  );
};

export default MoneyAnimation;
