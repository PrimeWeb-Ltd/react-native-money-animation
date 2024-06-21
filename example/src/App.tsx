import React, { useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MoneyAnimation from 'react-native-money-animation';

export default function App() {
  const [value, setValue] = useState<number>(329.06);

  return (
    <View style={styles.container}>
      <MoneyAnimation value={value} />

      <View>
        <TouchableOpacity
          onPress={() => {
            setValue(341.06);
          }}
        >
          <Text>Go to 341.06</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(220.4);
          }}
        >
          <Text>Go to 220.40</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(220.62);
          }}
        >
          <Text>Go to 220.62</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(1493.41);
          }}
        >
          <Text>Go to 1493.41</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(20.62);
          }}
        >
          <Text>Go to 20.62</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
