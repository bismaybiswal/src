import { Component, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appname = 'speedo';

  @ViewChild('googlechart')
  googlechart: GoogleChartComponent;
  chart = {
    type: 'Gauge',
    data: [
      ['speed', 0],
    ],
    options: {
      width: 550,
      height: 290,
      redFrom: 65,
      redTo: 100,
      yellowFrom: 50,
      yellowTo: 65,
      majorTicks: 10,
      minorTicks: 10
    }
  };

  btnState = false;
  watchId = false;

  start() {
    if (navigator.geolocation) {
      let watchId = navigator.geolocation.watchPosition(this.successPosition, this.errorPosition, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 4000
      });
    } else {
      alert("your browser does not support geolocation")
    }

    console.log(JSON.stringify(this.googlechart.chartData))
  };

  successPosition(position) {
    const CVT = 3.6; // convert meters/sec to KPH
    var speed = position.coords.speed;
    var timest = position.timestamp;
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var acc = position.coords.accuracy;
    var spd = speed || 0; // don't send null to graph
    spd = Math.trunc(spd * CVT);
    console.log(`Latitude : ${lat}  Longitude : ${long}  Accuracy : ${acc}`)
    this.chart = {
      type: 'Gauge',
      data: [
        ['speed', spd],
      ],
      options: {
        width: 550,
        height: 290,
        redFrom: 65,
        redTo: 100,
        yellowFrom: 50,
        yellowTo: 65,
        majorTicks: 10,
        minorTicks: 10
      }
    };

  }
  errorPosition(err) {
    alert("Error occurred");
  }

}
