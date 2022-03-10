import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IJuego } from './juegos'


@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  public juegos!: Observable<IJuego[]>; //Colección de Cursos
  private juegosCollection!: AngularFirestoreCollection<IJuego>;//Referencia a firestore
  public pathImage: string = '';

  constructor(private firestore: AngularFirestore) {
    this.juegosCollection = firestore.collection<IJuego>('juegos');
    console.log(this.juegosCollection);
    this.obtenerJuegos();
  }

  obtenerJuegos() {
    this.juegos=  this.juegosCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as IJuego))
    )
  }

  
/**
   * Recibimos un producto y lo agregamos a la base de datos
   * @param juego 
   * @returns Promesa 
   */
  public createJuegos(juego: IJuego): Promise<void> {
    return new Promise(async(resolve, reject) => {
      try {
        const id = this.firestore.createId();
        juego.id = id;

        const result = await this.juegosCollection?.doc(id).set(juego);
        console.log(result)
        resolve(result)
    } catch (err) {
        reject(err)
    }
  })
  }

  public getProductoById(prodId: string) {
    return this.firestore.collection('juegos').doc(prodId).snapshotChanges();
  }

  public updateJuego(prodId: string, data: any) {
    return this.firestore.collection('juegos').doc(prodId).update(data);
  }

  //borrar producto
  public deleteJuego(proId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.juegosCollection?.doc(proId).delete();
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}
