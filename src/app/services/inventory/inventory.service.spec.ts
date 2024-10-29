import { Item } from "../../interfaces/item.interface";
import { InventoryService } from "./inventory.service";

describe('InventoryService', () => {
    let inventoryService: InventoryService;

    beforeEach(() => {
        inventoryService = new InventoryService();
    });

    it('should be created', () => {
        expect(inventoryService).toBeTruthy();
    });

    describe('updateQuality', () => {
        it('should update Good Wine quality correctly', () => {
            const items: Item[] = [
                { name: 'Good Wine', sellIn: 10, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(11);
            expect(items[0].sellIn).toBe(9);
        });

        it('should not update B-DAWG Keychain quality', () => {
            const items: Item[] = [
                { name: 'B-DAWG Keychain', sellIn: 10, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(10);
            expect(items[0].sellIn).toBe(10);
        });

        it('should update Backstage passes for Re:Factor correctly', () => {
            const items: Item[] = [
                { name: 'Backstage passes for Re:Factor', sellIn: 11, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(11);
            expect(items[0].sellIn).toBe(10);
        });

        it('should update Backstage passes for Re:Factor with sellIn between 5 and 10 correctly', () => {
            const items: Item[] = [
                { name: 'Backstage passes for Re:Factor', sellIn: 7, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(12);
            expect(items[0].sellIn).toBe(6);
        });

        it('should update Backstage passes for Re:Factor with sellIn below 5 correctly', () => {
            const items: Item[] = [
                { name: 'Backstage passes for Re:Factor', sellIn: 4, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(13);
            expect(items[0].sellIn).toBe(3);
        });

        it('should drop Backstage passes quality to 0 when sellIn is 0', () => {
            const items: Item[] = [
                { name: 'Backstage passes for Re:Factor', sellIn: 0, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(0);
            expect(items[0].sellIn).toBe(-1);
        });

        it('should update smelly items (like Duplicate Code) quality correctly', () => {
            const items: Item[] = [
                { name: 'Duplicate Code', sellIn: 5, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(8);
            expect(items[0].sellIn).toBe(4);
        });

        it('should update normal items correctly before sell date', () => {
            const items: Item[] = [
                { name: 'Normal Item', sellIn: 5, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(9);
            expect(items[0].sellIn).toBe(4);
        });

        it('should update normal items correctly after sell date', () => {
            const items: Item[] = [
                { name: 'Normal Item', sellIn: 0, quality: 10 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(8);
            expect(items[0].sellIn).toBe(-1);
        });

        it('should not reduce quality below 0 for normal items', () => {
            const items: Item[] = [
                { name: 'Normal Item', sellIn: 0, quality: 1 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(0);
            expect(items[0].sellIn).toBe(-1);
        });

        it('should not increase quality beyond 50 for Good Wine', () => {
            const items: Item[] = [
                { name: 'Good Wine', sellIn: 10, quality: 50 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(50);
            expect(items[0].sellIn).toBe(9);
        });

        it('should not increase quality beyond 50 for Backstage passes', () => {
            const items: Item[] = [
                { name: 'Backstage passes for Re:Factor', sellIn: 5, quality: 49 },
            ];

            inventoryService.updateQuality(items);

            expect(items[0].quality).toBe(50);
            expect(items[0].sellIn).toBe(4);
        });
    });
});