import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { ArtilhariaApi } from '../api/artilharia.api';
import { BuscarArtilhariaDto } from "../model/artilharia/buscarArtilhariaDto.model";
import { ArtilhariaJsonDto } from "../model/artilharia/artilhariaJsonDto.model";
import { AtualizacaoArtilhariaJsonDto } from "../model/artilharia/atualizacaoArtilhariaJsonDto.model";

@Injectable({
  providedIn: 'root'
})

export class ArtilhariaService {
  constructor
  (
    private _artilhariaApi: ArtilhariaApi,
    private _toastService: ToastrService
  ) { }

  public buscarTodos(): Promise<ArtilhariaJsonDto> {
    return new Promise((resolve, reject) => {
      this._artilhariaApi.buscarTodos().subscribe((retorno: ArtilhariaJsonDto) => {
        resolve(retorno);
      }, erro => {
        this._toastService.error('', 'Houve uma falha ao buscar a artilharia.', { toastClass: 'toast ngx-toastr', closeButton: true });
        reject(erro);
      });
    });
  }

  public pontuarJogadores(artilharia: BuscarArtilhariaDto[], datasDeAtualizacao: AtualizacaoArtilhariaJsonDto[], identificacao: string): Promise<void> {
    datasDeAtualizacao.push({
      dataAtualizacao: new Date().toString(),
      identificacao: identificacao
    })

    return new Promise((resolve, reject) => {
      let artilhariaJson: ArtilhariaJsonDto = {
        id: 1,
        artilhariaJson: JSON.stringify(artilharia),
        dataAtualizacao: JSON.stringify(datasDeAtualizacao)
      };

      this._artilhariaApi.atualizar(artilhariaJson).subscribe((retorno: void) =>
        {
          resolve();
        },
        erro => {
          this._toastService.error('', 'Houve uma falha ao atualizar a artilharia do jogador', { toastClass: 'toast ngx-toastr', closeButton: true })
        });
    });
  }
}
