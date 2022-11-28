import { Component, EventEmitter, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor( private PaisService: PaisService ) { }

  ngOnInit(): void {
  }

  buscar( termino: string ){
    this.hayError = false;
    this.termino = termino;

    this.PaisService.buscarCapital( termino )
      .subscribe({
        next: (capitales) => { console.log(capitales);
                          this.paises = capitales;
                        },
        error: () => { this.hayError = true;
                        this.paises = [];
                      },
        complete: () => { console.log('Tarea completa') }
      })

  }
}
