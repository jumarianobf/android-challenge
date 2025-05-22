import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
}

const STORAGE_KEY = '@user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário salvo no AsyncStorage quando o app abre
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem(STORAGE_KEY);
        if (userData) {
          setUserState(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Função para setar o usuário e salvar no AsyncStorage
  const setUser = async (user: User | null) => {
    try {
      setUserState(user);
      if (user) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Erro ao salvar usuário no AsyncStorage:', error);
    }
  };

  // Logout limpa o AsyncStorage e o estado
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUserState(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
