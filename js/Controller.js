class Controller {
  constructor(store, { formView }) {
    this.store = store; // 1
    this.formView = formView; // 2
    // 1, 2: 스토어와 뷰를 생성 시점에 받아서 저장.
    // 스토어와 뷰는 서로를 알지 못하기 때문에 얘네를 관리해 주는 역할을 컨트롤러가 하게 됨.
  }
}