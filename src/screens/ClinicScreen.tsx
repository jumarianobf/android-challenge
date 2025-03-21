import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getClinics } from '../services/mockData';
import { Clinic } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type ClinicStackParamList = {
  ClinicList: undefined;
  ClinicDetail: { clinic: Clinic };
};

type ClinicScreenNavigationProp = StackNavigationProp<ClinicStackParamList, 'ClinicList'>;

const ClinicScreen = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<ClinicScreenNavigationProp>();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getClinics();
        setClinics(data);
        setFilteredClinics(data);
      } catch (error) {
        console.error('Error fetching clinics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredClinics(clinics);
    } else {
      const filtered = clinics.filter(
        clinic => 
          clinic.nome_clinica.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clinic.endereco.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClinics(filtered);
    }
  }, [searchQuery, clinics]);

  const handleClinicPress = (clinic: Clinic) => {
    navigation.navigate('ClinicDetail', { clinic });
  };

  const renderClinicItem = ({ item }: { item: Clinic }) => (
    <TouchableOpacity 
      style={styles.clinicCard}
      onPress={() => handleClinicPress(item)}
    >
      <View style={styles.clinicInfo}>
        <Text style={styles.clinicName}>{item.nome_clinica}</Text>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.addressText}>{item.endereco}</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={16} color="#666" />
          <Text style={styles.contactText}>{item.telefone}</Text>
        </View>
        <View style={styles.hoursRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.hoursText}>{item.horario_funcionamento}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={20} color="#0066cc" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar clínica ou endereço"
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
          <Text style={styles.loadingText}>Carregando clínicas...</Text>
        </View>
      ) : filteredClinics.length > 0 ? (
        <FlatList
          data={filteredClinics}
          renderItem={renderClinicItem}
          keyExtractor={(item) => item.clinica_id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma clínica encontrada</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  listContainer: {
    padding: 15,
  },
  clinicCard: {
    flexDirection: 'row',
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
  clinicInfo: {
    flex: 1,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  hoursText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  arrowContainer: {
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
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
});

export default ClinicScreen;
