import { createStackNavigator } from "@react-navigation/stack"
import AuthNavigator from "./AuthNavigator"
import MainTabNavigator from "./MainTabNavigator"
import { useUser, } from "../context/UserContext"

const Stack = createStackNavigator()

const AppNavigator = () => {
  const { isLoggedIn } = useUser()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator

