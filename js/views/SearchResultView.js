import { qs } from "../helpers.js";
import View from "./View.js";

export default class ResultView extends View {
  constructor() {
    super(qs("#search-result"));

    this.template = new Template();
  }

  show(data = []) {
    this.element.innerHTML =
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessage();

    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `
      <div class="empty-box">
        검색 결과가 없습니다.
      </div>
    `;
  }

  getList(data = []) {
    return `
      <ul class="result">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({ imageURL, name }) {
    return `
      <li>
        <img src="${imageURL} alt="${name} />
        <p>${name}</p>
      </li>
    `;
  }
}
