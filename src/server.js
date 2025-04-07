import App from "@/app";
import { Log } from "@/helpers";

async function bootstrap() {
  try {
    await new App().run();
  } catch (error) {
    Log.exit(error);
  }
}

/** Bootstrap the Engine */
bootstrap();
