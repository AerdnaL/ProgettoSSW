import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { BibliotecaService } from '../biblioteca.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RicercaComponent implements OnInit {
  @Input() vediRicerca: boolean = false;

  occorrenze: string = '';

  cercaLibro(event: KeyboardEvent) {
    this.bs.getData().subscribe({
      next: (ajaxRes: AjaxResponse<any>) => {
        const risposta = ajaxRes.response;
        const data = JSON.parse(risposta);
        const cercato = data.filter(
          (libro: any) =>
            libro.autore.toLowerCase().includes((event.target as HTMLInputElement).value) ||
            libro.titolo.toLowerCase().includes((event.target as HTMLInputElement).value)
        );
        this.occorrenze = cercato.length;
      },
    });
  }

  constructor(private bs: BibliotecaService) {}

  ngOnInit() {}
}
