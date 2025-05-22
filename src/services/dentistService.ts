import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dentist } from '../types/types';

const STORAGE_KEY = '@dentists';

export const dentistService = {
  async getAll(): Promise<Dentist[]> {
    try {
      const response = await api.get<Dentist[]>('/dentistas');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as Dentist[];
      }
      throw new Error('Não foi possível carregar dentistas');
    }
  },

  async getById(id: number): Promise<Dentist> {
    const response = await api.get<Dentist>(`/dentistas/${id}`);
    return response.data;
  },

  async create(dentist: Omit<Dentist, 'dentistaId'>): Promise<Dentist> {
    const response = await api.post<Dentist>('/dentistas', dentist);
    return response.data;
  },

  async update(id: number, dentist: Omit<Dentist, 'dentistaId'>): Promise<Dentist> {
    const response = await api.put<Dentist>(`/dentistas/${id}`, dentist);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/dentistas/${id}`);
  },
};
