import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../../interfaces/item.interface";

@Injectable({
    providedIn: 'root'
})
export class ItemApiService {
    private mockBaseUrl = 'assets/mocks/item/';

    constructor(private http: HttpClient) {}

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.mockBaseUrl}item.json`);
    }

    getSmellyItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.mockBaseUrl}smelly-item.json`);
    }
}
