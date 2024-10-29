import { Component } from '@angular/core';
import { InventoryComponent } from "./components/inventory/inventory.component";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [InventoryComponent, MatToolbarModule]
})
export class AppComponent {
  title = 'Gilded Tros';
}
