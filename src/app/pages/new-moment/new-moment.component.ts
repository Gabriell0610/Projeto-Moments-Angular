import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService  } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText = 'Compartilhar'
  
  constructor( 
    private momentService: MomentService, 
    private messageService: MessagesService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  //Essa função tem que ser assíncrona,  pos irá trabalhar com API
  async createHandler(moment: Moment) {
    //Form Data é utilizado para pegar dados do formulários que contem arquivos
    //se fosse só texto poderia ser com JSON
    const formData = new FormData()

    formData.append('title', moment.title)
    formData.append('description', moment.description)
    
    //A verificação da imagem existe pois não colocamos validação ao envio de arquivo
    if(moment.image) {
      formData.append('image', moment.image)
    }

    //Enviar para o service
    await this.momentService.createMoment(formData).subscribe()

    //Exibir msg
    this.messageService.add('Momento Adicionado com sucesso!')

    // redirect
    this.router.navigate(['/'])

  }

}
