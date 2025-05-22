import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { atendimentoService } from '../services/atendimentoService';
import { Atendimento, Clinic, Dentist } from '../types/types';
import { clinicService } from '../services/clinicService';
import { dentistService } from '../services/dentistService';
import * as ImagePicker from 'expo-image-picker';

const AtendimentoFormScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  const [clinicas, setClinicas] = useState<Clinic[]>([]);
  const [dentistas, setDentistas] = useState<Dentist[]>([]);

  const [clinicaSelecionada, setClinicaSelecionada] = useState<string>('');
  const [dentistaSelecionado, setDentistaSelecionado] = useState<string>('');

  const [descricao, setDescricao] = useState('');
  const [custo, setCusto] = useState('');
  const [dataAtendimento, setDataAtendimento] = useState('');

  const [imagem, setImagem] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  const selecionarImagem = async () => {
    Alert.alert(
      'Selecionar imagem',
      'Escolha uma opção',
      [
        {
          text: 'Câmera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              setImagem(result.assets[0]);
            }
          },
        },
        {
          text: 'Galeria',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              setImagem(result.assets[0]);
            }
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clinicaData = await clinicService.getAll();
        const dentistaData = await dentistService.getAll();

        setClinicas(clinicaData);
        setDentistas(dentistaData);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar dados. Verifique sua conexão.');
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!descricao || !custo || !dataAtendimento || !dentistaSelecionado || !clinicaSelecionada) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const clinica = clinicas.find(c => c.clinicaId === Number(clinicaSelecionada));
    const dentista = dentistas.find(d => d.dentistaId === Number(dentistaSelecionado));

    if (!clinica || !dentista || !user) {
      Alert.alert('Erro', 'Dados inválidos');
      return;
    }

    const atendimento: Omit<Atendimento, 'atendimentoId' | 'dataRegistro'> = {
      descricaoProcedimento: descricao,
      custo: parseFloat(custo),
      dataAtendimento,
      usuario: user,
      dentista,
      clinica,
      status: 'agendado',
    };

    setIsLoading(true);

    try {
      await atendimentoService.createWithImage(atendimento, imagem);

      Alert.alert('Sucesso', 'Atendimento criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível salvar o atendimento. Verifique sua conexão e tente novamente.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Tentar Novamente', onPress: () => handleSave() },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Novo Atendimento</Text>

      <Text style={styles.label}>Selecione a Clínica</Text>
      <Picker
        selectedValue={clinicaSelecionada}
        onValueChange={setClinicaSelecionada}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma clínica" value="" />
        {clinicas.map(c => (
          <Picker.Item key={c.clinicaId} label={c.nomeClinica} value={String(c.clinicaId)} />
        ))}
      </Picker>

      <Text style={styles.label}>Selecione o Dentista</Text>
      <Picker
        selectedValue={dentistaSelecionado}
        onValueChange={setDentistaSelecionado}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um dentista" value="" />
        {dentistas.map(d => (
          <Picker.Item key={d.dentistaId} label={d.nomeDentista} value={String(d.dentistaId)} />
        ))}
      </Picker>

      <Text style={styles.label}>Descrição do Procedimento</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Digite a descrição"
      />

      <Text style={styles.label}>Custo (R$)</Text>
      <TextInput
        style={styles.input}
        value={custo}
        onChangeText={setCusto}
        keyboardType="numeric"
        placeholder="Digite o custo"
      />

      <Text style={styles.label}>Data do Atendimento</Text>
      <TextInput
        style={styles.input}
        value={dataAtendimento}
        onChangeText={setDataAtendimento}
        placeholder="AAAA-MM-DD"
      />

      <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
        <Ionicons name="image" size={24} color="#fff" />
        <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {imagem && (
        <Image
          source={{ uri: imagem.uri }}
          style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 8 }}
        />
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 20 }} />
      ) : (
        <>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="checkmark" size={24} color="#fff" />
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0066cc', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, color: '#333', marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, backgroundColor: '#fff' },
  picker: { backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  imageButton: { backgroundColor: '#0066cc', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, marginTop: 10 },
  imageButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  saveButton: { backgroundColor: '#0066cc', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 8, marginTop: 20 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  cancelButton: { marginTop: 10, alignItems: 'center' },
  cancelButtonText: { color: '#0066cc', fontWeight: 'bold' },
});

export default AtendimentoFormScreen;
