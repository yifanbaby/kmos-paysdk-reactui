declare module '*.less' {
  const value: {
    [key: string]: string
  }
  export = value
}

declare module '*.png'

declare module '*.svg'

interface Window { $sensors: any; }

declare let WeixinJSBridge: any;
declare let window: window & { attachEvent : any};

