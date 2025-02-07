import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JogadorDto } from '../../shared/model/jogadorDto.model';
import jogadoresData from './../../assets/jogadores.json';
import html2canvas from 'html2canvas';

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
  public apelidosJogadores = [
    {nome: "Bombástico!"},
{nome: "El Caçador"},
{nome: "Artilheiro"},
{nome: "Canhão"},
{nome: "Mágico"},
{nome: "Trovão"},
{nome: "Foguete"},
{nome: "Pantera"},
{nome: "Furacão"},
{nome: "Predador"},
{nome: "Gênio"},
{nome: "Invencível"},
{nome: "Rápido e Furioso"},
{nome: "Tormenta"},
{nome: "Leão"},
{nome: "Mestre do Drible"},
{nome: "Matador"},
{nome: "Lendário"},
{nome: "Monstro"},
{nome: "Rei da Área"},
{nome: "Fenômeno"},
{nome: "Ninja"},
{nome: "Tubarão"},
{nome: "Míssil"},
{nome: "Gigante"},
{nome: "Demolidor"},
{nome: "Goleador"},
{nome: "Zica das Galáxias"},
{nome: "Imparável"},
{nome: "Bala de Prata"},
{nome: "Chute Certeiro"},
{nome: "O Iluminado"},
{nome: "Showman"},
{nome: "Batedor de Elite"},
{nome: "Espartano"},
{nome: "Imperador"},
{nome: "Camisa 10"},
{nome: "Muralha"},
{nome: "Raio"},
{nome: "Sniper"},
{nome: "Águia"},
{nome: "Torpedo"},
{nome: "Astro"},
{nome: "Viking"},
{nome: "Encantador da Bola"},
{nome: "Guerreiro"},
{nome: "Trovador"},
{nome: "Fera"},
{nome: "Dinamite"},
{nome: "Coringa"},
{nome: "Assassino da Rede"},
{nome: "Flecha Azul"},
{nome: "Mão de Ouro"},
{nome: "Pé de Anjo"},
{nome: "Craque Nato"},
{nome: "Trovão Negro"},
{nome: "Motorzinho"},
{nome: "Rei do Passe"},
{nome: "Artilheiro Nato"},
{nome: "Bola de Fogo"},
{nome: "Gol de Placa"},
{nome: "Relâmpago"},
{nome: "Gênio da Bola"},
{nome: "Patrão da Área"},
{nome: "Cometa"},
{nome: "Vento Cortante"},
{nome: "Camisa 7"},
{nome: "Tanque"},
{nome: "Zagueiro de Aço"},
{nome: "Tigre"},
{nome: "El Patrón"},
{nome: "Mestre do Gol"},
{nome: "Míssil Humano"},
{nome: "Domador da Bola"},
{nome: "Terror da Zaga"},
{nome: "Encantador de Redes"},
{nome: "Pantera Negra"},
{nome: "Falcão Dourado"},
{nome: "Goleiro Voador"},
{nome: "O Infiltrador"},
{nome: "Cobra Criada"},
{nome: "Mestre do Toque"},
{nome: "Tigre Branco"},
{nome: "Rei do Drible"},
{nome: "Muralha Humana"},
{nome: "Fantasma da Área"},
{nome: "Leão Indomável"},
{nome: "Pistoleiro"},
{nome: "O Franco Atirador"},
{nome: "O Fantástico"},
{nome: "Chute Relâmpago"},
{nome: "O Maestro"},
{nome: "Fome de Gol"},
{nome: "Mestre da Caneta"},
{nome: "O Rei da Finalização"},
{nome: "Gênio Tático"},
{nome: "A Máquina"},
{nome: "Tanque Humano"},
{nome: "Relâmpago Azul"},
{nome: "Colosso"},
{nome: "O Matador"},
{nome: "Rei da Assistência"},
{nome: "Dono da Bola"},
{nome: "Camaleão"},
{nome: "O Maestro da Bola"},
{nome: "Pantera do Gramado"}
  ];
  public goleiros: JogadorDto[] = [];
  public avulsos: JogadorDto[] = [];

  constructor() { }

  ngOnInit() {
    this.carregarJogadoresDoJsonConfigurado();
  }

  private carregarJogadoresDoJsonConfigurado(): void {
    this.jogadores = (jogadoresData as any).jogadores;
    this.goleiros = (jogadoresData as any).goleiros;
    this.avulsos = (jogadoresData as any).avulsos;

    this.goleiros.forEach(goleiro => {
      this.jogadores.push(goleiro);
    });

    this.avulsos.forEach(goleiro => {
      this.jogadores.push(goleiro);
    });
  }

  public selecionarJogador(idJogadorSelecionado?: number):void {
    this.jogadorSelecionado = this.jogadores.find(x=>x.id == idJogadorSelecionado);
  }

  public selecionarApelido():void {
    const indiceAleatorio = Math.floor(Math.random() * this.apelidosJogadores.length);
    this.apelidoSelecionado = this.apelidosJogadores[indiceAleatorio].nome;
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
