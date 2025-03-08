import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { JogadoresService } from '../../shared/service/jogadores.service';
import { JogadorDto } from '../../shared/model/jogadorDto.model';
import { ArtilhariaService } from '../../shared/service/artilharia.service';
import { BuscarArtilhariaDto } from '../../shared/model/artilharia/buscarArtilhariaDto.model';

@Component({
  selector: 'app-artilharia',
  templateUrl: './artilharia.component.html',
  styleUrls: ['./artilharia.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})

export class ArtilhariaComponent implements OnInit {
  public artilhariaListagem: BuscarArtilhariaDto[] = [];
  public jaGerouNota:boolean = false;
  public editandoJogadores: boolean = false;
  public jogadores: JogadorDto[] = [];
  public goleiros: JogadorDto[] = [];
  public imagemCardFifa: string = "https://i.ibb.co/3Nw177S/card-fifa.png";
  public imagemAvulso = 'https://i.ibb.co/DKgB6RP/cris.png';
  public gerandoArtilharia: boolean = false;

  constructor (private toastr: ToastrService, private _jogadoresService: JogadoresService, private _artilharia: ArtilhariaService){
  }


  ngOnInit(): void {
    this.carregarJogadores();

    this._artilharia.buscarTodos().then(retorno => {
      this.artilhariaListagem = retorno;
      this.artilhariaListagem.forEach(jogador => {
        jogador.imagemJogador = this.jogadores.find(x=>x.id == jogador.idJogador)?.img;
        jogador.totalGols = jogador.janeiro + jogador.fevereiro + jogador.marco + jogador.abril + jogador.maio + jogador.junho + jogador.julho + jogador.agosto + jogador.setembro + jogador.outubro + jogador.novembro + jogador.dezembro;
      });
      this.artilhariaListagem.sort((a, b) => b.totalGols - a.totalGols);
    });
  }

  private carregarJogadores(): void {
    this.jogadores = [];
    this.jogadores = this._jogadoresService.buscarMensalistas();
    this.goleiros = this._jogadoresService.buscarGoleiros();

    this.jogadores = [...this.jogadores, ...this.goleiros];
  }

  async salvar(): Promise<void> {
    this.gerandoArtilharia = true;
    const divs = document.querySelectorAll('.testec');

    for (const div of Array.from(divs)) {
      const htmlElement = div as HTMLElement; // Cast explícito para HTMLElement

      // Salvar estilos originais
      const originalWidth = htmlElement.style.width;
      const originalMaxWidth = htmlElement.style.maxWidth;
      const originalTransform = htmlElement.style.transform;

      // Ajuste temporário para capturar a imagem corretamente
      htmlElement.style.width = '1200px';
      htmlElement.style.maxWidth = 'none';
      htmlElement.style.transform = 'scale(1)';

      // Captura a imagem com alta qualidade
      const canvas = await html2canvas(htmlElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        windowWidth: 1200,
        windowHeight: htmlElement.scrollHeight,
      });

      // Restaurar estilos originais após a captura
      htmlElement.style.width = originalWidth;
      htmlElement.style.maxWidth = originalMaxWidth;
      htmlElement.style.transform = originalTransform;

      const image = canvas.toDataURL('image/png', 1.0);
      this.downloadImage(image, `pontuaçãoDaSemana.png`);
      this.gerandoArtilharia = false;
      this.toastr.success('Imagem gerada com sucesso', '🚀Tudo certo!🚀');
    }
  }

  public pontuarJogadores(novosJogadores: JogadorDto[]): void{
    this.jogadores = novosJogadores;
    this.toastr.success('Os jogadores foram pontuados', '🚀Tudo certo!🚀');
    this.jaGerouNota = true;
  }

  private downloadImage(dataUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }

  public alterarImagemJogador(id: number): void{

    this.jogadores.forEach(jogador => {
          if(jogador.id == id){
            let novoJogador: JogadorDto = {
              id: jogador.id,
              img: 'https://sportrenders.com/wp-content/uploads/2023/10/Cristiano-Ronaldo-Render-PNG-Al-Nassr-Image-Sport-Renders-1.png',
              nome: jogador?.nome,
              coroa: jogador.coroa,
              nota: jogador?.nota,
              pote: jogador?.pote,
              pontuacao: jogador.pontuacao,
              gols: jogador.gols
            }
            jogador = novoJogador;
          }
    });
  }

  public getClassByIndex(index: number, idJogador: string): string {
    let classeCss = '';
    if (index < 5) {
      classeCss = 'nivel-bom';  // Verde
    } else if (index < 10) {
      classeCss = 'nivel-moderado';  // Amarelo
    } else {
      classeCss = 'nivel-critico';  // Vermelho
    }

    return classeCss;
  }

  public getAjusteImagem(idJogador: string):string {
    let idJogadorParaAjustar: string[] = [
      '4', //Rapahel rufino
      '1', // flavim
      '2', // colombo
      '5', // junim
      '15', // coroa
      '6', // tiguim
    ];

    let idJogadorParaAjustarG2: string[] = [
      '3', // caça rato
      '13', // bebe leite
    ];
    let classeCss = '';

    if(idJogadorParaAjustar.includes(idJogador.toString()))
      classeCss += 'artilharia-ajusteImagem';

    if(idJogadorParaAjustarG2.includes(idJogador.toString()))
      classeCss += 'artilharia-ajusteImagem-g2';

    return classeCss
  }
}
