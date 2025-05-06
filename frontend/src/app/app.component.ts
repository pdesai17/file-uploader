import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  async ngOnInit() {
    // try {
    //   const response = await fetch('http://localhost:8000/api/hello');
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  }
}
