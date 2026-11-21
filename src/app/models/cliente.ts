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
  ) {}
}

// Dados pessoais de quem compra
export class Cliente {
  constructor(
    public id: number,
    public usuarioId: number,   // liga o cliente à conta de login
    public nome: string,
    public cpf: string,
    public telefone: string,
    public endereco: Endereco,
  ) {}
}