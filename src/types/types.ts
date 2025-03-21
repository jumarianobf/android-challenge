export interface User {
    usuario_id: string
    cpf: string
    nome: string
    sobrenome: string
    data_nascimento: string
    genero: string
    data_cadastro: string
  }
  
  export interface Dentist {
    dentista_id: string
    usuario_id: string
    nome_dentista: string
    especialidade: string
    telefone_dentista: string
    email_dentista: string
  }
  
  export interface Appointment {
    id: string
    dentista_id: string
    usuario_id: string
    data: string
    horario: string
    status: "agendado" | "concluido" | "cancelado"
  }
  
  export interface Clinic {
    clinica_id: string
    nome_clinica: string
    endereco: string
    telefone: string
    email: string
    horario_funcionamento: string
    latitude?: number
    longitude?: number
  }
  
  export interface Service {
    servico_id: string
    nome_servico: string
    descricao: string
    duracao: string
    preco: number
    categoria: string
  }
  
  