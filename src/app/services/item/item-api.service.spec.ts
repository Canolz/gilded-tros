import { HttpClient } from "@angular/common/http";
import { ItemApiService } from "./item-api.service";
import { Item } from "../../interfaces/item.interface";
import { of } from 'rxjs';


describe('ItemApiService', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let itemApiService: ItemApiService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        itemApiService = new ItemApiService(httpClientSpy);
    });

    it('should be created', () => {
        expect(itemApiService).toBeTruthy();
    });

    describe('getItems', () => {
        it('should retrieve items from the mock base URL', (done: DoneFn) => {
            const mockNormalItems: Item[] = [
                {
                    name: 'Good Wine',
                    sellIn: 1,
                    quality: 50
                },
                {
                    name: 'More Good Wine',
                    sellIn: 1,
                    quality: 50
                }
            ];

            httpClientSpy.get.and.returnValue(of(mockNormalItems));

            itemApiService.getItems().subscribe({
                next: (items) => {
                    expect(items).toEqual(mockNormalItems);
                    done();
                },
                error: done.fail,
            })
            expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
        });
    });

    describe('getSmellyItems', () => {
        it('should retrieve smelly items from the mock base URL', (done: DoneFn) => {
            const mockSmellyItems: Item[] = [
                {
                    name: 'Duplicate code',
                    sellIn: 1,
                    quality: 50
                },
                {
                    name: 'Long Methods',
                    sellIn: 1,
                    quality: 50
                }
            ];

            httpClientSpy.get.and.returnValue(of(mockSmellyItems));

            itemApiService.getSmellyItems().subscribe({
                next: (items) => {
                    expect(items).toEqual(mockSmellyItems);
                    done();
                },
                error: done.fail,
            })
            expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
        });
    });
});
