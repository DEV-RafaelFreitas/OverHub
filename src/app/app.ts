import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header';
import { Footer } from './shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { PerfilAdm } from './shared/perfil-adm/perfil-adm';
import { PerfilUser } from './shared/perfil-user/perfil-user';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PerfilAdm, PerfilUser, HeaderComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = 'OverHub';
}

