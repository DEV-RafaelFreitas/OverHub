import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-perfil-user',
  styleUrl: './perfil-user.css',
  templateUrl: './perfil-user.html',
})
export class PerfilUser {
  nome:"Gustavo";
}
