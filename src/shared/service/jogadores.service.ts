import { Injectable } from "@angular/core";
import { JogadorDto } from '../model/jogadorDto.model';
import { JogadoresApi } from '../api/jogadores.api';

@Injectable({
  providedIn: 'root'
})

export class JogadoresService {
  constructor (private _jogadoresApi: JogadoresApi) { }

  public buscarMensalistas(): JogadorDto[] {
    return this._jogadoresApi.buscarMensalistas();
  }

  public buscarGoleiros(): JogadorDto[] {
    return this._jogadoresApi.buscarGoleiros();
  }

  public buscarAvulsos(): JogadorDto[] {
    return this._jogadoresApi.buscarMensalistas();
  }
}
