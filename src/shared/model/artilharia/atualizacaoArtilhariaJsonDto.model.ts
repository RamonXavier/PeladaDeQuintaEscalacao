export class AtualizacaoArtilhariaJsonDto {
  dataAtualizacao?: string;
  identificacao?: string;

  constructor(init?: Partial<AtualizacaoArtilhariaJsonDto>) {
    Object.assign(this, init);
  }
}
