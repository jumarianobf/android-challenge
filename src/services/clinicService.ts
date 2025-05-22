import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Clinic {
  telefoneClinica: string;
  enderecos: any;
  clinicaId: number;
  nomeClinica: string;
  telefone: string;
  email: string;
  endereco: string;
  horarioFuncionamento: string;
  latitude?: string;
  longitude?: string;
}

const STORAGE_KEY = '@clinics';

export const clinicService = {
  async getAll(): Promise<Clinic[]> {
    try {
      const response = await api.get<Clinic[]>('/clinicas');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as Clinic[];
      }
      throw new Error('Não foi possível carregar clínicas');
    }
  },

  async getById(id: number): Promise<Clinic> {
    const response = await api.get<Clinic>(`/clinicas/${id}`);
    return response.data;
  },

  async create(clinic: Omit<Clinic, 'clinicaId'>): Promise<Clinic> {
    const response = await api.post<Clinic>('/clinicas', clinic);
    return response.data;
  },

  async update(id: number, clinic: Omit<Clinic, 'clinicaId'>): Promise<Clinic> {
    const response = await api.put<Clinic>(`/clinicas/${id}`, clinic);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/clinicas/${id}`);
  },
};
