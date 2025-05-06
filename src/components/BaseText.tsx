import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface ThemedTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

export default function ({style, ...props}: ThemedTextProps) {
  const {colors} = useTheme();
  return <Text style={[{color: colors.text}, style]} {...props} />;
}
