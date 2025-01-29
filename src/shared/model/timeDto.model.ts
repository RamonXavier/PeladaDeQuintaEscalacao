import { JogadorDto } from "./jogadorDto.model";

export class TimeDto {
  nome?: string;
  jogadores: JogadorDto[] = [];
  nota: number = 0;
  imagem: string[] = [];
  id?: number;

  constructor(init?: Partial<TimeDto>) {
    Object.assign(this, init);
  }
}
