const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};


const getJson = async (rows) => {
  const result = [];
  let temp = {};
  let subItemsArr = [];
  let saveItem = true;

  const CATEGORY = "Category";
  const RANK = "Rank";
  const MODIFIER_NAME = "Modifier Name";
  const DESCRIPTION = "Description";
  const BASE_PRICE = "Base price (If single item)";
  const MODIFIERS = "Modifiers";
  const SUB_MODIFIER_NAME = "Sub-Modifier name";
  const ITEMS = "Items";
  const UPC = "UPC#";
  const ITEMS_PRICE = "Items Price";

  let category = "";
  let items = [];
  let modifierName = "";
  let basePrice = "";
  let description = "";
  let modifiers = [];
  let subModifierName = "";
  let subModifierItems = [];

  for (i = 0; i < rows.length; i++) {
    // skip empty row
    if (
      !rows[i][CATEGORY] &&
      !rows[i][MODIFIER_NAME] &&
      !rows[i][DESCRIPTION] &&
      !rows[i][RANK] &&
      !rows[i][ITEMS] &&
      !rows[i][BASE_PRICE] &&
      !rows[i][SUB_MODIFIER_NAME] &&
      !rows[i][ITEMS_PRICE]
    ) {
      continue;
    }

    //logging category

    if (rows[i][CATEGORY]) {
      if (category) {
        temp.category = category;

        if (subModifierName) {
          modifiers.push({
            subModifierName: subModifierName,
            items: subModifierItems,
          });
        }

        items.push({
          modifierName: modifierName,
          description: description,
          basePrice: basePrice,
          modifiers: modifiers,
        });

        temp.items = items;
        result.push(temp);
        temp = {};
        items = [];
        modifiers = [];

        modifierName = rows[i][MODIFIER_NAME];
        description = rows[i][DESCRIPTION];
        basePrice =
          !rows[i][BASE_PRICE] && !rows[i][SUB_MODIFIER_NAME]
            ? rows[i][ITEMS_PRICE]
            : rows[i][BASE_PRICE];
      }

      category = rows[i][CATEGORY];
    }

    // logging items

    if (rows[i][MODIFIER_NAME]) {
      if (modifierName) {
      
        if (subModifierName) {
          modifiers.push({
            subModifierName: subModifierName,
            items: subModifierItems,
          });
        }

        items.push({
          modifierName: modifierName,
          description: description,
          basePrice: basePrice,
          modifiers: modifiers,
        });
      }

      modifierName = rows[i][MODIFIER_NAME];
      description = rows[i][DESCRIPTION];
      basePrice =
        !rows[i][BASE_PRICE] && !rows[i][SUB_MODIFIER_NAME]
          ? rows[i][ITEMS_PRICE]
          : rows[i][BASE_PRICE];
      subModifierName = "";

      modifiers = [];
    }

    //logging submodifiers
    if (rows[i][SUB_MODIFIER_NAME]) {
      if (subModifierName) {
        modifiers.push({
          subModifierName: subModifierName,
          items: subModifierItems,
        });
      }

      subModifierName = rows[i][SUB_MODIFIER_NAME];

      subModifierItems = [];
    }

    // logging submodifiers items
    if (rows[i][ITEMS]) {
      subModifierItems.push({
        name: rows[i][ITEMS],
        price: rows[i][ITEMS_PRICE],
      });
    }
  }

  // edge case for last item
  temp.category = category;

  if (subModifierName) {
    modifiers.push({
      subModifierName: subModifierName,
      items: subModifierItems,
    });
  }

  items.push({
    modifierName: modifierName,
    description: description,
    basePrice: basePrice,
    modifiers: modifiers,
  });

  temp.items = items;
  result.push(temp);

  //console.log(JSON.stringify(result, null, 4));

  return result;
};

const processSheets = async () => {
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const creds = require("../client_secret.json");

  const doc = new GoogleSpreadsheet(
    "1H9VBOU_EuCW_-rmjKCEI5Zmx-bsB2SdcdbWW0okx0yg"
  );

  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  const jsonResponse = await getJson(rows);

  return jsonResponse;
};

module.exports = { sleep, getJson, processSheets };

// const sampleObj = [
//   {
//     Category: "string",
//     Items: [
//       {
//         //item without modifiers
//         MODIFIER_NAME: "Miller Lite - (30 pk - 12 oz Cans )",
//         DESCRIPTION:
//           "4.2% ABV. Brewed for more taste, this light beer has a light to medium body with a hop forward flavor, solid malt character and a clean finish. Must be 21 to purchase.",
//         BASE_PRICE: "39.99",
//       },
//       {
//         //item with modifiers
//         MODIFIER_NAME: "Miller Lite - (30 pk - 12 oz Cans )",
//         DESCRIPTION:
//           "4.2% ABV. Brewed for more taste, this light beer has a light to medium body with a hop forward flavor, solid malt character and a clean finish. Must be 21 to purchase.",
//         modifiers: [
//           {
//             SUB_MODIFIER_NAME: "Beer Pong Kit Choices",
//             Items: [
//               {
//                 item: "Kit # 1 (30 Pk Cans of Bud Light + 50 - 18 Oz Solo Cups + 6 Pk of Ping Pong Balls)",
//                 price: "48.99",
//               },
//               {
//                 item: "Kit # 2 (24 Pk Cans of White Claw Variety + 50 - 18 Oz Solo Cups + 6 pk of Ping Pong Balls)",
//                 price: "59.99",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
