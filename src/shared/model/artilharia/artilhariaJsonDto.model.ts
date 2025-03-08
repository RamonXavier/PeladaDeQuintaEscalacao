import { AtualizacaoArtilhariaJsonDto } from "./atualizacaoArtilhariaJsonDto.model";

export class ArtilhariaJsonDto {
  id?: number;
  artilhariaJson?: string;
  dataAtualizacao?: string;

  constructor(init?: Partial<ArtilhariaJsonDto>) {
    Object.assign(this, init);
  }
}
