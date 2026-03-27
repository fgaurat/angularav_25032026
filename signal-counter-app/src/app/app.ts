import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inc } from './inc/inc';
import { Show } from './show/show';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Inc,Show],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signal-counter-app');

  readonly count:WritableSignal<number> = signal(0)
  readonly doubleCount: Signal<number> = computed(() => this.count() * 2);

  readonly showCount = signal(false);

  readonly conditionalCount = computed(() => {
    if (this.showCount()) {
      return `The count is ${this.count()}.`;
    } else {
      return 'Nothing to see here!';
    }
  });

  toggleShowCount(){
    this.showCount.update(value => !value)
  }

  setTo12(){
    this.count.set(12)
  }

  inc(){
    this.count.update((value) => value + 1);
  }

  constructor(){
    effect(()=>{
      console.log("this.count()",this.count())
      console.log("this.showCount()",this.showCount())
    })

    effect(()=>{
      console.log("this.doubleCount()",this.doubleCount())
    })
  }
}
