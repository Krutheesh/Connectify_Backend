
const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");
dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not defined in the environment variables.");
}

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

module.exports= {client,sender}