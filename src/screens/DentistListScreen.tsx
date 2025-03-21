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
import { getDentists } from '../services/mockData';
import { Dentist } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation types directly in this file
type DentistStackParamList = {
  DentistList: undefined;
  DentistDetail: { dentist: Dentist };
  BookAppointment: { dentist: Dentist };
};

type DentistListScreenNavigationProp = StackNavigationProp<DentistStackParamList, 'DentistList'>;

const DentistListScreen = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [filteredDentists, setFilteredDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<DentistListScreenNavigationProp>();

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const data = await getDentists();
        setDentists(data);
        setFilteredDentists(data);
      } catch (error) {
        console.error('Error fetching dentists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDentists(dentists);
    } else {
      const filtered = dentists.filter(
        (dentist) =>
          dentist.nome_dentista.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dentist.especialidade.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDentists(filtered);
    }
  }, [searchQuery, dentists]);

  const handleDentistPress = (dentist: Dentist) => {
    navigation.navigate('DentistDetail', { dentist });
  };

  const renderDentistItem = ({ item }: { item: Dentist }) => (
    <TouchableOpacity style={styles.dentistCard} onPress={() => handleDentistPress(item)}>
      <View style={styles.dentistInfo}>
        <Text style={styles.dentistName}>{item.nome_dentista}</Text>
        <Text style={styles.dentistSpecialty}>{item.especialidade}</Text>
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={14} color="#666" />
          <Text style={styles.contactText}>{item.telefone_dentista}</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="mail-outline" size={14} color="#666" />
          <Text style={styles.contactText}>{item.email_dentista}</Text>
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
          placeholder="Buscar dentista ou especialidade"
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
          <Text style={styles.loadingText}>Carregando dentistas...</Text>
        </View>
      ) : filteredDentists.length > 0 ? (
        <FlatList
          data={filteredDentists}
          renderItem={renderDentistItem}
          keyExtractor={(item) => item.dentista_id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum dentista encontrado</Text>
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
  dentistCard: {
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
  dentistInfo: {
    flex: 1,
  },
  dentistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dentistSpecialty: {
    fontSize: 16,
    color: '#0066cc',
    marginBottom: 10,
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

export default DentistListScreen;
