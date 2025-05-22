import api from './api';
import { Atendimento } from '../types/types';

export const atendimentoService = {
  getAll: async (userId: number): Promise<Atendimento[]> => {
    const response = await api.get(`/atendimentos/usuario/${userId}`);
    return response.data;
  },

  getById: async (id: number): Promise<Atendimento> => {
    const response = await api.get(`/atendimentos/${id}`);
    return response.data;
  },

  create: async (
    atendimento: Omit<Atendimento, 'atendimentoId' | 'dataRegistro'>
  ): Promise<Atendimento> => {
    const response = await api.post('/atendimentos', atendimento);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/atendimentos/${id}`);
  },

  createWithImage: async (
    atendimento: Omit<Atendimento, 'atendimentoId' | 'dataRegistro'>,
    imagem?: any
  ): Promise<Atendimento> => {
    const formData = new FormData();

    // 🔸 Atendimento como JSON (string pura)
    formData.append('atendimento', JSON.stringify(atendimento));

    // 🔸 Se tiver imagem
    if (imagem) {
      formData.append('imagem', {
        uri: imagem.uri,
        name: imagem.fileName || 'foto.jpg',
        type: imagem.mimeType || 'image/jpeg',
      } as any);
    }

    const response = await api.post('/atendimentos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
