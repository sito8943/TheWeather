import {
  type StyleProp,
  type TextInputProps as RNTextInputProps,
  type TextStyle,
} from "react-native"

export type TextInputProps = Omit<RNTextInputProps, "style"> & {
  style?: StyleProp<TextStyle>
}
