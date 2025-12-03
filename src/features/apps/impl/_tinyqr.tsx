export class QRCode {
  modules: boolean[][] = []
  constructor(data: string) {
    const qrcode = require('qrcode-generator')(0, 'M')
    qrcode.addData(data)
    qrcode.make()
    const n = qrcode.getModuleCount()
    this.modules = Array.from({ length: n }, (_, y) =>
      Array.from({ length: n }, (_, x) => qrcode.isDark(y, x))
    )
  }
}
