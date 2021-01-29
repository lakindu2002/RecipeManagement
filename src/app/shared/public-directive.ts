import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[retrieveRef]'
})
export class PublicDirective {
  constructor(public ref: ViewContainerRef) {

  }
}
