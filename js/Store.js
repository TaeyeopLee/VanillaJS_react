import { TabType } from "./views/TabView.js";
export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) => product.name.includes(keyword));
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  // 1: 검색 이력을 가져오는 getHistoryList 메소드
  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }
}
