import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'america', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  hayError: boolean = false;
  region: string = '';

  constructor( private PaisService: PaisService ) { }

  ngOnInit(): void {
  }

  getClaseCSS( region: string ):string{
    return ( region === this.regionActiva ) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion( region:string ) {
    if( region === this.regionActiva ){
      return;
    }

    this.regionActiva = region;
    this.paises = [];

    this.PaisService.buscarRegion( region )
        .subscribe({
          next: (paises) => {console.log(paises);
                          this.paises = paises;
                          },
          error: () => { this.hayError = true;
                        this.paises = [];
                        },
          complete: () => { console.log('Tarea Completa') }
        })
  }

  // buscarRegion( termino:string ) {
  //   this.hayError = false;
  //   this.region = termino;

  //   this.PaisService.buscarRegion( termino )
  //     .subscribe({
  //       next: (capitales) => { console.log(capitales);
  //                         this.paises = capitales;
  //                       },
  //       error: () => { this.hayError = true;
  //                       this.paises = [];
  //                     },
  //       complete: () => { console.log('Tarea completa') }
  //     })

  // }

}
