import View from './View';
import qs from '../helper';

class FormView extends View {
  constructor() {
    super(qs("#form-view")) // 1: View 클래스 생성자 함수를 통해 돔을 내부 변수로 저장한다.
    // qs()는 document.querySelector()를 호출하는 헬퍼 함수다.

    this.inputElement = qs("[type=text]", this.element) // 2
    this.resetElement = qs("[type=reset]", this.element) // 3
    this.showResetButton(false) // 4: 처음에는 x 버튼을 보일 필요가 없기 때문에 숨김.
  }
  // 5
  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }
  // 4, 5: 화면의 노출 여부를 display속성을 통해 제어한다.
}