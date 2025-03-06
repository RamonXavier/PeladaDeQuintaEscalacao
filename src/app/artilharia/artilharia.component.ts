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
  styleUrls: ['./artilharia.component.css'],
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
    });
  }

  private carregarJogadores(): void {
    this.jogadores = [];
    this.jogadores = this._jogadoresService.buscarMensalistas();
    this.goleiros = this._jogadoresService.buscarGoleiros();

    this.jogadores = [...this.jogadores, ...this.goleiros];
  }

  async salvar(): Promise<void> {
    const divs = document.querySelectorAll('.testec.playerCard');

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

      await new Promise((resolve) => setTimeout(resolve, 200));

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
    }

    this.toastr.success('Imagem gerada com sucesso', '🚀Tudo certo!🚀');
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
}
