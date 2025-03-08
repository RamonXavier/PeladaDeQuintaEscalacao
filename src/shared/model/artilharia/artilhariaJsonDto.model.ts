export class ArtilhariaJsonDto {
  id?: number;
  artilhariaJson?: string;

  constructor(init?: Partial<ArtilhariaJsonDto>) {
    Object.assign(this, init);
  }
}
