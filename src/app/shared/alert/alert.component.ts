import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input("errorMessage") message: string = "";
  @Output() closeModal = new EventEmitter<void>();
  closer: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeModal.emit();
    this.closer.next();
  }

}
