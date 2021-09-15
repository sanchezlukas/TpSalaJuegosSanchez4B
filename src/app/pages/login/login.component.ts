import { AuthServiceService } from './../../servicios/auth-service.service';
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

  constructor(private router: Router, public authSvc: AuthServiceService) {}

  ngOnInit(): void {}

  // Entrar() {
  //   if (
  //     (this.usuario === 'admin' && this.clave === 'admin') ||
  //     (this.usuario === 'usuario' && this.clave === 'usuario')
  //   ) {
  //     this.router.navigate(['/home']);
  //   }
  // }

  async Entrar() {
    try {
      const user = await this.authSvc.login(this.usuario, this.clave);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: any) {
    if (user.user) {
      // this.router.navigate(['/']);
      this.router.navigate(['/home']);

      //guardo el log si ingresa ok
      // this.guardarLog();
      localStorage.setItem(
        'usuarioEnLinea',
        // JSON.stringify(this.loginForm.get('email')?.value)
        JSON.stringify(this.usuario)
      );
    } else if (user.code == 'auth/wrong-password') {
      // Swal.fire(
      //   'Contraseña incorrecta',
      //   'Revise la contraseña ingresada',
      //   'error'
      // );
    } else if (user.code == 'auth/user-not-found') {
      // Swal.fire('Correo rechazado', 'Revise el correo ingresado', 'error');
    } else if (user.__zone_symbol__state) {
      console.log(user);
      this.router.navigate(['/']);
      console.log('ingresaste correctamente');
    } else {
      console.log(user);
      // Swal.fire(
      //   'Algo Salio Mal!',
      //   'La contraseña o el correo son incorrectos, por favor vuelva a ingresarlos',
      //   'error'
      // );
    }
  }

  // guardarLog() {
  //   this.logs.email = this.loginForm.get('email')?.value;
  //   const fecha = new Date();
  //   this.logs.fecha = formatDate(fecha, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
  //   console.log(this.logs);
  //   this.authSvc.onSaveLog(this.logs);
  // }

  CargarUsuario(usuario: string, clave: string) {
    this.usuario = usuario;
    this.clave = clave;
  }
}
