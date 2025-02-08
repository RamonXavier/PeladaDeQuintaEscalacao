import { CardsFifaService } from './../../shared/service/cardsFifa.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JogadorDto } from '../../shared/model/jogadorDto.model';
import html2canvas from 'html2canvas';
import { JogadoresService } from '../../shared/service/jogadores.service';

@Component({
  selector: 'app-geracaoIndividual',
  templateUrl: './geracaoIndividual.component.html',
  styleUrls: ['./geracaoIndividual.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class GeracaoIndividualComponent implements OnInit {

  public posicaoHorizontalInicial: number = 0;
  public posicaoVerticalInicial: number = -6;
  public golsAtleta?: number;
  public dataJogo?: string;
  public jogadores: JogadorDto[] = [];
  public jogadorSelecionado?: JogadorDto;
  public idJogadorSelecionado?: number;
  public nomeAtleta?: string = "Caça Rato";
  public apelidoSelecionado?: string;
  public cartinhaFifaSelecionada?: string = 'https://i.ibb.co/wZzZgfPd/CHAMPIONS-LEAGUE-RTTK-T23.png';
  public apelidosJogadores: string[] = [];
  public cartinhasFifa: string[] = []
  public goleiros: JogadorDto[] = [];
  public avulsos: JogadorDto[] = [];

  constructor(private _jogadoresService: JogadoresService, private _cardsFifaService: CardsFifaService) { }

  ngOnInit() {
    this.carregarJogadoresDoJsonConfigurado();
    this.cartinhasFifa = this._cardsFifaService.buscarCards();
    this.apelidosJogadores = this._cardsFifaService.buscarFrases();
  }

  private carregarJogadoresDoJsonConfigurado(): void {
    this.jogadores = [];

    this.jogadores = this._jogadoresService.buscarMensalistas();
    this.goleiros = this._jogadoresService.buscarGoleiros();
    this.avulsos = this._jogadoresService.buscarAvulsos();

    this.jogadores = [...this.jogadores, ...this.goleiros, ...this.avulsos];
  }

  public selecionarJogador(idJogadorSelecionado?: number):void {
    this.jogadorSelecionado = this.jogadores.find(x=>x.id == idJogadorSelecionado);
  }

  public selecionarApelido():void {
    const indiceAleatorio = Math.floor(Math.random() * this.apelidosJogadores.length);
    this.apelidoSelecionado = this.apelidosJogadores[indiceAleatorio];
  }

  public mudarCartinha():void {
    const indiceAleatorio = Math.floor(Math.random() * this.cartinhasFifa.length);
    this.cartinhaFifaSelecionada = this.cartinhasFifa[indiceAleatorio];
  }

  public captureStory():void {
    const storyElement = document.getElementById('storyDiv');

    if (storyElement) {
      storyElement.style.transform = 'none';

      html2canvas(storyElement, { scale: 2, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'story.png';
        link.click();

        storyElement.style.transform = 'scale(0.3)';
      });
    }
  }
}
