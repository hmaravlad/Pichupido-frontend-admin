import Vue from 'vue';
import http from '@/_shared/utils/http';

class Auth {
  public hub: any;
  public _user!: User;

  constructor() {
    this.hub = new Vue();
    this._user = localStorage.user ? JSON.parse(localStorage.user) : null;
  }

  public saveUser(data: AuthResponse) {
    this._user = data.user;
    localStorage.setItem('user', JSON.stringify(this._user));
    // localStorage.setItem('token', JSON.stringify(data.token));
    http.setAxios();
    this.hub.$emit('update');
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.hub.$emit('update');
  }

  async isSuperAdmin(): Promise<boolean> {
    return await http.get(`/accounts/permissions-check`).then((res: { grantAccess: boolean }) => {
      return res.grantAccess;
    });
  }

  get user(): User {
    return this._user;
  }
}

export const AuthService = new Auth();

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  photo: string;
}
