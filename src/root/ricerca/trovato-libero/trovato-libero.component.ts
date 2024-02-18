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
  @Output() eventoNominativo = new EventEmitter<string>();
  @Output() eventoRimozione = new EventEmitter<AutoriLibri>();

  inputPrestato: string = '';

  prestaLibro() {
    this.eventoNominativo.emit(this.inputPrestato);
  }

  rimuoviLibro() {
    this.eventoRimozione.emit(this.trovato);
  }

  constructor() { }

  ngOnInit() {
  }

}