# react-native-money-animation

React Native package for money animation

<img src="https://github.com/PrimeWeb-Ltd/react-native-money-animation/blob/main/example.gif" height="400"/>

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

## API

### value
Type: Number

Required: True

Default: -

The amount value to be presented

### style
Type: StyleProp<TextStyle>

Required: False

Default: { fontSize: 24, lineHeight: 32 }

Style prop for every digit/symbol

### wrapperStyle
Type: StyleProp<ViewStyle>

Required: False

Default: -

Style prop for the view wrapper of the amount

### separator
Type: String

Required: false

Default: ','

Money separator symbol, useful to change to dot or use default comma.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
