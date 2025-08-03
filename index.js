require("dotenv").config();
const venom = require("venom-bot");
const axios = require("axios");

venom
  .create({
    session: "session-name",
    multidevice: true,
  })
  .then((client) => start(client))
  .catch((err) => {
    console.log("❌ Error al iniciar Venom:", err);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.body && message.isGroupMsg === false) {
      console.log("📩 Mensaje recibido:", message.body);

      await axios.post(process.env.N8N_WEBHOOK_URL, {
        de: message.from,
        mensaje: message.body,
      });

      client.sendText(message.from, "✅ Recibido. ¡Gracias!");
    }
  });
}