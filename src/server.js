import ExpressEngine from "@/app";
import { Log } from "@/helpers";

(async () => {
  await new ExpressEngine().run().catch(Log.error);
})();
