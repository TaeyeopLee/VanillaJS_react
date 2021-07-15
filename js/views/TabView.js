import { qsAll } from "../helpers.js";
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
  }
  // 1: 탭정보를 인자로 받도록 수정한다.
  show(tab) {
    this.element.innerHTML = this.template.getTabList()

    // 2: li 엘리먼트 중 선택한 탭 엘리먼트를 찾는데 data-tab 속성값과 인자의 tab 문자열 값을 비교해 일치하는 녀석에서 active 클래스 이름을 붙여준다.
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