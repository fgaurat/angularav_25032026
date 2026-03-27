import { Component, inject } from '@angular/core';
import { SumService } from '../sum-service';

@Component({
  selector: 'app-add-service-component',
  imports: [],
  templateUrl: './add-service-component.html',
  styleUrl: './add-service-component.css',
})
export class AddServiceComponent {


  sumService = inject(SumService)
  val1=0
  val2=0

  result = 0


  sum(){
    this.result = this.sumService.add(this.val1,this.val2)  
  }
}
