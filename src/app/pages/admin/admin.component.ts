import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IJuego } from '../juegos/juegos';
import { JuegosService } from '../juegos/juegos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public formularioJuego: FormGroup;
  public juegos: IJuego[] = [];
  public accion: string = 'Agregar';
  public flag: boolean = false;
  public juegoSeleccionado?: IJuego;

  constructor(private fb: FormBuilder, private juegoService: JuegosService) {
    this.formularioJuego = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.juegoService.juegos.subscribe(resp => {
      this.juegos = resp;
    })
  }

  guardarJuego() {

    if (this.flag == true) {
      alert("Quiero Editar");
      this.juegoService.updateJuego(this.juegoSeleccionado!.id, this.formularioJuego.value);
      
    }
    else {
      console.log(this.formularioJuego.value);
      if (!this.formularioJuego.invalid) {

        this.juegoService.createJuegos(this.formularioJuego.value);
        this.formularioJuego.reset;
      }
      else {
        alert('EL FORMULARIO ES INVALIDO')
      }
    }

  }

  editar(juegoSeleccionado: IJuego) {
    this.juegoSeleccionado = juegoSeleccionado;
    this.accion = 'Editar';
    this.flag = true;

    this.formularioJuego.setValue({
      nombre: juegoSeleccionado.nombre,
      descripcion: juegoSeleccionado.descripcion,
      precio: juegoSeleccionado.precio
    })

  }

  eliminar(id: string){
    this.juegoService.deleteJuego(id);

    alert('Juego eliminado')
  }

}
