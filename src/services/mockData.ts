import { Appointment, Clinic, Dentist, Service, User } from "@/types/types"


export const mockUsers: User[] = [
  {
    usuario_id: "USR0001",
    cpf: "123.456.789-00",
    nome: "Julia",
    sobrenome: "Mariano",
    data_nascimento: "1990-05-15",
    genero: "F",
    data_cadastro: "2023-01-10",
  },
  {
    usuario_id: "USR0002",
    cpf: "987.654.321-00",
    nome: "João",
    sobrenome: "Santos",
    data_nascimento: "1985-08-22",
    genero: "M",
    data_cadastro: "2023-02-05",
  },
  {
    usuario_id: "USR0003",
    cpf: "456.789.123-00",
    nome: "Ana",
    sobrenome: "Oliveira",
    data_nascimento: "1995-11-30",
    genero: "F",
    data_cadastro: "2023-03-15",
  },
  {
    usuario_id: "USR0004",
    cpf: "789.123.456-00",
    nome: "Carlos",
    sobrenome: "Ferreira",
    data_nascimento: "1982-04-18",
    genero: "M",
    data_cadastro: "2023-01-20",
  },
  {
    usuario_id: "USR0005",
    cpf: "321.654.987-00",
    nome: "Juliana",
    sobrenome: "Costa",
    data_nascimento: "1988-09-25",
    genero: "F",
    data_cadastro: "2023-02-15",
  },
]

export const mockDentists: Dentist[] = [
  {
    dentista_id: "DEN0001",
    usuario_id: "USR0004",
    nome_dentista: "Dr. Carlos Ferreira",
    especialidade: "Ortodontia",
    telefone_dentista: "(11) 98765-4321",
    email_dentista: "carlos.ferreira@odontoprev.com",
  },
  {
    dentista_id: "DEN0002",
    usuario_id: "USR0005",
    nome_dentista: "Dra. Juliana Costa",
    especialidade: "Endodontia",
    telefone_dentista: "(11) 91234-5678",
    email_dentista: "juliana.costa@odontoprev.com",
  },
  {
    dentista_id: "DEN0003",
    usuario_id: "USR0006",
    nome_dentista: "Dr. Roberto Almeida",
    especialidade: "Cirurgia",
    telefone_dentista: "(11) 95555-9999",
    email_dentista: "roberto.almeida@odontoprev.com",
  },
  {
    dentista_id: "DEN0004",
    usuario_id: "USR0007",
    nome_dentista: "Dra. Camila Souza",
    especialidade: "Odontopediatria",
    telefone_dentista: "(11) 94444-8888",
    email_dentista: "camila.souza@odontoprev.com",
  },
  {
    dentista_id: "DEN0005",
    usuario_id: "USR0008",
    nome_dentista: "Dr. Marcelo Lima",
    especialidade: "Periodontia",
    telefone_dentista: "(11) 93333-7777",
    email_dentista: "marcelo.lima@odontoprev.com",
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "APP0001",
    dentista_id: "DEN0001",
    usuario_id: "USR0001",
    data: "2023-06-15",
    horario: "09:00",
    status: "agendado",
  },
  {
    id: "APP0002",
    dentista_id: "DEN0002",
    usuario_id: "USR0001",
    data: "2023-05-10",
    horario: "14:30",
    status: "concluido",
  },
  {
    id: "APP0003",
    dentista_id: "DEN0003",
    usuario_id: "USR0002",
    data: "2023-06-20",
    horario: "11:15",
    status: "agendado",
  },
]

export const mockClinics: Clinic[] = [
  {
    clinica_id: "CLI0001",
    nome_clinica: "OdontoPrev Central",
    endereco: "Av. Paulista, 1000, São Paulo - SP",
    telefone: "(11) 3333-4444",
    email: "central@odontoprev.com",
    horario_funcionamento: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h",
    latitude: -23.5673,
    longitude: -46.6494,
  },
  {
    clinica_id: "CLI0002",
    nome_clinica: "OdontoPrev Zona Sul",
    endereco: "Av. Santo Amaro, 500, São Paulo - SP",
    telefone: "(11) 5555-6666",
    email: "zonasul@odontoprev.com",
    horario_funcionamento: "Segunda a Sexta: 8h às 19h | Sábado: 8h às 13h",
    latitude: -23.6273,
    longitude: -46.6694,
  },
  {
    clinica_id: "CLI0003",
    nome_clinica: "OdontoPrev Zona Oeste",
    endereco: "Av. Faria Lima, 1500, São Paulo - SP",
    telefone: "(11) 7777-8888",
    email: "zonaoeste@odontoprev.com",
    horario_funcionamento: "Segunda a Sexta: 9h às 20h | Sábado: 9h às 14h",
    latitude: -23.5873,
    longitude: -46.6894,
  },
  {
    clinica_id: "CLI0004",
    nome_clinica: "OdontoPrev Zona Norte",
    endereco: "Av. Braz Leme, 800, São Paulo - SP",
    telefone: "(11) 9999-0000",
    email: "zonanorte@odontoprev.com",
    horario_funcionamento: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h",
    latitude: -23.5073,
    longitude: -46.6294,
  },
]

