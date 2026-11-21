// Conta de acesso ao sistema (login)
export class Usuario {
  constructor(
    public id: number,
    public email: string,
    public senha: string,
    public perfil: 'cliente' | 'admin',
  ) {}
}