import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default AuthNavigator

