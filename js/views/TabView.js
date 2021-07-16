import { delegate, qsAll } from "../helpers.js";
import View from "./View.js";

export const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

export default class TabView extends View {
  constructor() {
    super(qs("#tab-view"))

    this.template = new Template()
    this.bindEvents() // 1: 엘리먼트에서 발생하는 이벤트를 핸들러와 연결하는 bindEvents 메소드를 호출
  }

  bindEvents() {
    delegate(this.element, "click", "li", event => this.handleClick(event)) // 2: 자식 엘리먼트에서 li 에서 "click" 이벤트가 발생할 때 handleClick 메소드를 호출하도록 핸드러를 연결한다.
  }

  handleClick(event) {
    const value = event.target.dataset.tab // 3: 이벤트 객체를 받아 클릭된 요소의 탭 정보를 조회한다.
    this.emit("@change", { value }); // 4: "@change" 이름으로 이벤트를 발행한다.
  }

  show(tab) {
    this.element.innerHTML = this.template.getTabList()

    qsAll("li", this.element).forEach(li => {
      li.className = li.dataset.tab === tab ? "active" : ""
    })

    super.show();
  }
}

class Template {
  _getTab({ key, label }) {
    return `<li data-tab="${key}">${label}`;
  }

  // 2
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(Tab)
          .map(key => ({ key, labe: TabLabel[key]}))
          .map(this._getTab)
          .join("")
        }
      </ul>
    `
  }
}