import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";
import { CriarLoggeracaoTimeDto } from "../model/criarLoggeracaoTimeDto.model";

@Injectable({
  providedIn: 'root'
})

export class LogGeracaoTimeApi {
  constructor(private http: HttpClient) {
  }

  public buscarTodos(): Observable<any[]> {
    return this.http.get<any[]>(environment.base_url_logGeracaoTime);
  }

  public criar(criarLoggeracaoTimeDto: CriarLoggeracaoTimeDto[]): Observable<void> {
    return this.http.post<void>(environment.base_url_logGeracaoTime, criarLoggeracaoTimeDto);
  }
}
