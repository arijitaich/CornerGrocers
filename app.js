const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./client_secret.json");
const { getJson } = require("./utils/func");

async function spreadsheetAuth() {
  const doc = new GoogleSpreadsheet(
    "1H9VBOU_EuCW_-rmjKCEI5Zmx-bsB2SdcdbWW0okx0yg"
  );

  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  const jsonResponse = await getJson(rows);

  console.log(jsonResponse);
}

// Events
//      Add
//         item
//         item with modifiers
//     update
//         item
//         item with modifiers

spreadsheetAuth();
