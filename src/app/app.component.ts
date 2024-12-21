import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'biblio-app';
}
