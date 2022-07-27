const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

const getJson = async (rows) => {
  const result = [];
  let temp = {
    Category: "",
    Items: [],
  };
  let subItemsArr = [];
  let saveItem = true;
  const CATEGORY = "Category";
  const RANK = "Rank";
  const MODIFIER_NAME = "Modifier Name";
  const DESCRIPTION = "Description";
  const BASE_PRICE = "Base price (If single item)";
  const SUB_MODIFIER_NAME = "Sub-Modifier name";
  const ITEMS = "Items";
  const UPC = "UPC#";
  const ITEMS_PRICE = "Items Price";

  for (i = 0; i < rows.length; i++) {
    if (rows[i][CATEGORY] != "" && i != 0) {
      result.push(temp);
      temp = {
        Category: "",
        Items: [],
      };
    }

    if (!temp[CATEGORY]) temp[CATEGORY] = rows[i][CATEGORY];

    if (!rows[i][BASE_PRICE]) {
      // if subitems are present
      if (saveItem) {
        subItem = {
          MODIFIER_NAME: rows[i][MODIFIER_NAME],
          DESCRIPTION: rows[i][DESCRIPTION],
          BASE_PRICE: rows[i][BASE_PRICE],
          SUB_MODIFIER_NAME: rows[i][SUB_MODIFIER_NAME],
          UPC: rows[i][UPC],
        };
      }

      saveItem = false;

      subItemsArr.push({
        item: rows[i][ITEMS],
        price: rows[i][ITEMS_PRICE],
      });

      if (rows[i + 1][MODIFIER_NAME] != "") {
        subItem[ITEMS] = subItemsArr;
        temp[ITEMS].push(subItem);
        subItemsArr = [];
        saveItem = true;
      }

      continue;
    }

    item = {
      MODIFIER_NAME: rows[i][MODIFIER_NAME],
      DESCRIPTION: rows[i][DESCRIPTION],
      BASE_PRICE: rows[i][BASE_PRICE],
      SUB_MODIFIER_NAME: rows[i][SUB_MODIFIER_NAME],
      ITEMS: rows[i][ITEMS],
      UPC: rows[i][UPC],
      ITEMS_PRICE: rows[i][ITEMS_PRICE],
    };

    temp[ITEMS].push(item);
  }

  result.push(temp);

  return result;
};

module.exports = { sleep, getJson };
