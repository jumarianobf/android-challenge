import api from './api';
import { ImagemUsuario, PrevisaoUsuario } from '../types/types';

export const imagemService = {
  upload: async (usuarioId: number, file: FormData): Promise<ImagemUsuario> => {
    const response = await api.post(`/imagens/usuario/${usuarioId}`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  listByUser: async (usuarioId: number): Promise<ImagemUsuario[]> => {
    const response = await api.get(`/imagens/usuario/${usuarioId}`);
    return response.data;
  },
};

export const previsaoService = {
  getByImagem: async (imagemId: number): Promise<PrevisaoUsuario[]> => {
    const response = await api.get(`/previsoes/imagem/${imagemId}`);
    return response.data;
  },

  getByUsuario: async (usuarioId: number): Promise<PrevisaoUsuario[]> => {
    const response = await api.get(`/previsoes/usuario/${usuarioId}`);
    return response.data;
  },
};
