"use client"

import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { loginUser } from "../services/mockData"
import { useUser } from "@/context/UserContext"

const LoginScreen = () => {
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { setUser } = useUser()

  const handleLogin = async () => {
    if (!cpf.trim()) {
      Alert.alert("Erro", "Por favor, informe seu CPF")
      return
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, informe sua senha")
      return
    }

    setLoading(true)
    try {
      const user = await loginUser(cpf, password)

      if (user) {
        setUser(user)
      } else {
        Alert.alert("Erro", "CPF não encontrado ou senha incorreta")
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = async () => {
    setCpf("123.456.789-00")
    setPassword("senha123")
    setLoading(true)

    setTimeout(async () => {
      const user = await loginUser("123.456.789-00", "senha123")
      if (user) {
        setUser(user)
      }
      setLoading(false)
    }, 1000)
  }

  const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, "")

    let formatted = cleaned
    if (cleaned.length > 9) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`
    } else if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`
    } else if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`
    }

    return formatted
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>OdontoPrev</Text>
          <Text style={styles.tagline}>Cuidando do seu sorriso</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            value={cpf}
            onChangeText={(text) => setCpf(formatCPF(text))}
            keyboardType="number-pad"
            maxLength={14}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Entrar</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLoginButton} onPress={handleQuickLogin} disabled={loading}>
            <Text style={styles.quickLoginText}>Login Rápido (Demo)</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0066cc",
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  loginButton: {
    backgroundColor: "#0066cc",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  quickLoginButton: {
    marginTop: 15,
    alignItems: "center",
  },
  quickLoginText: {
    color: "#0066cc",
    fontSize: 14,
  },
})

export default LoginScreen

