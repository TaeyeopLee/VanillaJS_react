export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.subscribeViewEvents()
  }

  subscribeViewEvents() {
    this.formView
      .on("@submit", event => this.search(event.detail.value))
      .on("@reset", _ => this.reset()) // 1: reset() 메소드 호출
  }

  search(keyword) {
    console.log(keyword)
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
      this.tabView.hide(); // 1: 검색어를 입력했을 때는 검색결과를 보여주고 탭뷰는 숨긴다.
      return;
    }

    this.tabView.show() // 2: 일반적인 조건일 떄는 탭뷰를 보여주고
    this.searchResultView.hide(); // 3: 검색결과를 숨긴다.
  }
}
