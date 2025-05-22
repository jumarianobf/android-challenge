import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Dentist } from '../types/types';

type DentistStackParamList = {
  DentistDetail: { dentist: Dentist };
};

type DentistDetailRouteProp = RouteProp<DentistStackParamList, 'DentistDetail'>;

const DentistDetailScreen = () => {
  const route = useRoute<DentistDetailRouteProp>();
  const { dentist } = route.params;

  const handleCall = () => {
    if (dentist.telefoneDentista) {
      Linking.openURL(`tel:${dentist.telefoneDentista}`);
    }
  };

  const handleEmail = () => {
    if (dentist.emailDentista) {
      Linking.openURL(`mailto:${dentist.emailDentista}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{dentist.nomeDentista}</Text>
        <Text style={styles.specialty}>{dentist.especialidade}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <TouchableOpacity style={styles.contactRow} onPress={handleCall}>
          <Ionicons name="call-outline" size={20} color="#0066cc" />
          <Text style={styles.contactText}>{dentist.telefoneDentista || 'Não informado'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
          <Ionicons name="mail-outline" size={20} color="#0066cc" />
          <Text style={styles.contactText}>{dentist.emailDentista || 'Não informado'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clínica</Text>
        <Text style={styles.clinicName}>{dentist.clinica?.nomeClinica || 'Não informada'}</Text>
        <Text style={styles.clinicPhone}>Telefone: {dentist.clinica?.telefoneClinica || 'Não informado'}</Text>

        {dentist.clinica?.enderecos?.length > 0 && (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Endereço(s):</Text>
            {dentist.clinica.enderecos.map((endereco) => (
              <View key={endereco.enderecoClinicaId} style={styles.addressBlock}>
                <Text>{endereco.logradouroClinica}, {endereco.bairroClinica}</Text>
                <Text>{endereco.cidadeClinica} - {endereco.estadoClinica}</Text>
                <Text>CEP: {endereco.cepClinica}</Text>
              </View>
            ))}
          </View>
        )}

        {(!dentist.clinica?.enderecos || dentist.clinica.enderecos.length === 0) && (
          <Text>Endereço não cadastrado.</Text>
        )}
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
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  specialty: {
    color: '#e6e6e6',
    fontSize: 16,
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#0066cc',
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clinicPhone: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  addressContainer: {
    marginTop: 5,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressBlock: {
    backgroundColor: '#fafafa',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 14,
    color: '#333',
  },
});

export default DentistDetailScreen;
