import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ReportManagementService } from '../report-management.service';
import { GeocodingService } from '../geocoding.service';

L.Icon.Default.imagePath = '../../assets/images/';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: L.Icon.Default.imagePath + 'marker-icon-2x.png',
  iconUrl: L.Icon.Default.imagePath + 'marker-icon.png',
  shadowUrl: L.Icon.Default.imagePath + 'marker-shadow.png'
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private reportManagementService: ReportManagementService, private geocodingService: GeocodingService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.locateUser();
    this.fetchLocations();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [49.2827, -123.1207],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 20,
    }).addTo(this.map);
  }

  private locateUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const latlng = L.latLng(lat, lng);

          this.map.setView(latlng, 12);
          
          L.marker(latlng).addTo(this.map)
            .bindPopup('You are here').openPopup();
        },
        (err) => {
          console.error(err);
        },
        {
          enableHighAccuracy: true, 
          timeout: 5000, 
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  fetchLocations(): void {
    this.reportManagementService.getAllReports().subscribe(reportData => {
      const locationCounts = new Map<string, number>();
  
      reportData.forEach(report => {
        const location = report.data.location;
        const currentCount = locationCounts.get(location) || 0;
        locationCounts.set(location, currentCount + 1);
      });
  
      this.addMarkerForLocations(locationCounts);
    });
  }
  

  private addMarkerForLocations(locationCounts: Map<string, number>): void {
    locationCounts.forEach((count, location) => {
      this.geocodingService.getCoordinates(location).subscribe(
        (data: any[]) => {
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
  
            L.marker([lat, lon]).addTo(this.map)
              .bindPopup(`${location}: ${count} reports`);
          } else {
            console.log(`No results for ${location}`);
          }
        },
        error => {
          console.error('Geocoding error:', error);
        }
      );
    });
  }
  
}
