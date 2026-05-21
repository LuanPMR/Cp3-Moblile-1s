import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function AppInput({ label, value, onChangeText, placeholder, leftIcon, rightElement, keyboardType, secureTextEntry, style, error }) {
  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        {leftIcon ? <Text style={styles.leftIcon}>{leftIcon}</Text> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          placeholderTextColor="#94a3b8"
        />
        {rightElement ? <View style={styles.right}>{rightElement}</View> : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%', marginTop: 8 },
  label: { fontSize: 12, color: '#0F172A', marginBottom: 6, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 18,
    height: 52,
    borderWidth: 1,
    borderColor: '#e6eef9',
  },
  leftIcon: { marginRight: 8, fontSize: 18 },
  input: { flex: 1, color: '#0F172A' },
  right: { marginLeft: 8 },
  inputError: { borderColor: '#EF4444' },
  errorText: { color: '#EF4444', marginTop: 6, fontSize: 12 },
});
