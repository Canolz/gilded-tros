import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../../interfaces/item.interface";

@Injectable({
    providedIn: 'root'
})
export class ItemApiService {
    private mockDataUrl = 'assets/mocks/item/item.json';

    constructor(private http: HttpClient) {}

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.mockDataUrl);
    }
}
