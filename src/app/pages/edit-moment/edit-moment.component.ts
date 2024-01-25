import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: Moment
  btnText: string = 'Editar'

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService : MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'))

   this.momentService.getDetailsMoment(id).subscribe(item => this.moment = item.data)
  }

  async editHandler(moment: Moment) {
    const id = this.moment.id

    const formData = new FormData()

    formData.append('title', moment.title)
    formData.append('description', moment.description)
    
    //A verificação da imagem existe pois não colocamos validação ao envio de arquivo
    if(moment.image) {
      formData.append('image', moment.image)
    }

    //Enviar para o service
    await this.momentService.updateMoment(id!, formData).subscribe()

    //Exibir msg
    this.messageService.add('Momento editado com sucesso!')

    // redirect
    this.router.navigate(['/'])
  }

}
