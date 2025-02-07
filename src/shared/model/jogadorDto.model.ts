export class JogadorDto {
  id: number = 0;
  nome?: string;
  nota: number = 0;
  coroa?: boolean;
  img: string = '';
  pontuacao?: string;
  gols?: string;
  pote?: string;
  constructor(init?: Partial<JogadorDto>) {
    Object.assign(this, init);
  }
}
