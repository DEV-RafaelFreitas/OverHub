import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Produto } from '@models/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:3000/produtos';

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api);
  }

  buscarPorId(id: number | string): Observable<Produto> {
    return this.http.get<Produto>(`${this.api}/${id}`);
  }

  incluir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.api, produto);
  }

  editar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.api}/${produto.id}`, produto);
  }

  excluir(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
