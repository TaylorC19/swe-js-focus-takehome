import { MenuItem, Shop } from "../../../types";

export class PartySize {
  private shop: Shop;

  private menu: MenuItem[];

  constructor(shop: Shop, menu: MenuItem[]) {
    this.shop = shop;
    this.menu = menu;
  }

  getMinPartySize() {
    return this.shop.minNumPeople;
  }

  getMaxPartySize() {
    return this.shop.maxNumPeople;
  }

  getShowSenior() {
    return this.shop.showSenior;
  }

  getShowBaby() {
    return this.shop.showBaby;
  }

  getShowChild() {
    return this.shop.showChild;
  }

  getMenu() {
    return this.menu;
  }
}
