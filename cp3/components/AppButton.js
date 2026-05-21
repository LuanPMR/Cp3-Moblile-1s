import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AppButton({ title, onPress, variant = 'solid', disabled, loading, style, icon }) {
  const isOutline = variant === 'outline';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, isOutline ? styles.outline : styles.solid, disabled ? styles.disabled : null, style]}
    >
      <View style={styles.content}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={[styles.text, isOutline ? styles.textOutline : null]}>{loading ? 'Carregando...' : title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  solid: {
    backgroundColor: '#2563EB',
  },
  outline: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6e9ef',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  textOutline: {
    color: '#0F172A',
  },
  content: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 6 },
});
