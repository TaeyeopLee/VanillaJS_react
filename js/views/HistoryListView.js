import KeywordListView from "./KeywordListView";

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(qs("#history-view"), new Template()) // 1: 키워드 뷰를 상속하고 생성자 함수에 돔 엘리먼트와 템플릿 객체를 전달.
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