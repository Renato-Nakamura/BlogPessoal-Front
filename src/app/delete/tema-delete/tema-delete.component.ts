import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema:Tema = new Tema()
  id: number
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.id = this.route.snapshot.params['id']
    this.findById(this.id)
  }

  findById(id:number){
    this.temaService.getByIdTema(id).subscribe((resp:Tema)=>{
      this.tema = resp
    })
  }

  deletarTema(){
    this.temaService.deletar(this.id).subscribe(()=>{
      alert('O tema foi deletado com sucesso!')
      this.router.navigate(['/tema'])
    })

  }
}
