import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountSignal {

  private readonly counter:WritableSignal<number> = signal(0)


  count:Signal<number> = this.counter.asReadonly();

  inc(){
    this.counter.update(v => v+1)
  }

}
