import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemApiService } from '../../services/item/item-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-inventory',
  standalone: true,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  items = signal<Item[]>([]);

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
        this.items.set(items);
      });
  }
}
