import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarAlertService {

  private snackbarStateSubject = new BehaviorSubject<string>("");

  private snackbarBehavior = this.snackbarStateSubject.asObservable();

  constructor() { }

  getSnackBarMessage(): Observable<string>{
    return this.snackbarBehavior;
  }

  setSnackBarMessage(messageAux: string){
    this.snackbarStateSubject.next(messageAux);
  }

}
