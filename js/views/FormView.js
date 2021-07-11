import View from './View';
import qs, { on } from '../helper';

class FormView extends View {
  constructor() {
    super(qs("#form-view"))

    this.inputElement = qs("[type=text]", this.element)
    this.resetElement = qs("[type=reset]", this.element)
    this.showResetButton(false);
    this.bindEvents() // 1: 뷰에서 발생하는 이벤트 처리기 연결용 bindEvents()메서드 호출
  }
  
  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", event => this.handleKeyup(event)) // 2: 미리 저장해 둔 inputElement에서 keyup 이벤트가 발생하면 handleKeyup() 메서드를 호출하는 함수를 연결.
  }

  handleKeyup(event) {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0) // 3: 입력한 문자열의 길이에 따라 버튼의 노출 여부를 결정. 입력한 문자가 있으면 x 버튼을 표시하고 그렇지 않으면 숨기도록 구현.
  }
}