// "use client"

// import { useState, useEffect } from "react"
// import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { useRoute, useNavigation, type RouteProp } from "@react-navigation/native"
// import type { StackNavigationProp } from "@react-navigation/stack"
// import type { Appointment, Dentist } from "../types/types"
// import { appointmentService } from "../services/appointmentService"
// import { dentistService } from "../services/dentistService"

// // Define route param types
// type AppointmentStackParamList = {
//   AppointmentList: undefined
//   AppointmentDetail: { appointmentId: number }
//   AppointmentForm: { appointmentId?: number }
// }

// type AppointmentDetailScreenRouteProp = RouteProp<AppointmentStackParamList, "AppointmentDetail">
// type AppointmentDetailScreenNavigationProp = StackNavigationProp<AppointmentStackParamList, "AppointmentDetail">

// const AppointmentDetailScreen = () => {
//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [dentist, setDentist] = useState<Dentist | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [deleting, setDeleting] = useState(false)

//   const route = useRoute<AppointmentDetailScreenRouteProp>()
//   const navigation = useNavigation<AppointmentDetailScreenNavigationProp>()
//   const { appointmentId } = route.params

//   useEffect(() => {
//     const fetchAppointmentDetails = async () => {
//       try {
//         setLoading(true)
//         const appointmentData = await appointmentService.getById(appointmentId)
//         setAppointment(appointmentData)

//         if (appointmentData.dentista.dentistaId) {
//           const dentistData = await dentistService.getById(appointmentData.dentista.dentistaId)
//           setDentist(dentistData)
//         }
//       } catch (error) {
//         console.error("Erro ao carregar detalhes:", error)
//         Alert.alert("Erro", "Não foi possível carregar os detalhes da consulta.")
//         navigation.goBack()
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAppointmentDetails()
//   }, [appointmentId, navigation])

//   const handleEditAppointment = () => {
//     navigation.navigate("AppointmentForm", { appointmentId })
//   }

//   const handleDeleteAppointment = () => {
//     Alert.alert("Cancelar Consulta", "Tem certeza que deseja cancelar esta consulta?", [
//       { text: "Não", style: "cancel" },
//       {
//         text: "Sim",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setDeleting(true)
//             await appointmentService.update(appointmentId, { status: "cancelado" })
//             Alert.alert("Sucesso", "Consulta cancelada com sucesso!")
//             navigation.goBack()
//           } catch (error) {
//             console.error("Erro ao cancelar consulta:", error)
//             Alert.alert("Erro", "Não foi possível cancelar a consulta.")
//           } finally {
//             setDeleting(false)
//           }
//         },
//       },
//     ])
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("pt-BR")
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "agendado":
//         return "#e6f7ff"
//       case "concluido":
//         return "#e6fff0"
//       case "cancelado":
//         return "#ffe6e6"
//       default:
//         return "#f0f0f0"
//     }
//   }

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "agendado":
//         return "Agendado"
//       case "concluido":
//         return "Concluído"
//       case "cancelado":
//         return "Cancelado"
//       default:
//         return status
//     }
//   }

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0066cc" />
//         <Text style={styles.loadingText}>Carregando detalhes da consulta...</Text>
//       </View>
//     )
//   }

//   if (!appointment) {
//     return (
//       <View style={styles.errorContainer}>
//         <Ionicons name="alert-circle-outline" size={50} color="#ff3b30" />
//         <Text style={styles.errorText}>Consulta não encontrada</Text>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.backButtonText}>Voltar</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Detalhes da Consulta</Text>
//         <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
//           <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Informações da Consulta</Text>

//         <View style={styles.infoRow}>
//           <Ionicons name="calendar-outline" size={20} color="#666" />
//           <View style={styles.infoContent}>
//             <Text style={styles.infoLabel}>Data</Text>
//             <Text style={styles.infoValue}>{formatDate(appointment.data)}</Text>
//           </View>
//         </View>

//         <View style={styles.infoRow}>
//           <Ionicons name="time-outline" size={20} color="#666" />
//           <View style={styles.infoContent}>
//             <Text style={styles.infoLabel}>Horário</Text>
//             <Text style={styles.infoValue}>{appointment.horario}</Text>
//           </View>
//         </View>

//         <View style={styles.infoRow}>
//           <Ionicons name="person-outline" size={20} color="#666" />
//           <View style={styles.infoContent}>
//             <Text style={styles.infoLabel}>Dentista</Text>
//             <Text style={styles.infoValue}>
//               {dentist ? dentist.nomeDentista : `Dentista ID: ${appointment.dentista.dentistaId}`}
//             </Text>
//           </View>
//         </View>

//         {dentist && (
//           <View style={styles.infoRow}>
//             <Ionicons name="medical-outline" size={20} color="#666" />
//             <View style={styles.infoContent}>
//               <Text style={styles.infoLabel}>Especialidade</Text>
//               <Text style={styles.infoValue}>{dentist.especialidade}</Text>
//             </View>
//           </View>
//         )}
//       </View>

//       {appointment.status === "agendado" && (
//         <View style={styles.actionsContainer}>
//           <TouchableOpacity style={styles.editButton} onPress={handleEditAppointment}>
//             <Ionicons name="create-outline" size={20} color="#fff" />
//             <Text style={styles.buttonText}>Editar Consulta</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAppointment} disabled={deleting}>
//             {deleting ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <>
//                 <Ionicons name="close-circle-outline" size={20} color="#fff" />
//                 <Text style={styles.buttonText}>Cancelar Consulta</Text>
//               </>
//             )}
//           </TouchableOpacity>
//         </View>
//       )}
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f5f5f5" },
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   loadingText: { marginTop: 10, fontSize: 16, color: "#666" },
//   errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   errorText: { fontSize: 18, color: "#333", marginTop: 10, marginBottom: 20 },
//   backButton: { backgroundColor: "#0066cc", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
//   backButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   header: { backgroundColor: "#0066cc", padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
//   statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
//   statusText: { fontSize: 14, fontWeight: "600" },
//   section: { backgroundColor: "#fff", margin: 15, borderRadius: 10, padding: 15, elevation: 2 },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: "#333" },
//   infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
//   infoContent: { marginLeft: 15, flex: 1 },
//   infoLabel: { fontSize: 14, color: "#666" },
//   infoValue: { fontSize: 16, color: "#333", fontWeight: "500" },
//   actionsContainer: { margin: 15, marginTop: 0, marginBottom: 30 },
//   editButton: { backgroundColor: "#0066cc", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 15, borderRadius: 8, marginBottom: 10 },
//   deleteButton: { backgroundColor: "#ff3b30", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 15, borderRadius: 8 },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
// })

// export default AppointmentDetailScreen
