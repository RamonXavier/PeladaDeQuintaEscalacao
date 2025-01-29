export class JogadorDto {
  id: number = 0;
  nome?: string;
  nota: number = 0;
  coroa?: boolean;
  img: string = '';
  pote: number = 0;

  constructor(init?: Partial<JogadorDto>) {
    Object.assign(this, init);
  }
}
