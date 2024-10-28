import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  updateQuality(items: Item[]): void {
    items.forEach((item: Item) => {
      switch (item.name) {
        case 'Good Wine':
          this.updateGoodWine(item);
          break;
        case 'B-DAWG Keychain':
          break;
        case 'Backstage passes for Re:Factor':
        case 'Backstage passes for HAXX':
          this.updateBackstagePasses(item);
          break;
        case 'Duplicate Code':
        case 'Long Methods':
        case 'Ugly Variable Names':
          this.updateSmellyItem(item);
          break;

        default:
          this.updateNormalItem(item);
          break;
      }
    })
  }

  private updateGoodWine(item: Item): void {
    item.quality = Math.min(item.quality + 1, 50);
    item.sellIn--;
  }

  private updateBackstagePasses(item: Item): void {
    if (item.sellIn > 10) {
      item.quality++;
    } else if (item.sellIn > 5) {
      item.quality += 2;
    } else if (item.sellIn > 0) {
      item.quality += 3;
    } else {
      item.quality = 0;
    }
    item.quality = Math.min(item.quality, 50);
    item.sellIn--;
  }

  private updateSmellyItem(item: Item): void {
    item.quality = Math.max(item.quality - 2, 0);
    item.sellIn--;
  }

  private updateNormalItem(item: Item): void {
    if (item.sellIn > 0) {
      item.quality = Math.max(item.quality - 1, 0);
    } else {
      item.quality = Math.max(item.quality - 2, 0);
    }
    item.sellIn--;
  }
}
