declare const __webpack_init_sharing__: (scope: 'default') => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };
declare const window: Record<string, any>;

type IServer = Record<string, string>;

export class LoadRemoteModule {
  private definitions_?: IServer;
  private serverHost_?: string
  private apps_: string[] = [];

  public get apps(): string[] {
    return this.apps_;
  }

  public setHost(serverHost: string): this {
    this.serverHost_ = serverHost;
    return this;
  }

  public async loadServers() {
    if (!this.serverHost_) {
      return;
    }
    this.definitions_ = await (await fetch(this.serverHost_)).json();
    console.log('definitions', this.definitions_);
    this.apps_ = [];
    for (const key in this.definitions_) {
      await this.loadRemoteEntry(this.definitions_[key]);
      this.apps_.push(key);
    }
  }

  private loadRemoteEntry(url: string) {
    return new Promise((resolve, reject) => {
      const element = document.createElement('script');
      element.src = url + '/remoteEntry.js';
      element.type = 'text/javascript';
      element.async = true;
      element.onload = () => resolve(element);
      element.onerror = reject;
      document.head.appendChild(element);
    });
  }

  async loadComponent(scope: string, module: string) {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  }
}