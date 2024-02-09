export class AutoriLibri {
  autore: string;
  libro: string;
  posizione: string;
  prestito: string;
  constructor(autore: string, libro: string, posizione: string, prestito: string) {
    this.autore = autore;
    this.libro = libro;
    this.posizione = posizione;
    this.prestito = prestito;
  }
}