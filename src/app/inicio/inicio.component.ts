import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem
  listaPostagem: Postagem[]
  tema:Tema = new Tema
  listaTema:Tema[]
  idTema:number
  temaPostagem:Tema = new Tema
  idTemaPostagem:number
  user:User = new User
  idUser:number
  idSelecionado:number


  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()
    this.postagemService.refreshToken()
    this.authService.refreshToken()
    this.pegarPostagens()
  }

  troca(){
    environment.fundo = 'bg-menu-2'
  }
  pegarUserId(){
    this.authService.getById(environment.id).subscribe((resp:User)=>{
      this.user = resp
    })
  }
  pegarTemaId(){
    this.temaService.getByIdTema(this.idTemaPostagem).subscribe((resp:Tema)=>{
      this.temaPostagem = resp
    })
  }

  pegarPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp:Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  pegarTemas(){
    this.temaService.getAllTemas().subscribe((resp:Tema[])=>{
      this.listaTema = resp
    })
  }

  pegarTemasId(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
      this.tema = resp
    })
/*     console.log(this.tema)
    console.table(this.listaPostagem) */
  }

  postar(){
    this.tema.id = this.idTema
    this.postagem.tema= this.tema
    this.user.id = environment.id
    this.postagem.usuario = this.user
    console.log(this.postagem)

    this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem)=>{
      this.postagem = resp
      alert('Postagem feita')
      this.pegarPostagens()
      this.pegarUserId()
      this.postagem=new Postagem
    })
  }

/* Deletar posts */
  selecionado(id:number){
    this.idSelecionado = id

  }
  pegarPostagemId(){
    this.postagemService.getById(this.idSelecionado).subscribe((resp:Postagem)=>{
      this.postagem = resp
    })
  }

  deletarPost(){
    this.postagemService.deletePostagem(this.idSelecionado).subscribe(()=>{
      alert('Postagem deletada com sucesso')
      this.postagem=new Postagem
      this.pegarPostagens()
      this.pegarUserId()
    })
  }

  alterar(){
    this.tema.id = this.idTema
    this.postagem.tema= this.tema
    this.user.id = environment.id
    this.postagem.usuario = this.user

    this.postagemService.putPostagem(this.postagem).subscribe((resp:Postagem)=>{
      this.postagem = resp
      alert("Postagem alterado com sucesso")
      console.log(this.postagem)
      this.postagem=new Postagem
      this.idTema=0
      this.pegarPostagens()
      this.pegarUserId()
      
    })
  }

  limpar(){
    this.postagem = new Postagem
  }
}
