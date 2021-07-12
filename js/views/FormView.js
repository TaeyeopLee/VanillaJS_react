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
    this.on("submit", event => event.preventDefault())
    on(this.resetElement, "click", _ => this.handleClickReset()) // 1: resetElement에서 click 이벤트가 발생하면 처리하도록 handleClickReset() 메소드를 연결.
  }

  handleKeyup(event) {
    const ENTER_CODE = 13
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0)
    // 3: 입력한 문자의 길이를 보고 @reset이벤트를 발생
    if (value.length === 0) {
      this.emit("@reset");
    }
    // 4:
    else if (event.keyCode === ENTER_CODE) {
      this.emit("@submit", { value })
    }
  }
  // 2: 외부에서 처리를 위임하기 위해 @reset이벤트만 발생
  handleClickReset() {
    this.emit("@reset");
  }
}