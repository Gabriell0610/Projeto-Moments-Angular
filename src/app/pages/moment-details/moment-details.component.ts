import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessagesService } from 'src/app/services/messages.service';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { Comment } from 'src/app/Comments';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment-details',
  templateUrl: './moment-details.component.html',
  styleUrls: ['./moment-details.component.css']
})
export class MomentDetailsComponent implements OnInit {
  moment?: Moment
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes
  faEdit = faEdit

  commentForm!: FormGroup

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService
      .getDetailsMoment(id)
      .subscribe(item => this.moment = item.data)

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username:  new FormControl('',[Validators.required])
    })  
  }

  get text() {
    return this.commentForm.get('text')!
  }
  get username() {
    return this.commentForm.get('username')!
  }

  //Função que remove o Moment
  async removeHandler(id: number ) {
    await this.momentService.removeMoment(id).subscribe()

    this.messageService.add('Momento excluído com sucesso!')

    this.router.navigate(['/'])
  }
  
  async onSubmit(formDirective: FormGroupDirective) {
    //Verificação para não mandar os dados para o backend
    if(this.commentForm.invalid){
      return
    }

    const data: Comment = this.commentForm.value
    console.log(data)
    data.momentId = Number(this.moment!.id)

    await this.commentService
    .createComment(data)
    .subscribe((comment) => this.moment!.comments!.push(comment.data))

    //Resetando o form
    this.commentForm.reset()

    formDirective.resetForm()

  }




}
