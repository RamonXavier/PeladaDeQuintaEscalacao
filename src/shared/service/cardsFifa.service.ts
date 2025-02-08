import { Injectable } from "@angular/core";
import { CardsFifaApi } from "../api/cardsFifa.api";

@Injectable({
  providedIn: 'root'
})

export class CardsFifaService {
  constructor (private _cardsFifaApi: CardsFifaApi) { }

  public buscarCards(): string[] {
    return this._cardsFifaApi.buscarCards();
  }

  public buscarFrases(): string[] {
    return this._cardsFifaApi.buscarFrases();
  }
}
