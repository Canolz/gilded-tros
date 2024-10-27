import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemApiService } from '../../services/item/item-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
  imports: [MatGridListModule, MatCardModule, MatButtonModule, ItemComponent],
})
export class InventoryComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  items: Item[] = [];

  constructor(
    private itemApiService: ItemApiService
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemApiService.getItems()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items: Item[]) => {
        this.items = items;
      });
  }
}
