import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-04',
  imports: [JsonPipe],
  templateUrl: './page-04.html',
  styleUrl: './page-04.css',
})
export class Page04 {

  private route = inject(ActivatedRoute)
  todos:any = this.route.snapshot.data['todos']
}
