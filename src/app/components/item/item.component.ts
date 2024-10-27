import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  imports: [MatCardModule, MatButtonModule]
})
export class ItemComponent {
  @Input() item: Item | undefined = undefined;
}
