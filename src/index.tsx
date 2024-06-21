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

  useEffect(() => {
    setNumbers(value.toFixed(2).split('').reverse());
  }, [value]);

  return (
    <View
      style={{
        flexDirection: 'row-reverse',

        overflow: 'hidden',
      }}
    >
      {numbers.map((num, index) => {
        return <Digit key={index} digit={num} />;
      })}
    </View>
  );
};

export default MoneyAnimation;
