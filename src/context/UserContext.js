import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const STORAGE_KEY = "@user_profile_v1";

export const UserProvider = ({ children }) => {
  
  const [user, setProfileState] = useState({
    nome: "",
    rm: "",
    cep: "",
    endereco: { rua: "", bairro: "", cidade: "", estado: "" },
    foto: null,
  });

  
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setProfileState(JSON.parse(raw));
        }
      } catch (err) {
        console.warn("Falha ao carregar perfil persistido", err);
      }
    })();
  }, []);

  
  const setUser = async (newUser) => {
    setProfileState(newUser);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (err) {
      console.warn("Falha ao salvar perfil", err);
    }
  };

  
  const clearUser = async () => {
    const empty = { nome: "", rm: "", cep: "", endereco: { rua: "", bairro: "", cidade: "", estado: "" }, foto: null };
    setProfileState(empty);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("Falha ao limpar perfil", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
