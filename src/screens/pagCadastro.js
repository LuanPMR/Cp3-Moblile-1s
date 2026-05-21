import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import { UserContext } from "../context/UserContext";
import cepService from "../services/cepService";


export default function pagCadastro({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState(user.nome);
  const [studentId, setStudentId] = useState(user.rm);
  const [cep, setCep] = useState(user.cep);
  const [address, setAddress] = useState(user.endereco);
  const [photoUri, setPhotoUri] = useState(user.foto);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({ nome: '', rm: '', cep: '' });
  const cepTimeout = useRef(null);

  
  useEffect(() => {
    const cleaned = String(cep).replace(/\D/g, '');
    if (cleaned.length !== 8) return;
    if (cepTimeout.current) clearTimeout(cepTimeout.current);
    cepTimeout.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await cepService.getAddressByCep(cleaned);
        setAddress(data);
        setErrors(prev => ({ ...prev, cep: '' }));
      } catch (err) {
        setErrors(prev => ({ ...prev, cep: err.message || 'Falha ao buscar CEP' }));
        Alert.alert('Erro', err.message || 'Falha ao buscar CEP');
      } finally {
        setLoading(false);
      }
    }, 800);
    return () => {
      if (cepTimeout.current) clearTimeout(cepTimeout.current);
    };
  }, [cep]);

  
  const handleBuscarCEP = async () => {
    const cleaned = String(cep).replace(/\D/g, "");
    if (cleaned.length !== 8) {
      setErrors(prev => ({ ...prev, cep: 'CEP deve ter 8 dígitos' }));
      Alert.alert("CEP inválido", "Digite um CEP com 8 dígitos.");
      return;
    }
    setLoading(true);
    try {
      const data = await cepService.getAddressByCep(cleaned);
      setAddress(data);
      setErrors(prev => ({ ...prev, cep: '' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, cep: err.message || 'Falha ao buscar CEP' }));
      Alert.alert("Erro", err.message || "Falha ao buscar CEP");
    } finally {
      setLoading(false);
    }
  };

 
  const handleOpenCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Permissão para usar a câmera foi negada."
        );
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.6,
        allowsEditing: true,
      });
      console.log('Resultado câmera:', JSON.stringify(result, null, 2));
      
     
      if (result.cancelled || result.canceled) {
        Alert.alert('Cancelado', 'A captura da câmera foi cancelada.');
        return;
      }

      const photoUri = result.uri || (result.assets && result.assets[0] && result.assets[0].uri);
      if (photoUri) {
        console.log('Foto salva:', photoUri);
        setPhotoUri(photoUri);
      } else {
        console.warn('Nenhum URI encontrado:', result);
        Alert.alert('Erro', 'Nenhuma foto foi capturada.');
      }
    } catch (err) {
      console.error('Erro câmera:', err);
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
    }
  };

 
  const handleSave = async () => {
    const currentErrors = { nome: '', rm: '', cep: '' };
    if (!fullName || !fullName.trim()) currentErrors.nome = 'Nome obrigatório';
    if (!studentId || !studentId.trim()) currentErrors.rm = 'RM obrigatório';
    const cleanedCep = String(cep).replace(/\D/g, '');
    if (cleanedCep && cleanedCep.length !== 8) currentErrors.cep = 'CEP inválido';

    setErrors(currentErrors);

    if (currentErrors.nome || currentErrors.rm || currentErrors.cep) {
      Alert.alert('Erros nos campos', 'Corrija os campos destacados antes de salvar.');
      return;
    }

    const newUser = {
      nome: fullName.trim(),
      rm: studentId.trim(),
      cep: cleanedCep,
      endereco: address,
      foto: photoUri,
    };

    setSaving(true);
    try {
      await setUser(newUser);
      navigation.navigate("Perfil");
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <HeaderSection title="Perfil Acadêmico" subtitle="Atualize seus dados acadêmicos" />

        <ProfileCard>
          <AppInput
            label="Nome completo"
            value={fullName}
            onChangeText={text => { setFullName(text); if (errors.nome) setErrors(prev => ({ ...prev, nome: '' })); }}
            placeholder="Nome completo"
            leftIcon="👤"
            error={errors.nome}
          />

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <AppInput
                label="Seu RM"
                value={studentId}
                onChangeText={text => { setStudentId(text); if (errors.rm) setErrors(prev => ({ ...prev, rm: '' })); }}
                placeholder="Seu RM"
                leftIcon="#"
                error={errors.rm}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <AppInput
                label="CEP"
                value={cep}
                onChangeText={text => { setCep(text); if (errors.cep) setErrors(prev => ({ ...prev, cep: '' })); }}
                placeholder="00000-000"
                keyboardType="numeric"
                leftIcon="📮"
                rightElement={<AppButton title="Buscar" onPress={handleBuscarCEP} variant="outline" style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 14 }} />}
                error={errors.cep}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.photoCard} onPress={handleOpenCamera} activeOpacity={0.8}>
            <Text style={styles.photoLabel}>📷 Capturar Foto</Text>
            {photoUri ? <Image source={{ uri: photoUri }} style={styles.photoPreview} /> : null}
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator style={{ marginTop: 12 }} />
          ) : (
            <View style={{ width: '100%', marginTop: 8 }}>
              <ProfileCard title="Endereço" icon="📍">
                <Text style={{ color: '#0F172A', fontWeight: '600' }}>{address.rua}</Text>
                <Text style={{ color: '#475569' }}>{address.bairro} - {address.cidade}/{address.estado}</Text>
              </ProfileCard>
            </View>
          )}

          <View style={{ height: 8 }} />
          <AppButton title={saving ? 'Salvando...' : 'Salvar cadastro'} onPress={handleSave} loading={saving} style={{ width: '100%' }} />
        </ProfileCard>

        {saving ? <ActivityIndicator style={{ marginTop: 12 }} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  rowInputs: { flexDirection: 'row', marginTop: 8, alignItems: 'flex-start' },
  photoCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoLabel: { fontWeight: '700', color: '#0F172A' },
  photoPreview: { width: 88, height: 88, borderRadius: 44, marginTop: 8 },
});
