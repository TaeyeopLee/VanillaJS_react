import { qs } from '../helpers.js';
import View from './View.js';

export default class ResultView extends View {
  constructor() {
    super(qs("#search-result")) // 1

    this.template = new Template() // 4
  }

  show(data = []) {
    // 2
    this.element.innerHTML = data.length > 0 ? this.template.getList(data) : this.template.getEmptyMessage()
    
    super.show(); // 3
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
