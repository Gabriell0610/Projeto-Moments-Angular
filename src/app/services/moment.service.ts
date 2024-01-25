import { Injectable } from '@angular/core';
import { Moment } from '../Moment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../Response';


@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`

  
  constructor(private http: HttpClient) { }


  createMoment(formData: FormData):Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  //Response<Moment[]>: O generics Response é usado para tipar a estrutura da resposta HTTP esperada. 
  //Aqui, Moment[] é a tipagem dos dados que a resposta deve conter. 
  //Isso significa que a resposta da requisição deve ser um objeto que tenha uma propriedade data 
  // contendo um array de objetos do tipo Moment
  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getDetailsMoment(id: number):Observable<Response<Moment>> {
    return this.http.get<Response<Moment>>(`${this.apiUrl}/${id}`)
  }

  removeMoment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }


  updateMoment(id: number, formData: FormData):Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData)
  }
  
}
