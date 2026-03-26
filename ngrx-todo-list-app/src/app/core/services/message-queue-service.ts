import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root',
})
export class MessageQueueService {

  private bus: Subject<Action> = new Subject<Action>()
  bus$: Observable<Action> = this.bus.asObservable()


  dispatch(action: Action) {
    console.log(action);
    
    this.bus.next(action)
  }

}
