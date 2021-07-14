import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";
import TabView from "./views/TabView.js";

document.addEventListener("DOMContentLoaded", main);

function main() {
  const store = new Store(storage);
  const views = {
    searchFormView: new SearchFormView(),
    searchResultView: new SearchResultView(),
    tabView: new TabView(),
  };
  new Controller(store, views) // 3: 1,2에서 만든 스토어, 뷰 객체를 컨트롤러 생성자 함수에 전달해서 컨트롤러 객체를 만든다.
}