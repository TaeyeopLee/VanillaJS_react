import { delegate } from "../helpers";
import KeywordListView from "./KeywordListView";

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(qs("#history-view"), new Template());
  }

  bindEvents() {
    // 1: 자식 엘리먼트 중에 버튼을 클릭하면 handleClickRemoveButton을 호출한다.
    delegate(this.element, "click", "button.btn-remove", event => this.handleClickRemoveButton(event));
    
    super.bindEvents(); // 2: 이어서 부모의 메소드를 호출한다.
  }

  handleClickRemoveButton(event) {
    const { keyword } = event.target.parentElement.dataset; // 3: 엘리먼트의 data-keyword 속성에 저장된 키워드를 찾아서
    this.emit("@remove", { value: keyword }); // 4: @remove로 이벤트를 발행한다.
  }
}

class Template {
  getEmptyMessage() {
    return `검색 이력이 없습니다.`;
  }

  getList(data = []) {
    return `<ul class="list">${data.map(this._getItem).join("")}</ul>`;
  }

  // 1: 각 항목에 날짜와 버튼을 반영.
  _getItem({ keyword, date }) {
    const formattedData = data.toLocaleString("ko-KR", {
      hour12: false,
      dateStyle: "short",
      timeStyle: "medium",
    })

    return `
      <li data-keyword="${keyword}">
        ${keyword}
        <span class="data">${formattedData}</span>
          <button class="btn-remove"></button>
      </li>
    `;
  }
}