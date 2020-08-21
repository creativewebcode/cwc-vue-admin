import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

Sentry.init({
  dsn:
    "https://b1b98c555332440fb898ae948334359b@o436308.ingest.sentry.io/5397235",
  integrations: [new VueIntegration({ Vue, attachProps: true })]
});
export default Sentry;
