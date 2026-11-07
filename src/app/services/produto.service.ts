import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Produto } from '@models/produto';
import { Observable } from 'rxjs';

@Service()
export class ProdutoService {
    private http = inject(HttpClient);
    private readonly api = "http://localhost:3000/produtos";

    buscarProdutoPorId(produtoId: number): Observable<Produto> {
        return this.http.get<Produto>(`${this.api}/${produtoId}`);
    }

    listarProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.api);
    }

    adicionarProduto(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(this.api, produto);
    }
    
    editarProduto(produto: Produto): Observable<Produto> {
        return this.http.put<Produto>(`${this.api}/${produto.id}`, produto);
    }

    deletarProduto(produtoId: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/${produtoId}`);
    }
}
