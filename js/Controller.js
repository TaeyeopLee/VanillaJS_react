class Controller {
  constructor(store, { formView }) {
    this.store = store;
    this.formView = formView;
    this.subscribeViewEvents() // 1: 뷰 이벤트 구독할 수 있게 호출
  }

  subscribeViewEvents() {
    this.formView.on("@submit", event => this.search(event.detail.value)) // 2: 폼뷰에서 발행되는 @submit 이벤트를 검색 메소드가 처리하도록 연결.
  }

  search(keyword) {
    console.log(keyword) // 3: 간단히 로그찍기.
  }
}