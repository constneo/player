import {useTheme} from '@react-navigation/native';
import {TextInput, TextInputProps} from 'react-native';

export default function ({style, ...props}: TextInputProps) {
  const {colors} = useTheme();
  return (
    <TextInput style={[{color: colors.text, height: 40}, style]} {...props} />
  );
}
