// "use client"

// // Adicione os imports necessários no topo do arquivo
// import { useState } from "react"
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Image,
//   Alert,
// } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { useUser } from "../context/UserContext"
// import * as ImagePicker from "expo-image-picker"

// // Tipo para as mensagens
// type Message = {
//   id: string
//   text?: string
//   imageUri?: string
//   sender: "user" | "parrot"
//   timestamp: Date
// }

// // Mensagens iniciais do chat
// const initialMessages: Message[] = [
//   {
//     id: "1",
//     text: "Olá! Sou o Parrot, seu assistente virtual de saúde bucal. Como posso ajudar você hoje?",
//     sender: "parrot",
//     timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
//   },
// ]

// // Respostas automáticas para simular a IA
// const autoResponses = [
//   "Entendi! Vou analisar essa informação para você.",
//   "Baseado nos seus sintomas, recomendo que você agende uma consulta com um de nossos especialistas.",
//   "Lembre-se de escovar os dentes pelo menos duas vezes ao dia e usar fio dental regularmente!",
//   "Dor de dente pode ser sinal de cárie ou inflamação. É importante consultar um dentista o quanto antes.",
//   "Manchas nos dentes podem ser causadas por alimentos, bebidas ou tabaco. Uma limpeza profissional pode ajudar.",
//   "Sangramento na gengiva pode indicar gengivite. Melhore sua higiene bucal e consulte um periodontista.",
//   "Você sabia? Trocar sua escova de dentes a cada 3 meses é essencial para uma boa higiene bucal.",
// ]

// const ParrotChatScreen = () => {
//   const { user } = useUser()
//   const [messages, setMessages] = useState<Message[]>(initialMessages)
//   const [inputText, setInputText] = useState("")
//   const [isTyping, setIsTyping] = useState(false)

//   // Função para enviar mensagem
//   const sendMessage = () => {
//     if (inputText.trim() === "") return

//     // Adiciona mensagem do usuário
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputText,
//       sender: "user",
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInputText("")
//     setIsTyping(true)

//     // Simula resposta do Parrot após um tempo
//     setTimeout(() => {
//       const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)]
//       const parrotMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: randomResponse,
//         sender: "parrot",
//         timestamp: new Date(),
//       }

//       setMessages((prev) => [...prev, parrotMessage])
//       setIsTyping(false)
//     }, 1500)
//   }

//   // Formata a hora da mensagem
//   const formatMessageTime = (date: Date) => {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//   }

//   // Atualize a função renderMessageItem para exibir imagens
//   const renderMessageItem = ({ item }: { item: Message }) => {
//     const isParrot = item.sender === "parrot"

//     return (
//       <View style={[styles.messageContainer, isParrot ? styles.parrotMessage : styles.userMessage]}>
//         {isParrot && (
//           <View style={styles.avatarContainer}>
//             <Ionicons name="analytics" size={24} color="#0066cc" />
//           </View>
//         )}
//         <View style={[styles.messageBubble, isParrot ? styles.parrotBubble : styles.userBubble]}>
//           {item.text && (
//             <Text style={[styles.messageText, isParrot ? styles.parrotText : styles.userText]}>{item.text}</Text>
//           )}
//           {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.messageImage} />}
//           <Text style={styles.timeText}>{formatMessageTime(item.timestamp)}</Text>
//         </View>
//       </View>
//     )
//   }

//   // Adicione as funções para capturar e selecionar imagens
//   const takePhoto = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync()
//       if (status !== "granted") {
//         Alert.alert("Permissão necessária", "Precisamos de permissão para acessar sua câmera.")
//         return
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       })

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         sendImageMessage(result.assets[0].uri)
//       }
//     } catch (error) {
//       console.error("Error taking photo:", error)
//       Alert.alert("Erro", "Ocorreu um erro ao tirar a foto. Por favor, tente novamente.")
//     }
//   }

//   const pickImage = async () => {
//     try {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
//       if (status !== "granted") {
//         Alert.alert("Permissão necessária", "Precisamos de permissão para acessar sua galeria.")
//         return
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       })

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         sendImageMessage(result.assets[0].uri)
//       }
//     } catch (error) {
//       console.error("Error picking image:", error)
//       Alert.alert("Erro", "Ocorreu um erro ao selecionar a imagem. Por favor, tente novamente.")
//     }
//   }

