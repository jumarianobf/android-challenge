import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import DentistListScreen from '../screens/DentistListScreen';
import DentistDetailScreen from '../screens/DentistDetailScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import ClinicScreen from '../screens/ClinicScreen';
import ClinicDetailScreen from '../screens/ClinicDetailScreen';
import ServiceScreen from '../screens/ServiceScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import UserScreen from '../screens/UserScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { Dentist, User, Clinic, Service } from '../types/types';

type DentistStackParamList = {
  DentistList: undefined;
  DentistDetail: { dentist: Dentist };
  BookAppointment: { dentist: Dentist };
};

type ClinicStackParamList = {
  ClinicList: undefined;
  ClinicDetail: { clinic: Clinic };
};

type ServiceStackParamList = {
  ServiceList: undefined;
  ServiceDetail: { service: Service };
};

type UserStackParamList = {
  UserList: undefined;
  UserDetail: { user: User };
};

type MainTabParamList = {
  Profile: undefined;
  Dentists: undefined;
  Clinics: undefined;
  Services: undefined;
  Appointments: undefined;
  Users: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const DentistStack = createStackNavigator<DentistStackParamList>();
const ClinicStack = createStackNavigator<ClinicStackParamList>();
const ServiceStack = createStackNavigator<ServiceStackParamList>();
const UserStack = createStackNavigator<UserStackParamList>();

const DentistStackNavigator = () => {
  return (
    <DentistStack.Navigator>
      <DentistStack.Screen name="DentistList" component={DentistListScreen} options={{ title: "Dentistas" }} />
      <DentistStack.Screen
        name="DentistDetail"
        component={DentistDetailScreen}
        options={{ title: "Detalhes do Dentista" }}
      />
      <DentistStack.Screen
        name="BookAppointment"
        component={AppointmentScreen}
        options={{ title: "Agendar Consulta" }}
      />
    </DentistStack.Navigator>
  );
};

const ClinicStackNavigator = () => {
  return (
    <ClinicStack.Navigator>
      <ClinicStack.Screen name="ClinicList" component={ClinicScreen} options={{ title: "Clínicas" }} />
      <ClinicStack.Screen
        name="ClinicDetail"
        component={ClinicDetailScreen}
        options={{ title: "Detalhes da Clínica" }}
      />
    </ClinicStack.Navigator>
  );
};

const ServiceStackNavigator = () => {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen name="ServiceList" component={ServiceScreen} options={{ title: "Atendimentos" }} />
      <ServiceStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Detalhes do Atendimento" }}
      />
    </ServiceStack.Navigator>
  );
};

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="UserList" component={UserScreen} options={{ title: "Usuários" }} />
      <UserStack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: "Detalhes do Usuário" }} />
    </UserStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Dentists") {
            iconName = focused ? "medical" : "medical-outline";
          } else if (route.name === "Appointments") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Clinics") {
            iconName = focused ? "business" : "business-outline";
          } else if (route.name === "Services") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Users") {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Tab.Screen
        name="Dentists"
        component={DentistStackNavigator}
        options={{ headerShown: false, title: "Dentistas" }}
      />
      <Tab.Screen name="Clinics" component={ClinicStackNavigator} options={{ headerShown: false, title: "Clínicas" }} />
      <Tab.Screen
        name="Services"
        component={ServiceStackNavigator}
        options={{ headerShown: false, title: "Atendimentos" }}
      />
      <Tab.Screen name="Appointments" component={AppointmentScreen} options={{ title: "Consultas" }} />
      <Tab.Screen name="Users" component={UserStackNavigator} options={{ headerShown: false, title: "Usuários" }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
