import { StyleSheet, Text, View } from 'react-native';

export default function ProfileCard({ title, children, style, icon }) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.rowHeader}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginBottom: 12,
  },
  rowHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { marginRight: 8, fontSize: 18 },
  title: { fontWeight: '700', color: '#0F172A' },
  content: {},
});
