import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Todos o elementos
  allMoments: Moment[] = []
  
  //Moments que está sendo exibido
  moments: Moment[] = []

  faSearch = faSearch
  searchTerm: string = ''


  //Api para pegar os dados
  baseApiUrl = environment.baseApiUrl

  //todo Search

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      console.log(items.data)
      //Essa variável armazena todo os dados que estão e em data
      const data = items.data

      //Percorrendo os dados e pegando a propriedade da data para podermos formartar em PT-BR
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString('pt-BR')
      })

      //Adicionando os dados dentro das variáveis para preencher os campos no HTML
      this.allMoments = data
      this.moments = data
    })
  }

  search(event: Event):void {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.moments = this.allMoments.filter( moment => {
      return moment.title.toLowerCase().includes(value)
    })
  }

}
