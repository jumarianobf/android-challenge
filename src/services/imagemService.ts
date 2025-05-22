// services/imagemService.ts

import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://192.168.15.9:8080/api/imagens'; // ✅ Altere para seu IP local

export const imagemService = {
  async escolherImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      return img;
    }

    return null;
  },

  async uploadImagem(uri: string, usuarioId: number) {
    const formData = new FormData();

    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('file', {
      uri,
      name: filename,
      type,
    } as any);

    formData.append('usuarioId', usuarioId.toString());

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },

  async listarImagens(usuarioId: number) {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`);
    return response.data;
  },
};
