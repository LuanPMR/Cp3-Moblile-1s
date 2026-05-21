import { Image, StyleSheet, Text, View } from 'react-native';

export default function DevCard({ photo, name, rm, role = 'Desenvolvedor', style }) {
  return (
    <View style={[styles.card, style]}>
      {photo ? <Image source={photo} style={styles.photo} /> : <View style={styles.placeholder} />}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>RM: {rm}</Text>
        <Text style={styles.meta}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  photo: { width: 72, height: 72, borderRadius: 12 },
  placeholder: { width: 72, height: 72, borderRadius: 12, backgroundColor: '#f1f5f9' },
  info: { marginLeft: 12, flex: 1 },
  name: { fontWeight: '700', color: '#0F172A' },
  meta: { color: '#475569', marginTop: 2 },
});
