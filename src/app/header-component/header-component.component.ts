import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  @Output("loadComponent") emitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  navigate(component: string) {
    this.emitter.emit(component);
  }
}
