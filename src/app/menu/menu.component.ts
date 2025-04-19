import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { MenuConstant } from './menu.constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false,
})
export class MenuComponent implements OnInit {

  @Input() menuEscolhido: number = 0;
  @Output() alterarMenu: EventEmitter<number> = new EventEmitter();

  public menuSorteio: number = MenuConstant.Sorteio;
  public menuPontuacao: number = MenuConstant.Pontuacao;
  public menuGerarIndividual: number = MenuConstant.GerarIndividual;
  public menuArtilharia: number = MenuConstant.Artilharia;
  public menuJogar: number = MenuConstant.Jogar;

  constructor() { }

  ngOnInit() {
  }

  public escolherMenu(opcaoEscolhida: number):void {
    this.menuEscolhido = opcaoEscolhida;
    this.alterarMenu.emit(this.menuEscolhido);
  }
}
