import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";
import { BuscarEstatisticasPartidasDto } from "../model/estatisticasPartidas/buscarEstatisticasPartidasDto.model";

@Injectable({
  providedIn: 'root'
})

export class EstatisticasPartidasApi {
  constructor(private http: HttpClient) {
  }

  public buscar(): Observable<BuscarEstatisticasPartidasDto[]> {
    return this.http.get<BuscarEstatisticasPartidasDto[]>(environment.base_url_estatisticasPartidas+'/1');
  }

  public atualizar(estatistica: BuscarEstatisticasPartidasDto[]): Observable<void> {
    return this.http.put<void>(environment.base_url_estatisticasPartidas+'/1', estatistica);
  }


  public atualizarFinal(estatistica: BuscarEstatisticasPartidasDto[]): Observable<void> {
    return this.http.put<void>(environment.base_url_estatisticasPartidas+'/3', estatistica);
  }
}
