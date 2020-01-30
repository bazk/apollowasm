export default class AGC {
  static load() {
    return new Promise(resolve => {
      const Module = {
        canvas: document.createElement("canvas") || {},
        setStatus: status => {
          console.log("status:", status);
        },
        print: text => {
          console.log(text);
        },
        printErr: error => {
          console.error(error);
        },
        preRun: [
          () => {
            resolve(
              new AGC({
                advance: Module.cwrap("advance", "number", []),
                sendPort: Module.cwrap("sendPort", "number", [
                  "number",
                  "number",
                  "number"
                ]),
                scanPort: Module.cwrap("scanPort", "number", ["number"]),
                peek: Module.cwrap("peek", "number", ["number"]),
                poke: Module.cwrap("poke", "number", ["number", "number"])
              })
            );
          }
        ]
      };

      global.Module = Module;

      const script = document.createElement("script");
      script.src = "/agc11.js";
      document.body.append(script);
    });
  }

  constructor(callbacks) {
    this.callbacks = callbacks;
  }

  tick() {
    return this.callbacks.advance();
  }

  send(channel, value, mask) {
    return this.callbacks.sendPort(channel, value, mask);
  }

  scan(mask) {
    return this.callbacks.scanPort(mask);
  }

  peek(address) {
    return this.callbacks.peek(address);
  }

  poke(address, value) {
    return this.callbacks.poke(address, value);
  }
}