//   const sendImageMessage = (imageUri: string) => {
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       imageUri: imageUri,
//       sender: "user",
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setIsTyping(true)

//     setTimeout(() => {
//       const parrotMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: "Recebi sua imagem! Estou analisando a condição dental mostrada na foto.",
//         sender: "parrot",
//         timestamp: new Date(),
//       }

//       setMessages((prev) => [...prev, parrotMessage])
//       setIsTyping(false)

//       // Simula uma análise após mais tempo
//       setTimeout(() => {
//         const analysisMessage: Message = {
//           id: (Date.now() + 2).toString(),
//           text: "Baseado na imagem, parece haver sinais de possível gengivite. Recomendo agendar uma consulta com um de nossos especialistas para uma avaliação completa.",
//           sender: "parrot",
//           timestamp: new Date(),
//         }

//         setMessages((prev) => [...prev, analysisMessage])
//       }, 3000)
//     }, 1500)
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
//     >
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Parrot Chat</Text>
//         <Text style={styles.headerSubtitle}>Seu assistente de saúde bucal</Text>
//       </View>

//       <FlatList
//         data={messages}
//         renderItem={renderMessageItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.messagesList}
//         inverted={false}
//       />

//       {isTyping && (
//         <View style={styles.typingContainer}>
//           <View style={styles.typingBubble}>
//             <Text style={styles.typingText}>Parrot está digitando</Text>
//             <ActivityIndicator size="small" color="#0066cc" />
//           </View>
//         </View>
//       )}

//       <View style={styles.inputContainer}>
//         <View style={styles.inputActions}>
//           <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
//             <Ionicons name="camera" size={24} color="#0066cc" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
//             <Ionicons name="images" size={24} color="#0066cc" />
//           </TouchableOpacity>
//         </View>
//         <TextInput
//           style={styles.input}
//           placeholder="Digite sua mensagem..."
//           value={inputText}
//           onChangeText={setInputText}
//           multiline
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={inputText.trim() === ""}>
//           <Ionicons name="send" size={24} color={inputText.trim() === "" ? "#ccc" : "#0066cc"} />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
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
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: "#e6e6e6",
//   },
//   messagesList: {
//     padding: 15,
//     paddingBottom: 20,
//   },
//   messageContainer: {
//     flexDirection: "row",
//     marginBottom: 15,
//     maxWidth: "80%",
//   },
//   parrotMessage: {
//     alignSelf: "flex-start",
//   },
//   userMessage: {
//     alignSelf: "flex-end",
//     flexDirection: "row-reverse",
//   },
//   avatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#e6f7ff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   messageBubble: {
//     padding: 12,
//     borderRadius: 18,
//     maxWidth: "100%",
//   },
//   parrotBubble: {
//     backgroundColor: "#e6f7ff",
//     borderTopLeftRadius: 4,
//   },
//   userBubble: {
//     backgroundColor: "#0066cc",
//     borderTopRightRadius: 4,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   parrotText: {
//     color: "#333",
//   },
//   userText: {
//     color: "#fff",
//   },
//   timeText: {
//     fontSize: 11,
//     color: "#888",
//     alignSelf: "flex-end",
//   },
//   typingContainer: {
//     paddingHorizontal: 15,
//     marginBottom: 10,
//   },
//   typingBubble: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     padding: 8,
//     borderRadius: 16,
//     alignSelf: "flex-start",
//     maxWidth: "50%",
//   },
//   typingText: {
//     fontSize: 12,
//     color: "#666",
//     marginRight: 5,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 10,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     maxHeight: 100,
//     fontSize: 16,
//   },
//   sendButton: {
//     marginLeft: 10,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   messageImage: {
//     width: 200,
//     height: 150,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   inputActions: {
//     flexDirection: "row",
//     marginRight: 8,
//   },
//   actionButton: {
//     marginHorizontal: 4,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//   },
// })

// export default ParrotChatScreen

