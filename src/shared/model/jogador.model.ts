export interface Jogador {
  id?: number;
  nome?: string;
  foto?: string;
  nivel?: number;
  cor: 'azul' | 'preto' | 'vermelho';
  ativo?: boolean;
}
