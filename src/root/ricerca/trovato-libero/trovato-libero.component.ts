import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoriLibri } from '../../autori-libri';

@Component({
  selector: 'app-trovato-libero',
  templateUrl: './trovato-libero.component.html',
  styleUrls: ['./trovato-libero.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class TrovatoLiberoComponent implements OnInit {
  @Input() occorrenze: number = 0;
  @Input() trovato: AutoriLibri = new AutoriLibri("", "", "", "");
  @Input() vediRicercaLibero: boolean = false;
  @Output() eventoNominativo = new EventEmitter<AutoriLibri>();
  @Output() eventoRimozione = new EventEmitter<AutoriLibri>();

  inputPrestato: string = '';
  /*libroDaPrestare : AutoriLibri = new AutoriLibri(
    this.trovato.autore,
    this.trovato.titolo,
    this.trovato.posizione,
    this.inputPrestato
  );*/
  libroDaPrestare: AutoriLibri = new AutoriLibri("", "", "", "");

  prestaLibro() {
    this.libroDaPrestare.autore = this.trovato.autore;
    this.libroDaPrestare.titolo = this.trovato.titolo;
    this.libroDaPrestare.posizione = this.trovato.posizione;
    this.libroDaPrestare.prestito = this.inputPrestato;
    
    this.eventoNominativo.emit(this.libroDaPrestare);
    console.log(this.libroDaPrestare);
    console.log(this.inputPrestato);
  }

  rimuoviLibro() {
    this.eventoRimozione.emit(this.trovato);
  }

  constructor() { }

  ngOnInit() {
  }

}