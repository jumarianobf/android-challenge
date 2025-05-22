// "use client"

// import { useState, useEffect } from "react"
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   Platform,
// } from "react-native"
// import { useRoute, useNavigation, type RouteProp } from "@react-navigation/native"
// import type { StackNavigationProp } from "@react-navigation/stack"
// import { Ionicons } from "@expo/vector-icons"
// import * as ImagePicker from "expo-image-picker"
// import type { Dentist } from "../types/types"
// import { useUser } from "../context/UserContext"
// import { createAppointment } from "../services/mockData"


// type ParrotTechStackParamList = {
//   ParrotTech: { dentist: Dentist; date: string; time: string }
//   BookAppointment: { dentist: Dentist }
//   Appointments: undefined
// }

// type ParrotTechScreenRouteProp = RouteProp<ParrotTechStackParamList, "ParrotTech">
// type ParrotTechScreenNavigationProp = StackNavigationProp<ParrotTechStackParamList, "ParrotTech">


// type AnalysisResult = {
//   condition: string
//   confidence: number
//   recommendedProcedure: string
//   urgencyLevel: "low" | "medium" | "high"
//   additionalNotes: string
// }

// const mockAnalyzeImage = (imageUri: string): Promise<AnalysisResult> => {
//   // This is a mock function that simulates AI analysis
//   return new Promise((resolve) => {
//     // Simulate processing time
//     setTimeout(() => {
//       // Return mock analysis results
//       resolve({
//         condition: "Possível cárie dentária",
//         confidence: 87,
//         recommendedProcedure: "Restauração dentária",
//         urgencyLevel: "medium",
//         additionalNotes:
//           "Recomenda-se avaliação profissional para confirmar o diagnóstico e determinar o tratamento adequado.",
//       })
//     }, 3000) // Simulate 3 seconds of processing
//   })
// }

// const ParrotTechScreen = () => {
//   const route = useRoute<ParrotTechScreenRouteProp>()
//   const navigation = useNavigation<ParrotTechScreenNavigationProp>()
//   const { user } = useUser()
//   const { dentist, date, time } = route.params

//   const [image, setImage] = useState<string | null>(null)
//   const [analyzing, setAnalyzing] = useState(false)
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
//   const [bookingInProgress, setBookingInProgress] = useState(false)

//   useEffect(() => {
//     ;(async () => {
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync()
//         if (status !== "granted") {
//           Alert.alert("Permissão necessária", "Precisamos de permissão para acessar sua câmera para tirar fotos.")
//         }
//       }
//     })()
//   }, [])

//   const takePhoto = async () => {
//     try {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       })

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         setImage(result.assets[0].uri)
//         setAnalysisResult(null) // Reset previous analysis
//       }
//     } catch (error) {
//       console.error("Error taking photo:", error)
//       Alert.alert("Erro", "Ocorreu um erro ao tirar a foto. Por favor, tente novamente.")
//     }
//   }

//   const pickImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       })

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         setImage(result.assets[0].uri)
//         setAnalysisResult(null) // Reset previous analysis
//       }
//     } catch (error) {
//       console.error("Error picking image:", error)
//       Alert.alert("Erro", "Ocorreu um erro ao selecionar a imagem. Por favor, tente novamente.")
//     }
//   }

//   const analyzeImage = async () => {
//     if (!image) {
//       Alert.alert("Erro", "Por favor, selecione ou tire uma foto primeiro.")
//       return
//     }

