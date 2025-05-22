import axios from 'axios';

// Update this URL to match your backend
const API_URL = 'http://192.168.15.9:8080/api/assistente-odontologico';

// Increase timeout for AI requests
const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // Increase to 60 seconds for AI operations
});

export interface Mensagem {
  tipo: 'usuario' | 'assistente';
  conteudo: string;
  dataProcessamento?: string;
}

export interface ChatResponse {
  resposta: string;
  historicoAtualizado: Mensagem[];
  erro: string | null;
}

export const chatService = {
  async enviarPergunta(pergunta: string, historico: Mensagem[]) {
    try {
      console.log('Enviando pergunta:', pergunta);
      console.log('Histórico atual:', JSON.stringify(historico));
      
      // Convert local message format to backend format if needed
      const historicoFormatado = historico.map(msg => ({
        tipo: msg.tipo,
        conteudo: msg.conteudo,
        dataProcessamento: msg.dataProcessamento || new Date().toISOString()
      }));
      
      // Check server health before sending the actual request
      try {
        await api.get('/health', { timeout: 5000 });
      } catch (healthError) {
        console.error('Servidor não está respondendo ao health check:', healthError);
        return {
          resposta: 'Servidor indisponível',
          historicoAtualizado: historico,
          erro: 'O servidor não está respondendo. Verifique sua conexão ou tente novamente mais tarde.'
        };
      }
      
      // Send both the question and history to the backend
      const response = await api.post<ChatResponse>('/chat', {
        pergunta,
        historico: historicoFormatado
      });
      
      console.log('Resposta recebida:', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      // Enhanced error logging
      if (axios.isAxiosError(error)) {
        console.error('Erro na requisição:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            timeout: error.config?.timeout
          }
        });
        
        // Return a structured error response with more specific messages
        let errorMessage = 'Erro ao se comunicar com o servidor';
        
        if (error.message.includes('timeout')) {
          errorMessage = 'O servidor está demorando muito para responder. Isso pode acontecer quando o modelo de IA está processando uma pergunta complexa. Por favor, tente novamente.';
        } else if (error.response?.status === 404) {
          errorMessage = 'Endpoint não encontrado. Verifique a URL da API.';
        } else if (error.response?.status === 500) {
          errorMessage = 'Erro interno no servidor. Por favor, contate o suporte.';
        }
        
        return {
          resposta: errorMessage,
          historicoAtualizado: historico,
          erro: `${errorMessage} (${error.message})`
        };
      }
      
      console.error('Erro não-Axios ao enviar pergunta:', error);
      return {
        resposta: 'Erro ao se comunicar com o servidor',
        historicoAtualizado: historico,
        erro: 'Erro ao se comunicar com o servidor'
      };
    }
  },
  
  // Add a method to check server health
  async checkHealth() {
    try {
      const response = await api.get('/health', { timeout: 5000 });
      return { status: 'online', data: response.data };
    } catch (error) {
      return { status: 'offline', error };
    }
  },
  
  async getAssistenteInfo() {
    try {
      const response = await api.get('/info');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter informações do assistente:', error);
      throw new Error('Erro ao obter informações do assistente');
    }
  }
};