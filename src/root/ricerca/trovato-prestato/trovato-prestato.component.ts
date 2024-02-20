import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoriLibri } from '../../autori-libri';

@Component({
  selector: 'app-trovato-prestato',
  templateUrl: './trovato-prestato.component.html',
  styleUrls: ['./trovato-prestato.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class TrovatoPrestatoComponent implements OnInit {
  @Input() occorrenze: number = 0;
  @Input() trovato: AutoriLibri = new AutoriLibri("", "", "", "");
  @Output() eventoRestituzione = new EventEmitter<AutoriLibri>();

  libroDaRestituire: AutoriLibri = this.trovato;

  restituisciLibro() {
    this.libroDaRestituire.autore = this.trovato.autore;
    this.libroDaRestituire.titolo = this.trovato.titolo;
    this.libroDaRestituire.posizione = this.trovato.posizione;
    this.libroDaRestituire.prestito = '';
    
    this.eventoRestituzione.emit(this.libroDaRestituire);
  }

  constructor() { }

  ngOnInit() {
  }

}