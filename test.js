require('dotenv').config()
const express = require('express')
const grubhub = require("./integrations/grubhub/grubhub");

const app = express();

app.listen(process.env.PORT, () => console.log(`*** Server running on port ${process.env.PORT} ***`));

async function main() {
  await grubhub();
}


main();
