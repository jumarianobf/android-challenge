import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { User } from '../types/types';

type UserDetailRouteParams = {
  UserDetail: {
    user: User;
  };
};

type UserDetailScreenRouteProp = RouteProp<UserDetailRouteParams, 'UserDetail'>;

const UserDetailScreen = () => {
  const route = useRoute<UserDetailScreenRouteProp>();
  const { user } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>{user.nome.charAt(0)}</Text>
        </View>
        <Text style={styles.userName}>{user.nome} {user.sobrenome}</Text>
        <Text style={styles.userInfo}>{user.cpf}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Data de Nascimento</Text>
            <Text style={styles.infoValue}>{formatDate(user.data_nascimento)}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Gênero</Text>
            <Text style={styles.infoValue}>{user.genero === 'M' ? 'Masculino' : 'Feminino'}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Cliente desde</Text>
            <Text style={styles.infoValue}>{formatDate(user.data_cadastro)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Consultas Realizadas</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Consultas Agendadas</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Consultas Canceladas</Text>
          </View>
        </View>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Histórico de Tratamentos</Text>
        
        <View style={styles.historyItem}>
          <View style={styles.historyDate}>
            <Text style={styles.historyMonth}>MAI</Text>
            <Text style={styles.historyDay}>10</Text>
          </View>
          <View style={styles.historyContent}>
            <Text style={styles.historyTitle}>Limpeza Dental</Text>
            <Text style={styles.historyDescription}>Realizada pela Dra. Juliana Costa</Text>
          </View>
        </View>
        
        <View style={styles.historyItem}>
          <View style={styles.historyDate}>
            <Text style={styles.historyMonth}>MAR</Text>
            <Text style={styles.historyDay}>15</Text>
          </View>
          <View style={styles.historyContent}>
            <Text style={styles.historyTitle}>Consulta de Avaliação</Text>
            <Text style={styles.historyDescription}>Realizada pelo Dr. Carlos Ferreira</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#0066cc',
    padding: 20,
    alignItems: 'center',
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInitial: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    fontSize: 16,
    color: '#e6e6e6',
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  statsSection: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  historySection: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 30,
  },
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyDate: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  historyMonth: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  historyDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  historyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  historyDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserDetailScreen;
