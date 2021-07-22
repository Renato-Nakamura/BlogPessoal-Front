import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome:string
  foto: string
  fundo:string

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.fundo = environment.fundo
    this.foto =environment.foto
    this.nome = environment.nome
  }

  sair(){
    environment.foto=''
    environment.nome=''
    environment.token=''
    localStorage.removeItem('user')
    this.router.navigate(['/entrar'])
  }

}
