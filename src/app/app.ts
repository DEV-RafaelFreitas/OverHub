
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PerfilAdm,HeaderComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'OverHub';
}
