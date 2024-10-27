import { Item } from '../interfaces/item.interface';

export class ItemModel implements Item {
    constructor(public name: string, public sellIn: number, public quality: number) { }

    public toString(): string {
        return `${this.name}, ${this.sellIn}, ${this.quality}`;
    }
}