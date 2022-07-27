const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

const getJson = async (rows) => {
  const result = [];
  let temp = {
    Category: '',
    Items:[]
  };
  let subItemsArr = []
  let saveItem = true
  const CATEGORY = "Category";
  const RANK = "Rank";
  const MODIFIER_NAME = "Modifier Name";
  const DESCRIPTION = "Description";
  const BASE_PRICE = "Base price (If single item)";
  const SUB_MODIFIER_NAME = "Sub-Modifier name";
  const ITEMS = "Items";
  const UPC = "UPC#";
  const ITEMS_PRICE = "Items Price";

  for (i=0;i<rows.length;i++) {
     console.log(temp[CATEGORY],rows[i][CATEGORY]);

    // if (rows[i][CATEGORY]== undefined) {continue;}

    if (rows[i][CATEGORY] != '' && i!=0) {
      //  console.log(temp[ITEMS].length)
      result.push(temp);
     // console.log(result)
      temp = {
        Category: '',
        Items:[]
      };
    //   continue;
    }

    if (!temp[CATEGORY])  temp[CATEGORY] = rows[i][CATEGORY];


    if (!rows[i][BASE_PRICE]) // subitems are present
    {
        if (saveItem){
            subItem = {
                MODIFIER_NAME: rows[i][MODIFIER_NAME],
                DESCRIPTION : rows[i][DESCRIPTION],
                BASE_PRICE : rows[i][BASE_PRICE],
                SUB_MODIFIER_NAME : rows[i][SUB_MODIFIER_NAME],      
                UPC : rows[i][UPC],    
            }
        }

        saveItem = false

        subItemsArr.push({
            item: rows[i][ITEMS],
            price: rows[i][ITEMS_PRICE]
        })

        if (rows[i+1][MODIFIER_NAME]!='' )
        {
            subItem[ITEMS] = subItemsArr
            temp[ITEMS].push(subItem)
            subItemsArr = []
            saveItem = true
            
        }
  
        continue
        

    }

    item = {
        MODIFIER_NAME: rows[i][MODIFIER_NAME],
        DESCRIPTION : rows[i][DESCRIPTION],
        BASE_PRICE : rows[i][BASE_PRICE],
        SUB_MODIFIER_NAME : rows[i][SUB_MODIFIER_NAME],
        ITEMS : rows[i][ITEMS],
        UPC : rows[i][UPC],
        ITEMS_PRICE : rows[i][ITEMS_PRICE],
    }

    temp[ITEMS].push(item)

   
  }
 
  result.push(temp);

 console.log(JSON.stringify(result,null,4));
  

  return result;
};

module.exports = { sleep, getJson };
