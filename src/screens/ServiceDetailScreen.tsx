import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRoute, useNavigation, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { Service } from "../types/types"


type ServiceDetailRouteParams = {
  ServiceDetail: {
    service: Service
  }
}

type ServiceDetailScreenRouteProp = RouteProp<ServiceDetailRouteParams, "ServiceDetail">

type ServiceStackParamList = {
  ServiceList: undefined
  ServiceDetail: { service: Service }
  Dentists: undefined
}

type ServiceDetailScreenNavigationProp = StackNavigationProp<ServiceStackParamList, "ServiceDetail">

const ServiceDetailScreen = () => {
  const route = useRoute<ServiceDetailScreenRouteProp>()
  const navigation = useNavigation<ServiceDetailScreenNavigationProp>()
  const { service } = route.params

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const handleBookService = () => {
    navigation.navigate("Dentists")
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.serviceName}>{service.nome_servico}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{service.categoria}</Text>
        </View>
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>Valor</Text>
        <Text style={styles.priceValue}>{formatCurrency(service.preco)}</Text>
        <View style={styles.durationContainer}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.durationText}>Duração: {service.duracao}</Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.descriptionText}>{service.descricao}</Text>
        <Text style={styles.additionalDescription}>
          Este procedimento é realizado por profissionais especializados e utiliza técnicas modernas para garantir o
          melhor resultado. Nossos dentistas são treinados para oferecer um atendimento de qualidade, priorizando o
          conforto e bem-estar do paciente.
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informações Importantes</Text>

        <View style={styles.infoItem}>
          <Ionicons name="information-circle-outline" size={20} color="#0066cc" />
          <Text style={styles.infoText}>Chegue com 15 minutos de antecedência para o preenchimento de formulários</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="information-circle-outline" size={20} color="#0066cc" />
          <Text style={styles.infoText}>Traga documentos pessoais e carteirinha do plano (se possuir)</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="information-circle-outline" size={20} color="#0066cc" />
          <Text style={styles.infoText}>
            Em caso de impossibilidade de comparecimento, cancele com pelo menos 24h de antecedência
          </Text>
        </View>
      </View>

      <View style={styles.preparationSection}>
        <Text style={styles.sectionTitle}>Preparação</Text>

        <View style={styles.prepItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.prepText}>Realize a higiene bucal antes da consulta</Text>
        </View>

        <View style={styles.prepItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.prepText}>Informe ao dentista sobre qualquer medicamento que esteja tomando</Text>
        </View>

        <View style={styles.prepItem}>
          <Ionicons name="checkmark-circle" size={20} color="#0066cc" />
          <Text style={styles.prepText}>Comunique alergias ou condições médicas relevantes</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookService}>
        <Text style={styles.bookButtonText}>Agendar este Atendimento</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0066cc",
    padding: 20,
    alignItems: "center",
  },
  serviceName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  categoryContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#fff",
  },
  priceSection: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0066cc",
    marginVertical: 5,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  durationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  descriptionSection: {
    backgroundColor: "#fff",
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 10,
  },
  additionalDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
  },
  infoSection: {
    backgroundColor: "#fff",
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  preparationSection: {
    backgroundColor: "#fff",
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  prepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  prepText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  bookButton: {
    backgroundColor: "#0066cc",
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ServiceDetailScreen

