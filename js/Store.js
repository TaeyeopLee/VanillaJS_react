import { TabType } from "./views/TabView.js";
export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD; // 1:선택한 탭을 저장하기 위한 변수를 추가하고 초기값을 tab.keyword로 지정했다.
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) => product.name.includes(keyword));
  }

  getKeywordList() {
    return this.storage.keywordData;
  }
}
