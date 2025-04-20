import { EstatisticasPartidasApi } from './../api/estatisticasPartidas.api';
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { ArtilhariaJsonDto } from "../model/artilharia/artilhariaJsonDto.model";
import { BuscarEstatisticasPartidasDto } from '../model/estatisticasPartidas/buscarEstatisticasPartidasDto.model';

@Injectable({
  providedIn: 'root'
})

export class EstatisticaPartidaService {
  constructor
  (
    private _estatisticaPartidaApi: EstatisticasPartidasApi,
    private _toastService: ToastrService
  ) { }

  public buscarTodos(): Promise<ArtilhariaJsonDto> {
    return new Promise((resolve, reject) => {
      this._estatisticaPartidaApi.buscar().subscribe((retorno: ArtilhariaJsonDto) => {
        resolve(retorno);
      }, erro => {
        this._toastService.error('', 'Houve uma falha ao buscar as estatisticas de partidas.', { toastClass: 'toast ngx-toastr', closeButton: true });
        reject(erro);
      });
    });
  }

  public atualizar(estatistica: BuscarEstatisticasPartidasDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this._estatisticaPartidaApi.atualizar(estatistica).subscribe((retorno: void) => {
        resolve();
      }, erro => {
          this._toastService.error('', 'Houve uma falha ao atualizar as estatisticas da partida', { toastClass: 'toast ngx-toastr', closeButton: true });
        reject(erro);
        });
    });
  }

  public atualizarFinal(estatistica: BuscarEstatisticasPartidasDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this._estatisticaPartidaApi.atualizarFinal(estatistica).subscribe((retorno: void) => {
        resolve();
      }, erro => {
          this._toastService.error('', 'Houve uma falha ao atualizar as estatisticas da partida', { toastClass: 'toast ngx-toastr', closeButton: true });
        reject(erro);
        });
    });
  }
}
