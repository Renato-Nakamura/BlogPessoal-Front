import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  fundo:string

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.fundo = environment.fundo
  }

  sair(){
    environment.foto=''
    environment.nome=''
    environment.token=''
    this.router.navigate(['/entrar'])
  }

}
