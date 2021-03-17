import { Component, AfterViewInit } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nominal-validation-layer',
  templateUrl: './nominal-validation-layer.component.html',
  styleUrls: ['./nominal-validation-layer.component.scss']
})
export class NominalValidationLayerComponent implements AfterViewInit {
  nominalArray = [];
  nominalValidationArray: any = [];
  showHeader:any;
  sub: Subscription;
  
  constructor(
    private http: HttpClient,
    private dataShare: DataSharingService,
    private router: Router,
  ) { }

  ngAfterViewInit() {
    this.router.navigate(['/JCP/Layers']);
    $('#Layers').parent()[0].click();
    this.sub = this.http.get("assets/data/layers/nominal-generation/nominal-generation.json")
    .subscribe(data => {
      for (let i=0; i<data['length']; i++) {
        this.nominalArray.push(
          {
            name: data[i].sapId,
            eventName: 'nominal-validation',
            show:true,
            link: 'nominal-validation',
            showSettings: false,
            children: [],
            showHeader: true,
            checked: false,
            headerText: 'Back To Nominal Validation'
          }
        )
      }

      const MY_PROJECTS_ARRAY = [
        {
          name: "Nominal Planning",
          eventName: 'nominal-validation',
          show:true,
          link: 'nominal-validatiom',
          children: this.nominalArray,
          checked: false,
          headerText: ''
        }
      ]
      this.nominalValidationArray = [{
        name: "My Projects",
        eventName: 'my-projects',
        show:true,
        link: 'my-projects',
        children: MY_PROJECTS_ARRAY,
        checked: false,
        headerText: ''
      }]
      this.dataShare.addExtraLayerDynamic(this.nominalValidationArray);
    }).add(
      ()=>{}
    );
  }

}
