import { Component, inject, Signal } from '@angular/core';
import { CountSignal } from '../count-signal';

@Component({
  selector: 'app-show',
  imports: [],
  templateUrl: './show.html',
  styleUrl: './show.css',
})
export class Show {

  countSignalService = inject(CountSignal)
  count: Signal<number> = this.countSignalService.count

}
