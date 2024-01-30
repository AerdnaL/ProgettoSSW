import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RicercaComponent implements OnInit {
  @Input() vediRicerca: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}