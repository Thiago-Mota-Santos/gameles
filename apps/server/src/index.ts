import "dotenv/config";
import { createServer } from "node:http";
import { connectDatabase } from "./database";
import { app } from "./app";

void (async () => {
  await connectDatabase();
  const PORT = process.env.PORT as string;
  const server = createServer(app.callback());
  console.log(PORT);
  server.listen(PORT, () => {
    console.log("Server is running");
  });
})();
