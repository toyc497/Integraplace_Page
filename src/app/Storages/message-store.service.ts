import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../Interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageStoreService {

  private messageStateSubject = new BehaviorSubject<Message[]>([]);
  private messageBehaviorState = this.messageStateSubject.asObservable();

  constructor() { }

  getMessageState(): Observable<Message[]>{
    return this.messageBehaviorState;
  }

  setMessageState(messageList: Message[]){
    this.messageStateSubject.next(messageList);
  }

}
