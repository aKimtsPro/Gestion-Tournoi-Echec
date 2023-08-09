import {Injectable} from '@angular/core';
import {TokenDTO, UserDTO} from "../models/user";
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlAPI = 'https://khun.somee.com/api'
  private _$isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _token: string | null = ''
  private _$username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _http: HttpClient,
              private _router: Router) {
  }


  login(username: string, password: string): Observable<TokenDTO> {
    return this._http.post<TokenDTO>(`${this._urlAPI}/login`, {username, password}).pipe(
      tap(() => this.setLogged(true)),
      tap((response: TokenDTO) => {
        this._token = response.token
        this.setUsername((response.user.username))
        if (this._token){
          localStorage.setItem('userRole', response.user.role)
        }
      })
    )
  }

  isAdmin(): boolean{
    return  localStorage.getItem(('userRole')) === 'Admin';
  }

  setLogged(value: boolean): void {
    this._$isLogged.next(value);
  }

  setUsername(value : string){
    this._$username.next(value)
  }

  get username() : Observable<string>{
    return this._$username
  }

  get $isLogged(): Observable<boolean> {
    return this._$isLogged.asObservable();
  }

  logout(): void {
    this._token = '';
    this.setLogged(false)
    this._router.navigateByUrl('/home')
  }
}
