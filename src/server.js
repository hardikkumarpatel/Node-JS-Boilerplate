import App from "@/app";
import { Log } from "@/helpers";

(async () => {
  await new App().run().catch(Log.exit.bind(Log));
})();
