import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pedido } from '@models/pedido';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private http = inject(HttpClient);
    private readonly api = 'http://localhost:3000/pedidos';

    incluir(pedido: Pedido): Observable<Pedido> {
        return this.http.post<Pedido>(this.api, pedido);
    }
}
