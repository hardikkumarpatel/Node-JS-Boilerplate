import i18n from "i18n";

class I18n {
  init() {
    i18n.configure({
      locales: ["en", "fr"],
      defaultLocale: "en",
      directory: __dirname + "/locales",
      api: {
        __: "translate",
        __n: "translateN"
      }
    });
    return i18n;
  }
}

export default I18n;
