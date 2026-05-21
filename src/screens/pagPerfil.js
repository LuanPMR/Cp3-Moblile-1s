import { useContext } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import AppButton from '../../components/AppButton';
import ProfileCard from '../../components/ProfileCard';
import { ThemedText } from '../../components/themed-text';
import { Colors } from '../../constants/theme';
import { UserContext } from "../context/UserContext";


export default function pagPerfil({ navigation }) {
  const { user, setUser, clearUser } = useContext(UserContext);

  console.log('User no Perfil:', JSON.stringify(user, null, 2));

  const handleClear = async () => {
    Alert.alert('Confirmar', 'Deseja limpar os dados do usuário?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'OK', onPress: async () => { if (clearUser) await clearUser(); else await setUser({ nome: '', rm: '', cep: '', endereco: { rua: '', bairro: '', cidade: '', estado: '' }, foto: null }); } }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBlock}>
          <View style={styles.headerColor} />
          <View style={styles.avatarWrap}>
            {user?.foto ? (
              <Image source={{ uri: user.foto }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <ThemedText>Sem foto</ThemedText>
              </View>
            )}
          </View>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.name}>{user.nome || 'Sem nome cadastrado'}</Text>
          <View style={{ height: 8 }} />

          <View style={styles.badgeRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>RM {user.rm || '-'}</Text></View>
          </View>

          <ProfileCard title="Informações Acadêmicas" icon="🎓">
            <Text style={{ color: '#0F172A', fontWeight: '600' }}>{user.nome}</Text>
            <Text style={{ color: '#475569', marginTop: 4 }}>RM: {user.rm}</Text>
          </ProfileCard>

          <ProfileCard title="Endereço" icon="📍">
            <Text style={{ color: '#0F172A', fontWeight: '600' }}>{user.endereco?.rua}</Text>
            <Text style={{ color: '#475569', marginTop: 4 }}>{user.endereco?.bairro} - {user.endereco?.cidade}/{user.endereco?.estado}</Text>
          </ProfileCard>

          <View style={{ height: 8 }} />
          <AppButton title="Ver Desenvolvedor" onPress={() => navigation.navigate('Dev')} variant="outline" style={{ marginBottom: 12 }} icon="👥" />
          <AppButton title="Apagar Perfil" onPress={handleClear} variant="outline" icon="🗑️" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 0 },
  headerBlock: { height: 200, position: 'relative' },
  headerColor: { backgroundColor: '#2563EB', height: '100%' },
  avatarWrap: { position: 'absolute', left: 0, right: 0, top: 120, alignItems: 'center' },
  avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 6, borderColor: '#fff' },
  placeholder: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  mainContent: { padding: 16, marginTop: 36 },
  name: { fontSize: 20, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
  badgeRow: { alignItems: 'center', marginTop: 8 },
  badge: { backgroundColor: '#06B6D4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#fff', fontWeight: '700' },
});
