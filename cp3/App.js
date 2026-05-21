import { NavigationContainer } from "@react-navigation/native";
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { UserProvider } from "./src/context/UserContext";
import AppNavigator from "./src/navigation/AppNavigator";

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
AppRegistry.registerComponent('main', () => App);
