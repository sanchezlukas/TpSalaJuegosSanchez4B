import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = '';
  clave = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  Entrar() {
    if (
      (this.usuario === 'admin' && this.clave === 'admin') ||
      (this.usuario === 'usuario' && this.clave === 'usuario')
    ) {
      this.router.navigate(['/home']);
    }
  }

  CargarUsuario(Usuario: string) {
    this.usuario = Usuario;
    this.clave = Usuario;
  }
}
