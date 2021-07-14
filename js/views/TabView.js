import View from "./View";

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
    super(qs("#tab-view")) // 1: 아이디로 돔 엘리먼트를 찾아서 View() 생성자 함수를 호출해서 this.element에 저장한다.

    this.template = new Template() // 2: 탭 출력을 위한 탬플릿 객체도 만들어 저장한다.
  }

  show() { // 부모 클래스의 show 메소드를 재정의한다.
    this.element.innerHTML = this.template.getTabList() // 3: 화면에 노출하기 전에 템플릿 객체로부터 탭 리스트 마크업 문자열을 가져와 돔에 추가하기 위해서.

    super.show();
  }
}

class Template {
  // 1: 탭 하나를 출력하기 위한 HTML 문자열을 반환하는 것이 getTab 메소드.
  _getTab({ key, label }) {
    return `<li data-tab="${key}">${label}`;
  }

  // 2
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(Tab) // 3: 탭 키를 배열로 만들고
          .map(key => ({ key, labe: TabLabel[key]})) // 4: key, label로 구성된 객체로 변환한 뒤
          .map(this._getTab)
          .join("") // 5: getTab메소드로 탭을 위한 마크업 문자열을 생성한다.
        }
      </ul>
    `
  }
}