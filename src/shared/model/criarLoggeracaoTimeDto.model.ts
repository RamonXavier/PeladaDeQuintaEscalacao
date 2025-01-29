import { JogadorDto } from "./jogadorDto.model";

export class CriarLoggeracaoTimeDto {
  jogadores?: JogadorDto[] = [];
  nome?: string;
  dataGeracaoTime?: string | Date;
  nota?: string;
  id?: number;

  constructor(init?: Partial<CriarLoggeracaoTimeDto>) {
    Object.assign(this, init);
  }
}
