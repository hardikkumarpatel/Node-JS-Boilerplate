import App from "@/app";
import { Log } from "@/helpers";

async function bootstrap() {
  try {
    await new App().run();
  } catch (error) {
    Log.exit("Error", new Error(error));
  }
}

/** Bootstrap the Engine */
bootstrap();
