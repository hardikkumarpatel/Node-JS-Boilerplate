class LocaleService {
  constructor(i18n) {
    this.i18n = i18n;
    this.middleware = this.middleware.bind(this);
  }

  middleware(req, res, next) {
    req.i18n = this.i18n;
    next();
  }
}

export default LocaleService;
