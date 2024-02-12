export class AutoriLibri {
  autore: string;
  titolo: string;
  posizione: string;
  prestito: string;
  constructor(autore: string, titolo: string, posizione: string, prestito: string) {
    this.autore = autore;
    this.titolo = titolo;
    this.posizione = posizione;
    this.prestito = prestito;
  }
}