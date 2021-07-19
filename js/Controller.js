import { TabType } from "./views/TabView";

export default class Controller {
  constructor(
    store,
    { searchFormView, searchResultView, tabView, keywordListView, 
      historyListView, }
  ) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.formView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", (_) => this.reset());

    this.tabView.on("@change", (event) => this.changeTab(event.detail.value));
    this.keywordListView.on("@click", (event) => this.search(event.detail.value));
    this.historyListView.on("@click", (event) => this.search(event.detail.value)); // 1: search메소드에 최근검색어를 전달한다.
  }

  changeTab(tab) {
    this.store.selectedTab = tab;
    this.render();
  }

  search(keyword) {
    console.log(keyword);
    this.store.search(keyword);
    this.render();
  }

  reset() {
    console.log("@reset");
    this.store.searchResult = [];
    this.store.searchKeyword = "";
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult() // 1: 7번으로 분리.
    }

    this.searchResultView.hide() // 2: 기본화면에서 검색결과를 숨기고
    this.tabView.show(this.store.selectedTab); // 3: 탭을 노출하고 선택된 탭을 표시한다.

    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
      this.historyListView.hide(); // 4: 키워드탭을 선택하면 최근 검색어를 숨기고,
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.keywordListView.hide(); // 5: 최근검색어를 선택하면 키워드 탭을 숨기고
      this.historyListView.show(this.store.getHistoryList()); // 6: 최근 검색어 이력을 불러와 historyListView.show에 전달한다.
    } else {
      throw "사용할 수 없는 탭";
    }
    this.searchResultView.hide();
  }

  // 7: 검색결과 출력하는 부분을 따로 분리
  renderSearchResult() {
    this.formView.show(this.store.searchKeyword);
    this.searchResultView.show(this.store.searchResult);
    this.tabView.hide();
    this.keywordListView.hide();
    this.historyListView.hide();
  }
}
