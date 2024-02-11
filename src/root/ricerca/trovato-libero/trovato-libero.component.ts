import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoriLibri } from '../../autori-libri';

@Component({
  selector: 'app-trovato-libero',
  templateUrl: './trovato-libero.component.html',
  styleUrls: ['./trovato-libero.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class TrovatoLiberoComponent implements OnInit {
  @Input() occorrenze: any;
  @Input() cercato: any;

  constructor() { }

  ngOnInit() {
  }

}