import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Clinic } from '../types/types';

// Define route param type directly in this file
type ClinicDetailRouteParams = {
  ClinicDetail: {
    clinic: Clinic;
  };
};

type ClinicDetailScreenRouteProp = RouteProp<ClinicDetailRouteParams, 'ClinicDetail'>;

const ClinicDetailScreen = () => {
  const route = useRoute<ClinicDetailScreenRouteProp>();
  const { clinic } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${clinic.telefone.replace(/\D/g, '')}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${clinic.email}`);
  };

  const handleMap = () => {
    const url = clinic.latitude && clinic.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${clinic.latitude},${clinic.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.endereco)}`;
    
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.clinicName}>{clinic.nome_clinica}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informações de Contato</Text>
        
        <TouchableOpacity style={styles.infoRow} onPress={handleCall}>
          <Ionicons name="call-outline" size={20} color="#0066cc" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{clinic.telefone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#0066cc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoRow} onPress={handleEmail}>
          <Ionicons name="mail-outline" size={20} color="#0066cc" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{clinic.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#0066cc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoRow} onPress={handleMap}>
          <Ionicons name="location-outline" size={20} color="#0066cc" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Endereço</Text>
            <Text style={styles.infoValue}>{clinic.endereco}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#0066cc" />
        </TouchableOpacity>
      </View>

      <View style={styles.hoursSection}>
        <Text style={styles.sectionTitle}>Horário de Funcionamento</Text>
        <Text style={styles.hoursText}>{clinic.horario_funcionamento}</Text>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
        
        <View style={styles.serviceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.serviceText}>Consultas de rotina</Text>
        </View>
        
        <View style={styles.serviceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.serviceText}>Tratamentos de canal</Text>
        </View>
        
        <View style={styles.serviceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.serviceText}>Ortodontia</Text>
        </View>
        
        <View style={styles.serviceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.serviceText}>Implantes dentários</Text>
        </View>
        
        <View style={styles.serviceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.serviceText}>Clareamento dental</Text>
        </View>
        
        <View style={styles.serviceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.serviceText}>Cirurgias odontológicas</Text>
        </View>
      </View>

      <View style={styles.facilitiesSection}>
        <Text style={styles.sectionTitle}>Facilidades</Text>
        
        <View style={styles.facilitiesRow}>
          <View style={styles.facilityItem}>
            <Ionicons name="wifi" size={24} color="#0066cc" />
            <Text style={styles.facilityText}>Wi-Fi</Text>
          </View>
          
          <View style={styles.facilityItem}>
            <Ionicons name="car" size={24} color="#0066cc" />
            <Text style={styles.facilityText}>Estacionamento</Text>
          </View>
          
          <View style={styles.facilityItem}>
            <Ionicons name="accessibility" size={24} color="#0066cc" />
            <Text style={styles.facilityText}>Acessibilidade</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.mapButton} onPress={handleMap}>
        <Ionicons name="map" size={20} color="#fff" />
        <Text style={styles.mapButtonText}>Ver no Mapa</Text>
      </TouchableOpacity>
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
  clinicName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
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
  hoursSection: {
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
  hoursText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  servicesSection: {
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
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  facilitiesSection: {
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
  facilitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  facilityItem: {
    alignItems: 'center',
    marginVertical: 10,
    width: '30%',
  },
  facilityText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  mapButton: {
    backgroundColor: '#0066cc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ClinicDetailScreen;
