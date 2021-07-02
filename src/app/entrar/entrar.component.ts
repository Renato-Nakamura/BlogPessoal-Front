import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0,0)
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin)=> {
      this.userLogin = resp
      environment.foto =this.userLogin.foto
      environment.nome = this.userLogin.nome
      environment.token = this.userLogin.token
      environment.fundo = 'bg-menu'
      
      console.log(environment.foto)
      console.log(environment.nome)
      console.log(environment.token)
      console.log('fim')

      this.router.navigate(['/inicio'])
    }, erro =>{
      if(erro.status == 500){
        alert('Usuário ou senha inválidos.')
      }
    })
  }
}
