import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemApiService } from './services/item/item-api.service';

describe('AppComponent', () => {
  const mockItemApiService = {
    getItems: () => { },
    getSmellyItems: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, InventoryComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: ItemApiService, useValue: mockItemApiService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Gilded Tros' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Gilded Tros');
  });

  it('should render the title in the mat toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toEqual('Gilded Tros Inventory');
  });
});
