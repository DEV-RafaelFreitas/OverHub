export interface Produto {
  id: number,
  nome: string,
  marca: string,
  descricao: string,
  categoria: string,
  preco: number,     // preço normal (parcelado no cartão)
  estoque: number,
  imagem: string,
}