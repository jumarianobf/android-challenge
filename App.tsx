import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./src/navigation/AppNavigator"
import { UserProvider } from "@/context/UserContext"




export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  )
}

