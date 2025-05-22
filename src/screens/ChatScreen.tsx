import React, { useState, useRef, useEffect } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { chatService, Mensagem, ChatResponse } from '../services/chatService';
import { AppState, AppStateStatus } from 'react-native';

const ChatScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState<Mensagem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const requestTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef(AppState.currentState);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkServerStatus = async () => {
      setServerStatus('checking');
      const health = await chatService.checkHealth();
      setServerStatus(health.status === 'online' ? 'online' : 'offline');
    };
    
    checkServerStatus();
    
    // Also check server status when app comes to foreground
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        checkServerStatus();
      }
      appStateRef.current = nextAppState;
    });
    
    return () => {
      subscription.remove();
    };
  }, []);

  // Add welcome message when component mounts
  useEffect(() => {
    setHistorico([
      {
        tipo: 'assistente',
        conteudo: 'Olá! Sou o assistente odontológico da ParrotTech. Como posso ajudar você hoje?',
        dataProcessamento: new Date().toISOString()
      }
    ]);
    
    // Cleanup function to clear any pending timeouts
    return () => {
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }
    };
  }, []);

  const enviarMensagem = async () => {
    if (!mensagem.trim() || isLoading) return;

    // Check server status before sending
  if (serverStatus !== 'online') {
    const health = await chatService.checkHealth();
    if (health.status !== 'online') {
      setError('Servidor indisponível. Verifique sua conexão ou tente novamente mais tarde.');
      return;
    }
    setServerStatus('online');
  }

    // Clear any previous errors
    setError(null);
    
    const mensagemTexto = mensagem.trim();
    setMensagem('');

    const novaPergunta: Mensagem = { 
      tipo: 'usuario', 
      conteudo: mensagemTexto,
      dataProcessamento: new Date().toISOString()
    };
    
    // Update UI immediately with user message
    setHistorico(prev => [...prev, novaPergunta]);
    setIsLoading(true);
    
    // Set a timeout to prevent infinite loading
    requestTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('A requisição demorou muito tempo. Tente novamente.');
        console.log('Request timeout triggered');
      }
    }, 20000); // 20 seconds timeout

    try {
      console.log('Enviando mensagem:', mensagemTexto);
      
      // Create a copy of the current history to send
      const historicoAtual = [...historico, novaPergunta];
      
      // Send message and get response with updated history
      const resposta = await chatService.enviarPergunta(mensagemTexto, historicoAtual);
      
      // Clear the timeout since we got a response
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
        requestTimeoutRef.current = null;
      }
      
      console.log('Resposta recebida:', JSON.stringify(resposta));
      
      if (resposta.erro) {
        setError(resposta.erro);
        console.log('Erro recebido do servidor:', resposta.erro);
      } else if (resposta.historicoAtualizado && resposta.historicoAtualizado.length > 0) {
        // Use the updated history from the server
        console.log('Atualizando histórico com dados do servidor');
        setHistorico(resposta.historicoAtualizado);
      } else if (resposta.resposta) {
        // Fallback if historicoAtualizado is not available
        console.log('Usando resposta direta do servidor');
        const respostaAssistente: Mensagem = { 
          tipo: 'assistente', 
          conteudo: resposta.resposta,
          dataProcessamento: new Date().toISOString()
        };
        setHistorico(prev => [...prev, respostaAssistente]);
      } else {
        // Handle unexpected response format
        console.log('Formato de resposta inesperado');
        setError('Resposta do servidor em formato inesperado');
      }
    } catch (error) {
      console.error('Erro não tratado:', error);
      setError('Erro ao obter resposta. Tente novamente.');
      
      // Add error message to chat for better UX
      const errorMessage: Mensagem = {
        tipo: 'assistente',
        conteudo: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        dataProcessamento: new Date().toISOString()
      };
      setHistorico(prev => [...prev, errorMessage]);
    } finally {
      // Always ensure loading state is reset
      setIsLoading(false);
      
      // Clear the timeout if it's still active
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
        requestTimeoutRef.current = null;
      }
      
      // Scroll to bottom after new message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }

    {serverStatus === 'offline' && (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>
          Servidor indisponível. Verifique sua conexão.
        </Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={async () => {
            const health = await chatService.checkHealth();
            setServerStatus(health.status === 'online' ? 'online' : 'offline');
          }}
        >
          <Text style={styles.retryButtonText}>Verificar Novamente</Text>
        </TouchableOpacity>
      </View>
      )}
  };

  // Function to retry the last message if there was an error
  const retryLastMessage = () => {
    if (historico.length > 0) {
      // Find the last user message
      const lastUserMessageIndex = [...historico].reverse().findIndex(msg => msg.tipo === 'usuario');
      if (lastUserMessageIndex >= 0) {
        const lastUserMessage = historico[historico.length - 1 - lastUserMessageIndex];
        setMensagem(lastUserMessage.conteudo);
        // Remove the error message if it exists
        if (historico[historico.length - 1].tipo === 'assistente' && 
            historico[historico.length - 1].conteudo.includes('erro')) {
          setHistorico(prev => prev.slice(0, -1));
        }
      }
    }
    setError(null);
  };

  const renderItem = ({ item }: { item: Mensagem }) => (
    <View style={[
      styles.messageContainer,
      item.tipo === 'usuario' ? styles.userMessage : styles.assistantMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.tipo === 'assistente' && styles.assistantText
      ]}>
        {item.conteudo}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={historico}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0066cc" />
          <Text style={styles.loadingText}>Assistente está digitando...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={retryLastMessage}
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua pergunta..."
          value={mensagem}
          onChangeText={setMensagem}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          onPress={enviarMensagem} 
          style={[
            styles.sendButton,
            (!mensagem.trim() || isLoading) && styles.sendButtonDisabled
          ]}
          disabled={!mensagem.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#ffcc0033',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcc00',
  },
  offlineText: {
    color: '#996600',
    marginBottom: 8,
  },
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9' 
  },
  messagesContainer: { 
    padding: 15,
    paddingBottom: 10
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#0066cc',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  assistantMessage: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  assistantText: {
    color: '#333', // Darker text for assistant messages
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#0066cc',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontStyle: 'italic',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#d32f2f',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
