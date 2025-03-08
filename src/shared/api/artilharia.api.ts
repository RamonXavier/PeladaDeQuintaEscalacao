import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";
import { ArtilhariaJsonDto } from "../model/artilharia/artilhariaJsonDto.model";

@Injectable({
  providedIn: 'root'
})

export class ArtilhariaApi {
  constructor(private http: HttpClient) {
  }

  public buscarTodos(): Observable<ArtilhariaJsonDto> {
    return this.http.get<ArtilhariaJsonDto>(environment.base_url_artilharia+'/1');
  }

  public atualizar(artilharia: ArtilhariaJsonDto): Observable<void> {
    return this.http.put<void>(environment.base_url_artilharia+'/1', artilharia);
  }
}
