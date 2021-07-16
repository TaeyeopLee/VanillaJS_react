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
      .on("@reset", _ => this.reset())
    
    this.tabView.on("@change", event => this.changeTab(event.detail.value)) // 1: "@change" 이벤트를 구독해서 changeTab메소드로 변경된 탭 정보를 전달한다.
  }

  changeTab(tab) {
    this.store.selectedTab = tab; // 2: 선택된 탭 데이터를 어플리케이션 상태를 관리하는 스토어에 저장한다.
    this.render(); // 3: 다시 화면에 그리기 위해 render를 호출한다.
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
      this.tabView.hide();
      return;
    }

    this.tabView.show() 
    this.searchResultView.hide();
    this.tabView.show(this.store.selectedTab)
  }
}
