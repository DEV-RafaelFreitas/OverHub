import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer,PerfilAdm,HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = 'OverHub';
}

