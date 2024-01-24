import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string = ''

  constructor() { }

  //A mensagem vem do componente que manda o momento para o sistema o new-moment-component
  add(message: string) {
    this.message = message

    setTimeout(() => {
      this.clear()
    },3000)

  }

  clear() {
    this.message = ''
  }
}
