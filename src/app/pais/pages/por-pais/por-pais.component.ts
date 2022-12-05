import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private PaisService: PaisService ) { }

  ngOnInit(): void {
  }

  buscar( termino: string ){
    this.hayError = false;
    this.termino = termino;

    // this.PaisService.buscarPais( this.termino )
    //   .subscribe( (paises )=> {
    //     console.log(paises)
    //   }, (err) => {
    //     this.hayError = true;
    //   },)
    // this.PaisService.buscarPais( this.termino )
    //   .subscribe(
    //     paises => console.log(paises),
    //     err => this.hayError = true,
    //     () => console.log('un exito')
    //    );

    this.PaisService.buscarPais( termino )
      .subscribe({
        next: (paises) => { console.log(paises);
                          this.paises = paises;
                        },
        error: () => { this.hayError = true;
                        this.paises = [];
                      },
        complete: () => { console.log('Tarea completa') }
      })

    // this.termino = '';
  }

  sugerencias( termino: string ) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.PaisService.buscarPais( termino )
      .subscribe({
        next: (paises) => this.paisesSugeridos = paises.splice(0, 3),
        error: () => this.paisesSugeridos = []
      }


        // paises => this.paisesSugeridos = paises.splice(0,3),
        // (err) => this.paisesSugeridos = []
        );
  }

  buscarSugerido( termino:string ){
    this.buscar( termino );
    // this.mostrarSugerencias = false;
  }

}
