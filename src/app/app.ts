import { Component } from '@angular/core';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PerfilAdm], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'OverHub';
}
