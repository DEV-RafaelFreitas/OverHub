import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
    private readonly API = 'http://localhost:3000/usuarios';

    constructor(private http: HttpClient) { }

    incluir(cliente: object): Observable<object> {
        return this.http.post<object>(this.API, cliente);
    }
}