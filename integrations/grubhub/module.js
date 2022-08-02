

const isCategoryPresent = async (page,category) => {

    const categoryHandle = (await page.$x(`//a[text()="${category}" and @class="menu-nav-list__link-name"]`))[0]

    if (categoryHandle) return categoryHandle

    const selectedCategoryHandle = (await page.$x(`//strong[text()="${category}"]`))[0]

    if (selectedCategoryHandle) return selectedCategoryHandle

    return false

}

const isItemPresent = async (page,categoryHandle,category,item) => {

    await categoryHandle.click()
    await page.waitForXPath(`//h2[text()="${category}"]`)
    console.log('"category" '+category+' changed successfully')
    //.menu-section-item  p - description
    //.menu-section-item h4 - title

    const itemHandle = (await page.$x(`//h4[text()="${item}"]`))[0]

   if (itemHandle) return itemHandle

   return false
    

}

const addCategory = async(page,category,description='') => {
    //selectors
    const ADD_NEW_SECTION_XPATH = '//button[text()="Add new section"]'
    const SECTION_NAME_SELECTOR = 'input[name="sectionName"]'
    const SECTION_DESCRIPTION_SELECTOR = 'textarea[name="description"]'
    const SECTION_SUBMIT_SELECTOR = '.gfr-modal__footer button[type="submit"]'

    await(await page.$x(ADD_NEW_SECTION_XPATH))[0].click()
    
    await page.waitForSelector(SECTION_NAME_SELECTOR)
    await page.type(SECTION_NAME_SELECTOR,category)

    await page.type (SECTION_DESCRIPTION_SELECTOR,'')

    await page.click(SECTION_SUBMIT_SELECTOR)


}

const addItem = async (page,itemObj) => {

    itemObj = {
        "modifierName": "Beer Pong Kit",
        "description": "Bud Light & White Claw Packs with glasses & ping pong balls for parties. Must be 21 to purchase.",
        "basePrice": "",
        "modifiers": [
          {
            "subModifierName": "Beer Pong Kit Choices",
            "items": [
              {
                "name": "Kit # 1 (30 Pk Cans of Bud Light + 50 - 18 Oz Solo Cups + 6 Pk of Ping Pong Balls)",
                "price": "48.99"
              },
              {
                "name": "Kit # 2 (24 Pk Cans of White Claw Variety + 50 - 18 Oz Solo Cups + 6 pk of Ping Pong Balls)",
                "price": "59.99"
              }
            ]
          },
          {
            "subModifierName": "Beer Pong Kit Choices#34",
            "items": [
              {
                "name": "Kit # 1 (30 Pk Cans of Bud Light + 50 - 18 Oz Solo Cups + 6 Pk of Ping Pong Balls)",
                "price": "48.99"
              }
            ]
          }
        ]
      }

    //selectors
    const ADD_ITEM_BUTTON_XPATH = '//button[text()="Add item" or text()="+ Add an item"]';
    const ITEM_NAME_SELECTOR = 'input[name="name"]';
    const ITEM_DESCRIPTION_SELECTOR = 'textarea[name="description"]';
    const ITEMS_PRICE_SELECTOR = 'input[name="price"]';
    const ADD_NEW_MODIFIER_XPATH = '//button[text()="Add new modifier group"]'
    const SUB_MODIFIER_NAME_SELECTOR = 'input[name="modifierPrompt_name"]'
    const ADD_ANOTHER_SUBMODIFIER_XPATH = '//button[text()="+ Add Another"]'
    const SUB_MODIFIER_ITEM_NAME_XPATH = '//input[contains(@class,"gfr-textfield-text__input") and @placeholder="Name"]'
    const SUB_MODIFIER_ITEM_PRICE_XPATH =  '//div[@class="dnd-ordered-list"]//input[@placeholder="$0"]'
    const SAVE_BUTTON_XPATH = '//button[text()="Save"]'



    await (await page.$x(ADD_ITEM_BUTTON_XPATH))[0].click() 
  

   // await page.waitForNavigation({waitUntil:'networkidle2'}) 

    await page.waitForSelector(ITEM_NAME_SELECTOR)
    await page.screenshot({
      path: './s4.png',
      fullPage: true,
    })
    await page.type(ITEM_NAME_SELECTOR,itemObj.modifierName) // Add modifier  name 
    console.log('modifier name added')
    
    await page.screenshot({
      path: './s5.png',
      fullPage: true,
    })

    await page.type(ITEM_DESCRIPTION_SELECTOR,itemObj.description) // Add modifier description
    console.log('modifier description added')

    await page.type(ITEMS_PRICE_SELECTOR,itemObj.basePrice) // Add Base Price
    console.log('base price added')




}





module.exports = {addItem,isCategoryPresent,isItemPresent,addCategory}