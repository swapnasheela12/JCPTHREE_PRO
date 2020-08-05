import { Directive, HostListener } from '@angular/core';
import { EditCellComponent } from './edit-cell.component';

@Directive({
  selector: '[appEditOnEnter]'
})
export class EditOnEnterDirective {
  constructor(private editable: EditCellComponent) {
  }

  @HostListener('keyup.enter')
  onEnter() {
    this.editable.toViewMode();
  }

}
