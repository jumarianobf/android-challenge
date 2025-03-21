"use client"
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { getUserAppointments } from "../services/mockData"
import { useState, useEffect } from "react"
import type { Appointment } from "../types/types"
import { useUser } from "@/context/UserContext"

const ProfileScreen = () => {
  const { user, setUser } = useUser()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const userAppointments = await getUserAppointments(user.usuario_id)
          setAppointments(userAppointments)
        } catch (error) {
          console.error("Error fetching appointments:", error)
          Alert.alert("Error", "Could not fetch appointments. Please try again.")
        } finally {
          setLoading(false)
        }
      }
    }

    fetchAppointments()
  }, [user])

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => setUser(null),
      },
    ])
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  if (!user) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>{user.nome.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>
            {user.nome} {user.sobrenome}
          </Text>
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
              <Text style={styles.infoValue}>{user.genero === "M" ? "Masculino" : "Feminino"}</Text>
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

        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Consultas Recentes</Text>

          {loading ? (
            <Text style={styles.loadingText}>Carregando consultas...</Text>
          ) : appointments.length > 0 ? (
            appointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Text style={styles.appointmentDate}>
                    {formatDate(appointment.data)} às {appointment.horario}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      appointment.status === "agendado"
                        ? styles.statusScheduled
                        : appointment.status === "concluido"
                          ? styles.statusCompleted
                          : styles.statusCanceled,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {appointment.status === "agendado"
                        ? "Agendado"
                        : appointment.status === "concluido"
                          ? "Concluído"
                          : "Cancelado"}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noAppointmentsText}>Nenhuma consulta encontrada</Text>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileInitial: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0066cc",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    fontSize: 16,
    color: "#e6e6e6",
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: "#fff",
    margin: 15,
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  appointmentsSection: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loadingText: {
    textAlign: "center",
    padding: 15,
    color: "#666",
  },
  noAppointmentsText: {
    textAlign: "center",
    padding: 15,
    color: "#666",
    fontStyle: "italic",
  },
  appointmentCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusScheduled: {
    backgroundColor: "#e6f7ff",
  },
  statusCompleted: {
    backgroundColor: "#e6fff0",
  },
  statusCanceled: {
    backgroundColor: "#ffe6e6",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    padding: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
})

export default ProfileScreen