export const mockServices: Service[] = [
  {
    servico_id: "SRV0001",
    nome_servico: "Consulta de Avaliação",
    descricao: "Avaliação inicial com diagnóstico e plano de tratamento",
    duracao: "30 minutos",
    preco: 150.0,
    categoria: "Consultas",
  },
  {
    servico_id: "SRV0002",
    nome_servico: "Limpeza Dental",
    descricao: "Remoção de tártaro e placa bacteriana",
    duracao: "45 minutos",
    preco: 200.0,
    categoria: "Higiene",
  },
  {
    servico_id: "SRV0003",
    nome_servico: "Restauração Simples",
    descricao: "Restauração de cáries pequenas com resina",
    duracao: "40 minutos",
    preco: 250.0,
    categoria: "Restaurações",
  },
  {
    servico_id: "SRV0004",
    nome_servico: "Tratamento de Canal",
    descricao: "Remoção da polpa dentária inflamada ou infectada",
    duracao: "90 minutos",
    preco: 800.0,
    categoria: "Endodontia",
  },
  {
    servico_id: "SRV0005",
    nome_servico: "Extração Simples",
    descricao: "Remoção de dente com anestesia local",
    duracao: "30 minutos",
    preco: 300.0,
    categoria: "Cirurgia",
  },
  {
    servico_id: "SRV0006",
    nome_servico: "Clareamento Dental",
    descricao: "Clareamento profissional em consultório",
    duracao: "60 minutos",
    preco: 900.0,
    categoria: "Estética",
  },
  {
    servico_id: "SRV0007",
    nome_servico: "Aplicação de Flúor",
    descricao: "Aplicação de flúor para prevenção de cáries",
    duracao: "20 minutos",
    preco: 120.0,
    categoria: "Prevenção",
  },
  {
    servico_id: "SRV0008",
    nome_servico: "Instalação de Aparelho Ortodôntico",
    descricao: "Colocação de aparelho fixo ou removível",
    duracao: "90 minutos",
    preco: 1500.0,
    categoria: "Ortodontia",
  },
]

export const loginUser = (cpf: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.cpf === cpf)
      resolve(user || null)
    }, 1000)
  })
}

export const getDentists = (): Promise<Dentist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDentists)
    }, 1000)
  })
}

export const getDentistById = (id: string): Promise<Dentist | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dentist = mockDentists.find((d) => d.dentista_id === id)
      resolve(dentist)
    }, 500)
  })
}

export const getUserAppointments = (userId: string): Promise<Appointment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointments = mockAppointments.filter((a) => a.usuario_id === userId)
      resolve(appointments)
    }, 800)
  })
}

export const createAppointment = (appointment: Omit<Appointment, "id">): Promise<Appointment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAppointment: Appointment = {
        ...appointment,
        id: `APP${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
      }
      mockAppointments.push(newAppointment)
      resolve(newAppointment)
    }, 1000)
  })
}

export const getClinics = (): Promise<Clinic[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClinics)
    }, 800)
  })
}

export const getClinicById = (id: string): Promise<Clinic | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const clinic = mockClinics.find((c) => c.clinica_id === id)
      resolve(clinic)
    }, 500)
  })
}

export const getServices = (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServices)
    }, 800)
  })
}

export const getServiceById = (id: string): Promise<Service | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = mockServices.find((s) => s.servico_id === id)
      resolve(service)
    }, 500)
  })
}

export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers)
    }, 800)
  })
}

export const getUserById = (id: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.usuario_id === id)
      resolve(user)
    }, 500)
  })
}

