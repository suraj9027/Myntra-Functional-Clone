
const CONVENIENCE_FEES = 99;

// GLOBAL ARRAY
let bagItemObjects = [];

// ENTRY POINT
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");

  let totalItem =bagItemObjects.length;
  let totalMRP =0;
  let totalDiscount = 0;
  let finalPayment =0;
  
  bagItemObjects.forEach(bagItem =>{
    totalMRP+=bagItem.original_price;
    totalDiscount+=bagItem.original_price-bagItem.current_price;
  })

    finalPayment = totalMRP-totalDiscount+CONVENIENCE_FEES;


  bagSummaryElement.innerHTML = `  <div class="bag-details-container">
                    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
                    <div class="price-item">
                        <span class="price-item-tag">Total MRP</span>
                        <span class="price-item-value">₹${totalMRP}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Discount on MRP</span>
                        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Convenience Fee</span>
                        <span class="price-item-value">₹ 99</span>
                    </div>
                    <hr>
                    <div class="price-footer">
                        <span class="price-item-tag">Total Amount</span>
                        <span class="price-item-value">₹ ${finalPayment}</span>
                    </div>
                </div>
                <button class="btn-place-order">
                    <div class="css-xjhrni">PLACE ORDER</div>
                </button>`;
}

// LOAD ITEMS FROM bagItems (IDs) → FULL OBJECTS
function loadBagItemObjects() {
  // safety: if bagItems not defined
  if (!bagItems) {
    bagItemObjects = [];
    return;
  }

  // convert IDs → actual item objects
  bagItemObjects = bagItems
    .map((itemId) => {
      return items.find((item) => item.id == itemId);
    })
    .filter((item) => item !== undefined); // remove undefined if not found

  console.log("Loaded Items:", bagItemObjects);
}

// DISPLAY ITEMS IN UI
function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");

  // EMPTY BAG CASE
  if (!bagItemObjects || bagItemObjects.length === 0) {
    containerElement.innerHTML = "<h2>Your Bag is Empty 🛒</h2>";
    return;
  }

  let innerHTML = "";

  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });

  containerElement.innerHTML = innerHTML;
}

// GENERATE SINGLE ITEM HTML
function generateItemHTML(item) {
  return `
    <div class="bag-item-container">

        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
        </div>

        <div class="item-right-part">
            <div class="company">${item.company}</div>

            <div class="item-name">${item.item_name}</div>

            <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>

            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>

            <div class="delivery-details">
                Delivery by 
                <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
        </div>

        <div class="remove-from-cart" onclick="removeFromBag('${item.id}')">X</div>

    </div>`;
}

// REMOVE ITEM FUNCTION
function removeFromBag(itemId) {
  bagItems = bagItems.filter((id) => id != itemId);

  // save updated bag
  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  // reload UI
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}
