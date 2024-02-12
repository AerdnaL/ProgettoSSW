import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trovato-libero',
  templateUrl: './trovato-libero.component.html',
  styleUrls: ['./trovato-libero.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class TrovatoLiberoComponent implements OnInit {
  @Input() occorrenze: number = 0;
  @Input() cercato: any;
  @Input() vediRicercaLibero: boolean = false;

  funzioneProva() {
    console.log(this.vediRicercaLibero);
    console.log(this.occorrenze);
  }

  constructor() { }

  ngOnInit() {
  }

}