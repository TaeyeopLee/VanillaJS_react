class Controller {
  constructor(store, { formView }) {
    this.store = store;
    this.formView = formView;
    this.subscribeViewEvents()
  }

  subscribeViewEvents() {
    this.formView
      .on("@submit", event => this.search(event.detail.value))
      .on("@reset", _ => this.reset()) // 1: reset() 메소드 호출
  }

  search(keyword) {
    console.log(keyword)
  }

  reset() {
    console.log("@reset");
  }
}