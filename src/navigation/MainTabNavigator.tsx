import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import DentistListScreen from "../screens/DentistListScreen";
import DentistDetailScreen from "../screens/DentistDetailScreen";
import ClinicScreen from "../screens/ClinicScreen";
import ClinicDetailScreen from "../screens/ClinicDetailScreen";
import AtendimentoScreen from "../screens/AtendimentoScreen"; 
import AtendimentoDetailScreen from "../screens/AtendimentoDetailScreen";
import AtendimentoFormScreen from "../screens/AtendimentoForm";
import ChatScreen from "../screens/ChatScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { Dentist, Clinic } from "../types/types";

// Tipagem das rotas
type DentistStackParamList = {
  DentistList: undefined;
  DentistDetail: { dentist: Dentist };
  BookAppointment: { dentist: Dentist };
};

type ClinicStackParamList = {
  ClinicList: undefined;
  ClinicDetail: { clinic: Clinic };
};

type AtendimentoStackParamList = {
  AtendimentoList: { refresh?: boolean };
  AtendimentoDetail: { atendimentoId: number };
  AtendimentoForm: { atendimentoId?: number };
};

type ProfileStackParamList = {
  ProfileMain: undefined;
  AtendimentoList: undefined;
};

type MainTabParamList = {
  Profile: undefined;
  Dentists: undefined;
  Atendimento: undefined;
  ParrotChat: undefined;
  Clinics: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const DentistStack = createStackNavigator<DentistStackParamList>();
const ClinicStack = createStackNavigator<ClinicStackParamList>();
const AtendimentoStack = createStackNavigator<AtendimentoStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// Navegação Dentistas
const DentistStackNavigator = () => (
  <DentistStack.Navigator>
    <DentistStack.Screen name="DentistList" component={DentistListScreen} options={{ title: "Dentistas" }} />
    <DentistStack.Screen name="DentistDetail" component={DentistDetailScreen} options={{ title: "Detalhes do Dentista" }} />
    <DentistStack.Screen name="BookAppointment" component={AtendimentoScreen} options={{ title: "Agendar Consulta" }} />
  </DentistStack.Navigator>
);

// Navegação Clínicas
const ClinicStackNavigator = () => (
  <ClinicStack.Navigator>
    <ClinicStack.Screen name="ClinicList" component={ClinicScreen} options={{ title: "Clínicas" }} />
    <ClinicStack.Screen name="ClinicDetail" component={ClinicDetailScreen} options={{ title: "Detalhes da Clínica" }} />
  </ClinicStack.Navigator>
);

// Navegação Atendimentos
const AtendimentoStackNavigator = () => (
  <AtendimentoStack.Navigator>
    <AtendimentoStack.Screen 
      name="AtendimentoList" 
      component={AtendimentoScreen} 
      options={{ title: "Atendimentos" }} 
    />
    <AtendimentoStack.Screen 
      name="AtendimentoDetail" 
      component={AtendimentoDetailScreen} 
      options={{ title: "Detalhes do Atendimento" }} 
    />
    <AtendimentoStack.Screen 
      name="AtendimentoForm" 
      component={AtendimentoFormScreen} 
      options={{ title: "Novo Atendimento" }} 
    />
  </AtendimentoStack.Navigator>
);

// Navegação Perfil
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: "Perfil", headerShown: false }} />
    <ProfileStack.Screen name="AtendimentoList" component={AtendimentoScreen} options={{ title: "Meus Atendimentos" }} />
  </ProfileStack.Navigator>
);

// Navegação Principal (Bottom Tab)
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;

          switch (route.name) {
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Dentists":
              iconName = focused ? "medical" : "medical-outline";
              break;
            case "Atendimento":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "ParrotChat":
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              break;
            case "Clinics":
              iconName = focused ? "business" : "business-outline";
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{ headerShown: false, title: "Perfil" }} />
      <Tab.Screen name="Dentists" component={DentistStackNavigator} options={{ headerShown: false, title: "Dentistas" }} />
      <Tab.Screen name="ParrotChat" component={ChatScreen} options={{ headerShown: true, title: "Chat IA" }} />
      <Tab.Screen name="Atendimento" component={AtendimentoStackNavigator} options={{ headerShown: false, title: "Atendimentos" }} />
      <Tab.Screen name="Clinics" component={ClinicStackNavigator} options={{ headerShown: false, title: "Clínicas" }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
