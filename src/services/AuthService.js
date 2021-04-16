import Keycloak from "keycloak-js";
import config from 'config'

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
    return this.instance.login(this._loginOptions);
  }

  logout() {
    return this.instance.logout();
  }

  updateToken() {
    return this.instance.updateToken(30)
      .catch(this.login);
  }

  init(onAuthCallback = () => {}) {
    return this.instance.init(kcInitOptions)
      .then(() => {
        onAuthCallback()
      });
  }

  get accessToken() {
    return this.instance.token;
  }
}

const AuthInstance = new AuthService(config.keycloakConfig, {redirectUri: window.location.origin})

export default AuthInstance;
