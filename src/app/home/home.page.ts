import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
        title: "Faculty of Management. The University of Gdansk",
        latitude: "54.442575",
        longitude: "18.555802"
    },
    {
        title: "The Forest Opera",
        latitude: "54.444574",
        longitude: "18.544408"  
    },
    {
        title: "Crooked House",
        latitude: "54.4398165741",
        longitude: "18.5667143998"  
    },
    {
        title: "Sopot Centrum",
        latitude: "54.440916",
        longitude: "18.562772"  
    }
  ];

  constructor() {}

  ionViewDidEnter() { 
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                            '</div>';

    let infoWindow = new google.maps.infoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(54.445108, 18.553549);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true 
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }

}
