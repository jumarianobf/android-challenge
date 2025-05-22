import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUser } from '../context/UserContext';
import { atendimentoService } from '../services/atendimentoService';
import { Atendimento } from '../types/types';

type AtendimentoStackParamList = {
  AtendimentoList: undefined;
  AtendimentoDetail: { atendimento: Atendimento };
  AtendimentoForm: undefined;
};

type AtendimentoScreenNavigationProp = StackNavigationProp<
  AtendimentoStackParamList,
  'AtendimentoList'
>;

const AtendimentoScreen = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [filtered, setFiltered] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  const navigation = useNavigation<AtendimentoScreenNavigationProp>();

  const fetchAtendimentos = async () => {
    try {
      if (!user) return;
      const data = await atendimentoService.getAll(user.usuarioId);
      setAtendimentos(data);
      setFiltered(data);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAtendimentos();
    }, [user])
  );

  useEffect(() => {
    const filteredData = atendimentos.filter(
      (item) =>
        item.descricaoProcedimento?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clinica.nomeClinica.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dentista.nomeDentista.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFiltered(filteredData);
  }, [searchQuery, atendimentos]);

  const handleItemPress = (atendimento: Atendimento) => {
    navigation.navigate('AtendimentoDetail', { atendimento });
  };

  const handleAddAtendimento = () => {
    navigation.navigate('AtendimentoForm');
  };

  const handleDelete = (id: number) => {
    Alert.alert('Excluir', 'Deseja realmente excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await atendimentoService.delete(id);
            const updated = atendimentos.filter(item => item.atendimentoId !== id);
            setAtendimentos(updated);
            setFiltered(updated);
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir');
          }
        },
      },
    ]);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const renderItem = ({ item }: { item: Atendimento }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item)}
    >
      <View>
        <View style={styles.cardHeader}>
          <Text style={styles.procedureName}>
            {item.descricaoProcedimento || 'Atendimento Sem Descrição'}
          </Text>
          <Text style={styles.price}>{formatCurrency(item.custo)}</Text>
        </View>
        <Text style={styles.description}>
          Clínica: {item.clinica.nomeClinica} | Dentista: {item.dentista.nomeDentista}
        </Text>
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.dateText}>
              {new Date(item.dataAtendimento).toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item.atendimentoId)}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar atendimento"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Carregando atendimentos...</Text>
        </View>
      ) : filtered.length > 0 ? (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.atendimentoId.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum atendimento encontrado</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddAtendimento}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 50, fontSize: 16 },
  listContainer: { padding: 15, paddingTop: 5 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  procedureName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  price: { fontSize: 16, fontWeight: 'bold', color: '#0066cc' },
  description: { fontSize: 14, color: '#666', marginBottom: 10 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 14, color: '#666', marginLeft: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0066cc',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default AtendimentoScreen;
