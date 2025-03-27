import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-computation-settings-poup',
  templateUrl: './computation-settings-poup.component.html',
  styleUrls: ['./computation-settings-poup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComputationSettingsPoupComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ComputationSettingsPoupComponent>,) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
