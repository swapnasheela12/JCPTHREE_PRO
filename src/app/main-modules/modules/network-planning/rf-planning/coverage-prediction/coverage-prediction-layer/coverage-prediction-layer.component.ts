import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coverage-prediction-layer',
  templateUrl: './coverage-prediction-layer.component.html',
  styleUrls: ['./coverage-prediction-layer.component.scss']
})
export class CoveragePredictionLayerComponent implements AfterViewInit, OnDestroy{
  nominalArray = [];
  nominalGeneartionArray: any = [];
  showHeader: any;
  sub: Subscription;
  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.router.navigate(['/JCP/Layers']);
    $('#Layers').parent()[0].click();
    this.sub = this.http.get("assets/data/layers/coverage-prediction/coverage-prediction.json")
      .subscribe(data => {
        for (let i = 0; i < data['length']; i++) {
          this.nominalArray.push(
            {
              name: data[i].coveragePredictionId,
              eventName: 'coverage-prediction',
              show: true,
              link: 'coverage-prediction',
              showSettings: false,
              children: [],
              showHeader: true,
              checked: false,
              headerText: '5G Coverage Prediction - '
            }
          )
        }

        const MY_PROJECTS_ARRAY_5G = [
          {
            name: "Capacity Based 5G planning",
            eventName: 'coverage-prediction',
            show: true,
            link: 'coverage-prediction',
            children: this.nominalArray,
            checked: false,
            headerText: ''
          }
        ]
        const MY_PROJECTS_ARRAY = [
          {
            name: "Coverage Prediction",
            eventName: 'coverage-prediction',
            show: true,
            link: 'coverage-prediction',
            children: MY_PROJECTS_ARRAY_5G,
            checked: false,
            headerText: ''
          }
        ]
        this.nominalGeneartionArray = [{
          name: "My Projects",
          eventName: 'my-projects',
          show: true,
          link: 'my-projects',
          children: MY_PROJECTS_ARRAY,
          checked: false,
          headerText: ''
        }]
        this.dataShare.addExtraLayerDynamic(this.nominalGeneartionArray);
      }).add(
        () => { }
      );
  }

  ngAfterViewInit() {
    this.dataShare.layerNameFunc([{ name: 'Back To Nominal Geneartion', source: 'display' }]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

