import View from './View';
import qs, { on } from '../helper';

class FormView extends View {
  constructor() {
    super(qs("#form-view"))

    this.inputElement = qs("[type=text]", this.element)
    this.resetElement = qs("[type=reset]", this.element)
    this.showResetButton(false);
    this.bindEvents()
  }
  
  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", event => this.handleKeyup(event))
    this.on("submit", event => event.preventDefault()) // 1: 엔터를 입력하면 화면갱신이 되므로, 폼 제출을 막아서 화면 갱신을 막는다.
  }

  handleKeyup(event) {
    const ENTER_CODE = 13
    // 2: 이벤트에서 키코드를 조사해서 엔터키인지 비교한다.
    if (event.keyCode === ENTER_CODE) {
      this.emit("@submit", { value })
    }
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0) // 3: 입력한 문자열의 길이에 따라 버튼의 노출 여부를 결정. 입력한 문자가 있으면 x 버튼을 표시하고 그렇지 않으면 숨기도록 구현.
  }
}