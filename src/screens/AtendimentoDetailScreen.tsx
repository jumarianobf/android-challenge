import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Atendimento } from '../types/types';

type AtendimentoStackParamList = {
  AtendimentoList: undefined;
  AtendimentoDetail: { atendimento: Atendimento };
};

type AtendimentoDetailRouteProp = RouteProp<AtendimentoStackParamList, 'AtendimentoDetail'>;
type AtendimentoDetailNavigationProp = StackNavigationProp<AtendimentoStackParamList, 'AtendimentoDetail'>;

const AtendimentoDetailScreen = () => {
  const route = useRoute<AtendimentoDetailRouteProp>();
  const navigation = useNavigation<AtendimentoDetailNavigationProp>();

  const { atendimento } = route.params;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.procedureName}>
          {atendimento.descricaoProcedimento || 'Atendimento Sem Descrição'}
        </Text>
        <Text style={styles.price}>{formatCurrency(atendimento.custo)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Atendimento</Text>
        <Text style={styles.infoText}>Data: {formatDate(atendimento.dataAtendimento)}</Text>
        <Text style={styles.infoText}>Clínica: {atendimento.clinica.nomeClinica}</Text>
        <Text style={styles.infoText}>Dentista: {atendimento.dentista.nomeDentista}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço da Clínica</Text>
        <Text style={styles.infoText}>Telefone: {atendimento.clinica.telefoneClinica}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato do Dentista</Text>
        <Text style={styles.infoText}>Telefone: {atendimento.dentista.telefoneDentista}</Text>
        <Text style={styles.infoText}>Email: {atendimento.dentista.emailDentista}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    backgroundColor: '#0066cc',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  procedureName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: '#0066cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AtendimentoDetailScreen;
