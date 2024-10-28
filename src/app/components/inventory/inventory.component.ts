import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemApiService } from '../../services/item/item-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ItemComponent } from '../item/item.component';
import { InventoryService } from '../../services/inventory/inventory.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inventory',
  standalone: true,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    ItemComponent]
})
export class InventoryComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  items: Item[] = [];

  constructor(
    private itemApiService: ItemApiService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    forkJoin<[Item[], Item[]]>([
      this.itemApiService.getItems(),
      this.itemApiService.getSmellyItems()
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([normalItems, smellyItems]: [Item[], Item[]]) => {
        this.items = [...normalItems, ...smellyItems];
      });
  }

  nextDay(): void {
    this.inventoryService.updateQuality(this.items);
  }
}
