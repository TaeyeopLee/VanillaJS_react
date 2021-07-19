import View from "./View.js";
import { delegate, qs } from "../helpers.js";

export default class KeywordListView extends View {
  constructor(element = qs("#keyword-view"), template = new Template()) {
    // super(qs("#keyword-view"));
    super(element);

    this.template = template;
    this.bindEvents(); // 1: 생성 시점에 이벤트를 바인딩.
  }

  bindEvents() {
    delegate(this.element, "click", "li", event => this.handleClick(event)); // 2: 하위 엘리먼트에 클릭 이벤트가 발생하면 li요소일 경우만 이벤트를 처리한다.
  }

  handleClick(event){
    const { keyword } = event.target.dataset; // 3: data-keyword 속성에 저장된 키워드 값을 조회한다.
    this.emit("@click", { value: keyword }) // 4: 키워드와 "@click" 이름으로 이벤트를 발행.
  }

  show(data = []) {
    this.element.innerHTML =
      data.length > 0 ? this.template.getList(data) : this.getEmptyMessage();
    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `추천 검색어가 없습니다.`;
  }

  getList(data = []) {
    return `<ul class="list">${data.map(this._getItem).join("")}</ul>`;
  }

  _getItem({ id, keyword }) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li>
    `;
  }
}
