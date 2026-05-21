import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import CadastroScreen from "../screens/CadastroScreen";
import DevScreen from "../screens/DevScreen";
import PerfilScreen from "../screens/PerfilScreen";

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
      <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil' }} />
      <Stack.Screen name="Dev" component={DevScreen} options={{ title: 'Equipe' }} />
    </Stack.Navigator>
  );
}
