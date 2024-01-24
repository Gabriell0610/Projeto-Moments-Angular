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

  //Todos o mementos
  allMoments: Moment[] = []

  //Array de momentos para busca
  momentsSearch: Moment[] = []

  //Api para pegar os dados
  baseApiUrl = environment.baseApiUrl

  //todo Search

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
  this.momentService.getMoments().subscribe((items) => {
    console.log(items)
    const data = items.data

    data.map((item) => {
      item.create_at = new Date(item.create_at!).toLocaleString('pt-BR')
    })

    this.allMoments = data
    this.momentsSearch = data
  })


  }


}
