import Keycloak from "keycloak-js";

const kcInitOptions = {
  checkLoginIframe: false,
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
}

class AuthService {
  instance;
  _loginOptions;

  constructor(config, loginOptions) {
    this.instance = Keycloak(config)
    this._loginOptions = loginOptions;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.init = this.init.bind(this);
  }

  login() {
    this.instance.login(this._loginOptions);
  }

  logout() {
    this.instance.logout();
  }

  updateToken() {
    this.instance.updateToken(5)
      .catch(this.login);
  }

  init(onAuthCallback = () => {}) {
    this.instance.init(kcInitOptions)
      .then(() => {
        onAuthCallback()
      });
  }
}

export default AuthService;
