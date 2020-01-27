export default class AGC {
  static load() {
    const cfg = {
      print: text => {
        console.log(text);
      },
      printErr: error => {
        console.error(error);
      }
    };

    return new Promise(resolve => {
      global.Module(cfg).then(mod => resolve(new AGC(mod)));
    });
  }

  constructor(mod) {
    this.module = mod;
    this.tick = mod.cwrap("advance", "number", []);
    this.sendPort = mod.cwrap("sendPort", "number", ["number", "number"]);
    this.scanPort = mod.cwrap("scanPort", "number", ["number"]);
  }
}
