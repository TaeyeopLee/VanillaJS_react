export default class Controller {
  constructor(store, { searchFormView, searchResultView }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;

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
      return;
    }

    this.searchResultView.hide();
  }
}