//     setAnalyzing(true)
//     try {
//       const result = await mockAnalyzeImage(image)
//       setAnalysisResult(result)
//     } catch (error) {
//       console.error("Error analyzing image:", error)
//       Alert.alert("Erro", "Ocorreu um erro ao analisar a imagem. Por favor, tente novamente.")
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const handleBookAppointment = async () => {
//     if (!user) {
//       Alert.alert("Erro", "Você precisa estar logado para agendar uma consulta.")
//       return
//     }

//     setBookingInProgress(true)
//     try {
//       await createAppointment({
//         dentista_id: dentist.dentista_id,
//         usuario_id: user.usuario_id,
//         data: date,
//         horario: time,
//         status: "agendado",
//       })

//       Alert.alert("Sucesso", "Consulta agendada com sucesso! A análise da sua imagem foi enviada ao dentista.", [
//         {
//           text: "OK",
//           onPress: () => {
//             navigation.navigate("Appointments")
//           },
//         },
//       ])
//     } catch (error) {
//       Alert.alert("Erro", "Ocorreu um erro ao agendar a consulta. Tente novamente.")
//     } finally {
//       setBookingInProgress(false)
//     }
//   }

//   const getUrgencyColor = (level: string) => {
//     switch (level) {
//       case "low":
//         return "#4caf50" // Green
//       case "medium":
//         return "#ff9800" // Orange
//       case "high":
//         return "#f44336" // Red
//       default:
//         return "#757575" // Gray
//     }
//   }

//   const getUrgencyText = (level: string) => {
//     switch (level) {
//       case "low":
//         return "Baixa"
//       case "medium":
//         return "Média"
//       case "high":
//         return "Alta"
//       default:
//         return "Desconhecida"
//     }
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Parrot Tech</Text>
//         <Text style={styles.headerSubtitle}>Análise Dental por IA</Text>
//       </View>

//       <View style={styles.infoSection}>
//         <View style={styles.infoIcon}>
//           <Ionicons name="information-circle" size={24} color="#0066cc" />
//         </View>
//         <Text style={styles.infoText}>
//           Envie uma foto da sua condição dental para análise prévia. Isso ajudará o dentista a se preparar melhor para
//           sua consulta.
//         </Text>
//       </View>

//       <View style={styles.appointmentInfoSection}>
//         <Text style={styles.appointmentInfoTitle}>Detalhes da Consulta</Text>
//         <View style={styles.appointmentInfoRow}>
//           <Ionicons name="person" size={18} color="#666" />
//           <Text style={styles.appointmentInfoText}>Dentista: {dentist.nome_dentista}</Text>
//         </View>
//         <View style={styles.appointmentInfoRow}>
//           <Ionicons name="calendar" size={18} color="#666" />
//           <Text style={styles.appointmentInfoText}>Data: {new Date(date).toLocaleDateString("pt-BR")}</Text>
//         </View>
//         <View style={styles.appointmentInfoRow}>
//           <Ionicons name="time" size={18} color="#666" />
//           <Text style={styles.appointmentInfoText}>Horário: {time}</Text>
//         </View>
//       </View>

//       <View style={styles.imageSection}>
//         <Text style={styles.sectionTitle}>Foto da Condição Dental</Text>

//         {image ? (
//           <View style={styles.imageContainer}>
//             <Image source={{ uri: image }} style={styles.image} />
//             <TouchableOpacity style={styles.changeImageButton} onPress={takePhoto}>
//               <Text style={styles.changeImageButtonText}>Tirar Nova Foto</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.imageButtonsContainer}>
//             <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
//               <Ionicons name="camera" size={24} color="#fff" />
//               <Text style={styles.imageButtonText}>Tirar Foto</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
//               <Ionicons name="images" size={24} color="#fff" />
//               <Text style={styles.imageButtonText}>Galeria</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {image && !analysisResult && !analyzing && (
//           <TouchableOpacity style={styles.analyzeButton} onPress={analyzeImage}>
//             <Text style={styles.analyzeButtonText}>Analisar Imagem</Text>
//           </TouchableOpacity>
//         )}

//         {analyzing && (
//           <View style={styles.analyzingContainer}>
//             <ActivityIndicator size="large" color="#0066cc" />
//             <Text style={styles.analyzingText}>Analisando imagem...</Text>
//           </View>
//         )}
//       </View>

//       {analysisResult && (
//         <View style={styles.resultsSection}>
//           <Text style={styles.sectionTitle}>Resultado da Análise</Text>

//           <View style={styles.resultItem}>
//             <Text style={styles.resultLabel}>Condição Identificada:</Text>
//             <Text style={styles.resultValue}>{analysisResult.condition}</Text>
//           </View>

//           <View style={styles.resultItem}>
//             <Text style={styles.resultLabel}>Confiança da Análise:</Text>
//             <View style={styles.confidenceContainer}>
//               <View style={[styles.confidenceBar, { width: `${analysisResult.confidence}%` }]} />
//               <Text style={styles.confidenceText}>{analysisResult.confidence}%</Text>
//             </View>
//           </View>

//           <View style={styles.resultItem}>
//             <Text style={styles.resultLabel}>Procedimento Recomendado:</Text>
//             <Text style={styles.resultValue}>{analysisResult.recommendedProcedure}</Text>
//           </View>

//           <View style={styles.resultItem}>
//             <Text style={styles.resultLabel}>Nível de Urgência:</Text>
//             <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(analysisResult.urgencyLevel) }]}>
//               <Text style={styles.urgencyText}>{getUrgencyText(analysisResult.urgencyLevel)}</Text>
//             </View>
//           </View>

//           <View style={styles.resultItem}>
//             <Text style={styles.resultLabel}>Observações Adicionais:</Text>
//             <Text style={styles.resultNotes}>{analysisResult.additionalNotes}</Text>
//           </View>

//           <View style={styles.disclaimerContainer}>
//             <Ionicons name="alert-circle" size={18} color="#666" />
//             <Text style={styles.disclaimerText}>
//               Esta análise é preliminar e não substitui o diagnóstico profissional do dentista durante a consulta.
//             </Text>
//           </View>
//         </View>
//       )}

//       {analysisResult && (
//         <TouchableOpacity
//           style={[styles.confirmButton, bookingInProgress && styles.disabledButton]}
//           onPress={handleBookAppointment}
//           disabled={bookingInProgress}
//         >
//           {bookingInProgress ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
//           )}
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     backgroundColor: "#0066cc",
//     padding: 20,
//     alignItems: "center",
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: "#e6e6e6",
//     marginTop: 5,
//   },
//   infoSection: {
//     backgroundColor: "#e6f7ff",
//     margin: 15,
//     borderRadius: 10,
//     padding: 15,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   infoIcon: {
//     marginRight: 10,
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#333",
//     flex: 1,
//     lineHeight: 20,
//   },
//   appointmentInfoSection: {
//     backgroundColor: "#fff",
//     margin: 15,
//     marginTop: 0,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   appointmentInfoTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   appointmentInfoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   appointmentInfoText: {
//     fontSize: 14,
//     color: "#333",
//     marginLeft: 8,
//   },
//   imageSection: {
//     backgroundColor: "#fff",
//     margin: 15,
//     marginTop: 0,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#333",
//   },
//   imageButtonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 15,
//   },
//   imageButton: {
//     backgroundColor: "#0066cc",
//     borderRadius: 10,
//     padding: 15,
//     alignItems: "center",
//     width: "45%",
//   },
//   imageButtonText: {
//     color: "#fff",
//     marginTop: 5,
//     fontWeight: "500",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     borderRadius: 10,
//     resizeMode: "cover",
//   },
//   changeImageButton: {
//     backgroundColor: "#0066cc",
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 10,
//   },
//   changeImageButtonText: {
//     color: "#fff",
//     fontWeight: "500",
//   },
//   analyzeButton: {
//     backgroundColor: "#4caf50",
//     borderRadius: 8,
//     padding: 15,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   analyzeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   analyzingContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   analyzingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#666",
//   },
//   resultsSection: {
//     backgroundColor: "#fff",
//     margin: 15,
//     marginTop: 0,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   resultItem: {
//     marginBottom: 15,
//   },
//   resultLabel: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 5,
//   },
//   resultValue: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "500",
//   },
//   confidenceContainer: {
//     height: 20,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 10,
//     overflow: "hidden",
//     position: "relative",
//   },
//   confidenceBar: {
//     height: "100%",
//     backgroundColor: "#4caf50",
//     borderRadius: 10,
//   },
//   confidenceText: {
//     position: "absolute",
//     right: 5,
//     top: 1,
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   urgencyBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     borderRadius: 15,
//     alignSelf: "flex-start",
//   },
//   urgencyText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   resultNotes: {
//     fontSize: 14,
//     color: "#333",
//     lineHeight: 20,
//   },
//   disclaimerContainer: {
//     flexDirection: "row",
//     backgroundColor: "#f9f9f9",
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: "flex-start",
//   },
//   disclaimerText: {
//     fontSize: 12,
//     color: "#666",
//     marginLeft: 5,
//     flex: 1,
//   },
//   confirmButton: {
//     backgroundColor: "#4caf50",
//     margin: 15,
//     marginTop: 0,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   disabledButton: {
//     backgroundColor: "#cccccc",
//   },
//   confirmButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// })

// export default ParrotTechScreen

