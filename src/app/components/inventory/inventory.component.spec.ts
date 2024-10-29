import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { InventoryComponent } from './inventory.component';
import { of } from 'rxjs';
import { Item } from '../../interfaces/item.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemApiService } from '../../services/item/item-api.service';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  const mockItemApiService = {
    getItems: () => of([]),
    getSmellyItems: () => of([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InventoryComponent,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: ItemApiService, useValue: mockItemApiService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadItems', () => {
      spyOn(component, 'loadItems');

      component.ngOnInit();

      expect(component.loadItems).toHaveBeenCalled();
    });
  });

  describe('loadItems', () => {
    it('should call itemApiService.getItems and itemApiService.getSmellyItems', () => {
      spyOn(component['itemApiService'], 'getItems').and.callThrough();
      spyOn(component['itemApiService'], 'getSmellyItems').and.callThrough();

      component.loadItems();

      expect(component['itemApiService'].getItems).toHaveBeenCalled();
      expect(component['itemApiService'].getSmellyItems).toHaveBeenCalled();
    });

    it('should set items to the result of the forkJoin', () => {
      const normalItems: Item[] = [{
        name: 'Normal Item',
        sellIn: 1,
        quality: 50
      }];
      const smellyItems: Item[] = [{
        name: 'Smelly Item',
        sellIn: 1,
        quality: 10
      }];
      spyOn(component['itemApiService'], 'getItems').and.returnValue(of(normalItems));
      spyOn(component['itemApiService'], 'getSmellyItems').and.returnValue(of(smellyItems));

      component.loadItems();

      expect(component.items).toEqual([...normalItems, ...smellyItems]);
    });
  });
});
