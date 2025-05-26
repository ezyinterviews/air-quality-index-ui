import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AirQualityData, PaginatedResponse } from '../../models/air-quality.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  state: string = '';
  city: string = '';
  results: any = null;
  totalRecords: number = 0;
  offset: number = 0;
  limit: number = 0;
  count: number = 0;

  constructor(private http: HttpClient) {}

  search() {
    let apiUrl = this.buildUrl();
    this.http.get<PaginatedResponse<AirQualityData>>(apiUrl).subscribe({
      next: (response) => {
        this.results = response.records;
        this.totalRecords = response.total;
        this.offset = this.offset + response.count; // Increment offset by the count of records returned
        this.limit = response.limit;
        this.count = response.count;
        console.log('API Response:', response);
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }


  private buildUrl() {
    let apiUrl = 'http://localhost:8080/api/aqi';
    if (this.state && this.city) {
      apiUrl += `?state=${encodeURIComponent(this.state)}&city=${encodeURIComponent(this.city)}`;
    } else if (this.state) {
      apiUrl += `?state=${encodeURIComponent(this.state)}`;
    } else if (this.city) {
      apiUrl += `?city=${encodeURIComponent(this.city)}`;
    }
    console.log(`API URL: ${apiUrl}`);
    return apiUrl;
  }

  reset() {
    this.state = '';
    this.city = '';
    console.log('Search reset');
  }
}
