import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

import { FirebaseListObservable } from 'angularfire2/database';
import { PassengerService } from '../passenger.service';

import * as calc from '../calc.js';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [PassengerService]
})


export class GraphComponent implements OnInit {

  passengers;
  processedData;

  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service, private passengerService: PassengerService) { 
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;

    if (this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement);

      // Do d3 stuff
    }

    // fetch("./data.json")
    //   .then(response => response)
    //   .then(data => {
    //     this.passengers = data;
    //   }).then(data => {
    //     calc.sortByGender(data);
    //   })
    


    


    this.passengerService.getPassengers().subscribe(data => {
      this.passengers = data;
      // calc.sortByGender(this.passengers);
      calc.drawScatter(d3, this.passengers);
    });
  }

};
