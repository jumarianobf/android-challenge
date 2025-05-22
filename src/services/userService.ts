
import { User } from '../types/types';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@users';

export const userService = {
  // ✅ Buscar todos os usuários
  async getAll(): Promise<User[]> {
    try {
      const response = await api.get<User[]>('/usuarios');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        console.warn('Retornando usuários do cache local');
        return JSON.parse(cached) as User[];
      }
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Não foi possível carregar usuários');
    }
  },

  // ✅ Buscar usuário por ID
  async getById(id: number): Promise<User> {
    try {
      const response = await api.get<User>(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário com id ${id}:`, error);
      throw new Error('Usuário não encontrado');
    }
  },

  // ✅ Criar novo usuário
  async create(user: Omit<User, 'usuarioId'>): Promise<User> {
    try {
      const response = await api.post<User>('/usuarios', user);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Não foi possível criar o usuário');
    }
  },

  // ✅ Atualizar usuário
  async update(id: number, user: Omit<User, 'usuarioId'>): Promise<User> {
    try {
      const response = await api.put<User>(`/usuarios/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw new Error('Não foi possível atualizar o usuário');
    }
  },

  // ✅ Deletar usuário
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}:`, error);
      throw new Error('Não foi possível deletar o usuário');
    }
  },

  // ✅ Buscar usuário pelo CPF (para login)
  async getByCpf(cpf: string): Promise<User> {
    try {
      const response = await api.get<User>(`/usuarios/cpf/${cpf}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário pelo CPF ${cpf}:`, error);
      throw new Error('CPF não encontrado');
    }
  },
};
