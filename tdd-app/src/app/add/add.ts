import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
  valA:number=0
  valB:number=0
  result:number=0


  add(){
    this.result = Number(this.valA)+Number(this.valB)
  }
}
