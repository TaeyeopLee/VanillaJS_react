import { emit, on } from "../helper.js";

export default class View {
  constructor(element) {
    this.element = element; // 1: 생성 시점에 화면 출력을 위한 돔 엘리먼트를 받아서 저장한다.
    this.originalDisplay = this.element.style.displa || "" // 2: 뷰를 화면에 보이고 숨기기 위해 스타일의 display속성을 사용할 것인데 이걸 위해 원래 값을 저장해 둔다.
  }

  hide() {
    this.element.style.display = "none";
  } // 3

  show() {
    this.element.style.display = this.originalDisplay;
  } // 4

  on(eventName, handler) {
    on(this.element, eventName, handler);
  } // 5

  emit(eventName, data) {
    emit(this.element, eventName, data);
  } // 6
  // 5, 6: 뷰가 관리하는 엘리먼트에서 발생한 이벤트를 핸들러와 연결하거나 외부에서 구독하기 위해
  // addEventLister() 와 dispatchEvent() 함수를 래핑한 on(), emit() 유틸리티 함수를 미리 제작.
}