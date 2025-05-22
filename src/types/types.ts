export interface User {
  usuarioId: number;
  cpf: string;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  genero: string;
  dataCadastro: string;
}

export interface EnderecoClinica {
  enderecoClinicaId: number;
  cepClinica: string;
  cidadeClinica: string;
  estadoClinica: string;
  logradouroClinica: string;
  bairroClinica: string;
}

export interface Clinic {
  clinicaId: number;
  nomeClinica: string;
  telefoneClinica: string;
  enderecos: EnderecoClinica[];
}

export interface Dentist {
  dentistaId: number;
  nomeDentista: string;
  especialidade: string;
  telefoneDentista: string;
  emailDentista: string;
  clinica: Clinic;
}

export interface Atendimento {
  status: string;
  atendimentoId: number;
  usuario: User;
  dentista: Dentist;
  clinica: Clinic;
  dataAtendimento: string;
  descricaoProcedimento: string;
  custo: number;
  dataRegistro: string;
}

export interface ImagemUsuario {
  imagemUsuarioId: number;
  usuario: {
    usuarioId: number;
    nome: string;
  };
  imagemUrl: string;
  dataEnvio: string;
}

export interface PrevisaoUsuario {
  previsaoUsuarioId: number;
  imagemUsuario: {
    imagemUsuarioId: number;
    imagemUrl: string;
  };
  usuario: {
    usuarioId: number;
    nome: string;
  };
  previsaoTexto: string;
  probabilidade: number;
  recomendacao: string;
  dataPrevisao: string;
}
