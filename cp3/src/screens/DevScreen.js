import { Animated, FlatList, SafeAreaView, StyleSheet } from "react-native";
import DevCard from '../../components/DevCard';
import HeaderSection from '../../components/HeaderSection';
import { Colors } from '../../constants/theme';

const team = [
  { name: "Luan Peixoto Marins Rocha", rm: "562258", photo: require('../../assets/equipe/luan.jpg') },

];

export default function DevScreen() {
  const anim = new Animated.Value(0);
  Animated.timing(anim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <FlatList
        contentContainerStyle={styles.container}
        data={team}
        keyExtractor={(item) => item.rm}
        ListHeaderComponent={() => <HeaderSection title="Equipe do Projeto" />}
        renderItem={({ item, index }) => (
          <Animated.View style={{ opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }}>
            <DevCard photo={item.photo} name={item.name} rm={item.rm} />
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});
