// Endereço de entrega (etapa "Endereço" do carrinho)
export class Endereco {
  constructor(
    public cep: string,
    public rua: string,
    public numero: string,
    public complemento: string,
    public bairro: string,
    public cidade: string,
    public estado: string,
  ) { }
}

// Dados pessoais de quem compra
export interface Cliente {
  id?: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  rg: string;
  email: string;
  senha: string;
}