import Vue from "vue";
import VueI18n from "vue-i18n";

// Localisation language list
import { locale as en } from "@/core/config/i18n/en";
import { locale as bn } from "@/core/config/i18n/bn";

Vue.use(VueI18n);

let messages = {};
messages = { ...messages, en, bn };

// get current selected language
const lang = localStorage.getItem("language") || "en";

const numberFormats = {
  "en-US": {
    currency: {
      style: "currency",
      currency: "USD"
    }
  },
  "bn-BD": {
    currency: {
      style: "currency",
      currency: "BDT",
      currencyDisplay: "symbol"
    }
  }
};

const dateTimeFormats = {
  "en-US": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  "bn-BD": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  }
};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  messages, // set locale messages
  numberFormats, // set number formats
  dateTimeFormats // set date time formats
});

export default i18n;
