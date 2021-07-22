import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AuthService } from 'src/app/service/auth.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema:Tema = new Tema()

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute,
    private authService:AuthService
  ) { }

  ngOnInit(){
    this.authService.temUser()
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']//esse id foi pego da rota
    this.findById(id)
  }

  findById(id:number){
    this.temaService.getByIdTema(id).subscribe((resp:Tema)=>{
      this.tema = resp
    })
  }

  alterarTema(){
    this.temaService.alterar(this.tema).subscribe((resp:Tema)=>{
      this.tema=resp
      this.router.navigate(["/tema"])
    })
  }
}
