import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  countries:string[]=["American","Italian","Spanish","Lebanese","Chinese","Indian","Thai","Mexican","French","Iris","Japanese"];

}
