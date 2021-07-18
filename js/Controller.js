import { TabType } from "./views/TabView";

export default class Controller {
  constructor(
    store,
    { searchFormView, searchResultView, tabView, keywordListView }
  ) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.formView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", (_) => this.reset());

    this.tabView.on("@change", (event) => this.changeTab(event.detail.value));
    this.keywordListView.on("@click", (event) => this.search(event.detail.value)) // 1: keywordListView에서 보낸 @click 이벤트를 구독한다. 이벤트에서 키워드를 뽑아서 search로 전달한다.
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
      this.searchResultView.show(this.store.searchResult);
      this.tabView.hide();
      return;
    }

    this.tabView.show(this.store.selectedTab);

    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.keywordListView.hide();
    } else {
      throw "사용할 수 없는 탭";
    }
    this.searchResultView.hide();
  }
}
