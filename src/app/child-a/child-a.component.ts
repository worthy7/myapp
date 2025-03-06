import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-child-a',
  imports: [DatePipe],
  templateUrl: './child-a.component.html',
  styleUrl: './child-a.component.scss'
})
export class ChildAComponent {
date = new Date();
}
