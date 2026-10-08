export class Produto {
  constructor(
    public id: number,
    public nome: string,
    public marca: string,
    public descricao: string,
    public categoria: string,
    public preco: number,     // preço normal (parcelado no cartão)
    public estoque: number,
    public imagem: string,
  ) {}
}