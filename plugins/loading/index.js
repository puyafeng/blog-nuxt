import './index.scss'
import maskImg from './mask.png'
import shapeImg from './shape.png'

class Loading {
  static id = 0

  static getId() {
    this.id += 0
    return `loading_${this.id}`
  }

  constructor() {
    this.id = Loading.getId()
    const html = `
        <div class="loading">
            <div class="gray"></div>
            <img src="${maskImg}"/>
            <img src="${shapeImg}"/>
        </div>`
    const dom = document.createElement('div')
    dom.id = this.id
    dom.className = 'loading-mask'
    dom.innerHTML = html
    document.getElementsByTagName('body')[0].appendChild(dom)
  }

  hide() {
    const { id } = this
    const dom = document.getElementById(id)
    if (dom) {
      dom.className = 'loading-mask hide'
    }
  }

  show() {
    const { id } = this
    const dom = document.getElementById(id)
    if (dom) {
      dom.className = 'loading-mask'
    }
  }
}
window.xdfLoading = new Loading()
window.xdfLoading.show()
