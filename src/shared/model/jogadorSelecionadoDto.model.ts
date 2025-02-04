export class JogadorSelecionadoDto {
  id?: number = 0;
  nome?: string;

  constructor(init?: Partial<JogadorSelecionadoDto>) {
    Object.assign(this, init);
  }
}
