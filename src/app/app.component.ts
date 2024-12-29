import { Component } from '@angular/core';
import { MenuConstant } from './menu/menu.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  standalone: false,
})
export class AppComponent {
  title = 'sorteio_pelada_de_quinta';
  public menuEscolhido: number = MenuConstant.Sorteio;
  public menuSorteio: number = MenuConstant.Sorteio;
  public menuPontuacao: number = MenuConstant.Pontuacao;


  constructor(){
    this.menuEscolhido = this.menuSorteio;
  }

  public alterarMenu(novoMenu: number):void{
    this.menuEscolhido = novoMenu;
  }
}
