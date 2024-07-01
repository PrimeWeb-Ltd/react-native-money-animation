# react-native-money-animation

React Native package for money animation

![](https://github.com/PrimeWeb-Ltd/react-native-money-animation/blob/main/example.gif)

## Installation

```sh
npm install react-native-money-animation
```
or
```sh
yarn add react-native-money-animation
```


## Usage

```tsx
import MoneyAnimation from 'react-native-money-animation';

const App = () => {
  const [value, setValue] = useState<number>(329.06);

  return (
    <MoneyAnimation value={value} style={{
      fontSize: 52,
      fontWeight: 700,
      lineHeight: 60,
      color: '#fff'
    }} />
  )
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
