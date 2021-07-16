import View from "./View.js";
import { qs } from "../helpers.js";

export default class KeywordListView extends View {
  // 1: 엘리먼트를 저장하고 템플릿 객체를 생성
  constructor() {
    super(qs("#keyword-view"));
    this.template = new Template();
  }

  // 2: 키워드 데이터에 따라 동적으로 출력하기 때문에 show메소드를 오버라이드한다.
  show(data = []) {
    this.element.innerHTML = data.length > 0 ? this.template.getList(data) : this.getEmptyMessage()
    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `추천 검색어가 없습니다.`;
  }
  // 1
  getList(data = []) {
    return `<ul class="list">${data.map(this._getItem).join("")}</ul>`;
  }

  // 2
  _getItem({ id, keyword }) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li>
    `
  }
}