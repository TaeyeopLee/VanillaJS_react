import Controller from './Controller.js';
import Store from './Store.js';
import storage from './storage.js';
import FormView from './views/FormView.js';

document.addEventListener("DOMContentLoaded", main);

function main() {
  const store = new Store(storage); // 1: 데이터를 담은 스토리지를 이용해 스토어 객체를 만든다.
  const views = { 
    formView: new FormView(),
  } // 2: 뷰는 여러 개를 만들 것이기 때문에 우선 빈 객체로 만들었다.
  new Controller(store, views) // 3: 1,2에서 만든 스토어, 뷰 객체를 컨트롤러 생성자 함수에 전달해서 컨트롤러 객체를 만든다.
}