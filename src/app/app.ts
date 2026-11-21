import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { Footer } from './shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = 'OverHub';
}

