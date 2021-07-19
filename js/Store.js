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
    this.addHistory(keyword); // 1: 검색 로직 마지막에 검색 키워드를 히스토리에 추가한다.
  }

  addHistory(keyword = "") {
    keyword = keyword.trim();
    if (!keyword) return;

    // 2: 이미 있는 검색어일 경우
    const hasHistory = this.storage.historyData.some(
      history => history.keyword === keyword
    )
    if (hasHistory) this.removeHistory(keyword) // 3: 검색어를 삭제한다.

    const date = new Date();
    this.storage.historyData.push({ keyword, date }); // 4: 변경된 검색시간으로 다시 검색어를 추가한다.
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      history => history.keyword !== keyword
    );
  }
}
