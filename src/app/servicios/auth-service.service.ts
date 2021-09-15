import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public isLogguedIn: boolean = false;

  constructor(public afAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.isLogguedIn = true;
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
