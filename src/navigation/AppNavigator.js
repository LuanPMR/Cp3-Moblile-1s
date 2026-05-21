import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import pagCadastro from "../screens/pagCadastro";
import PagDev from "../screens/PagDev";
import pagPerfil from "../screens/pagPerfil";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Cadastro"
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff', shadowColor: 'transparent', elevation: 0 },
        headerTitleAlign: 'center',
        headerTintColor: '#0F172A',
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Cadastro" component={pagCadastro} options={{ title: 'Cadastro' }} />
      <Stack.Screen name="Perfil" component={pagPerfil} options={{ title: 'Perfil' }} />
      <Stack.Screen name="Dev" component={PagDev} options={{ title: 'Equipe' }} />
    </Stack.Navigator>
  );
}
