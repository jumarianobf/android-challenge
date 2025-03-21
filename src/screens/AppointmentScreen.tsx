"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import { useRoute, useNavigation, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import type { Dentist, Appointment } from "../types/types"
import { createAppointment, getUserAppointments } from "../services/mockData"
import { useUser } from "@/context/UserContext"

type AppointmentStackParamList = {
  Appointments: undefined
  BookAppointment: { dentist: Dentist }
  Dentists: undefined
}

type AppointmentScreenRouteProp = RouteProp<AppointmentStackParamList, "BookAppointment">
type AppointmentScreenNavigationProp = StackNavigationProp<AppointmentStackParamList, "BookAppointment">

const AppointmentScreen = () => {
  const route = useRoute<AppointmentScreenRouteProp>()
  const navigation = useNavigation<AppointmentScreenNavigationProp>()
  const { user } = useUser()
  const { dentist } = route.params || {}

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [viewMode, setViewMode] = useState(dentist ? "booking" : "list")

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const formattedDate = date.toISOString().split("T")[0]
      const dayName = date.toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3)
      const dayNumber = date.getDate()

      dates.push({
        fullDate: formattedDate,
        dayName,
        dayNumber,
      })
    }

    return dates
  }

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 8
    const endHour = 17

    for (let hour = startHour; hour <= endHour; hour++) {
      if (hour !== 12) {
        // Skip lunch hour
        slots.push(`${hour}:00`)
        if (hour !== endHour) {
          slots.push(`${hour}:30`)
        }
      }
    }

    return slots
  }

  const dates = generateDates()
  const timeSlots = generateTimeSlots()

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !user || !dentist) {
      Alert.alert("Erro", "Por favor, selecione data e horário para a consulta")
      return
    }

    setLoading(true)
    try {
      await createAppointment({
        dentista_id: dentist.dentista_id,
        usuario_id: user.usuario_id,
        data: selectedDate,
        horario: selectedTime,
        status: "agendado",
      })

      Alert.alert("Sucesso", "Consulta agendada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            // Navigate back to the previous screen or to the appointments list
            navigation.goBack()
          },
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao agendar a consulta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (viewMode === "list" && user) {
      setLoading(true)
      getUserAppointments(user.usuario_id)
        .then((data) => {
          setAppointments(data)
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [viewMode, user])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  if (viewMode === "booking" && dentist) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Agendar Consulta</Text>
          <Text style={styles.headerSubtitle}>com {dentist.nome_dentista}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione uma data</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesContainer}>
            {dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dateItem, selectedDate === date.fullDate && styles.selectedDateItem]}
                onPress={() => handleDateSelect(date.fullDate)}
              >
                <Text style={[styles.dateDayName, selectedDate === date.fullDate && styles.selectedDateText]}>
                  {date.dayName}
                </Text>
                <Text style={[styles.dateDayNumber, selectedDate === date.fullDate && styles.selectedDateText]}>
                  {date.dayNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selecione um horário</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.timeItem, selectedTime === time && styles.selectedTimeItem]}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.bookButton, (!selectedDate || !selectedTime) && styles.disabledButton]}
          onPress={handleBookAppointment}
          disabled={!selectedDate || !selectedTime || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.bookButtonText}>Confirmar Agendamento</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    )
  } else {
    // Appointments list view
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Minhas Consultas</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
            <Text style={styles.loadingText}>Carregando consultas...</Text>
          </View>
        ) : appointments.length > 0 ? (
          <ScrollView>
            {appointments.map((appointment) => (
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
                <View style={styles.appointmentDivider} />
                <View style={styles.appointmentDetails}>
                  <Ionicons name="person" size={16} color="#666" />
                  <Text style={styles.appointmentDetailText}>
                    Dentista: Dr. {appointment.dentista_id.replace("DEN", "")}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Você não possui consultas agendadas</Text>
            <TouchableOpacity style={styles.newAppointmentButton} onPress={() => navigation.navigate("Dentists")}>
              <Text style={styles.newAppointmentButtonText}>Agendar Nova Consulta</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e6e6e6",
    marginTop: 5,
  },
  section: {
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
  datesContainer: {
    flexDirection: "row",
  },
  dateItem: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  selectedDateItem: {
    backgroundColor: "#0066cc",
  },
  dateDayName: {
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
  },
  dateDayNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDateText: {
    color: "#fff",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeItem: {
    width: "30%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  selectedTimeItem: {
    backgroundColor: "#0066cc",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  selectedTimeText: {
    color: "#fff",
  },
  bookButton: {
    backgroundColor: "#0066cc",
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  newAppointmentButton: {
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  newAppointmentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  appointmentDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  appointmentDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  appointmentDetailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
})

export default AppointmentScreen

