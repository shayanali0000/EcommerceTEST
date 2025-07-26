// console.clear();

console.log(document.cookie);

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.appendChild(document.createTextNode(ob.name));

  let h4 = document.createElement("h4");
  h4.appendChild(document.createTextNode(ob.brand));

  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode("Rs " + ob.price));

  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);

  boxDiv.appendChild(boxLink);

  return boxDiv;
}

// DOM references
let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
let containerMart = document.getElementById("containerMart"); // ✅ New

// Static product list
let contentTitle = [
  {
    id: 1,
    name: "Red T-Shirt",
    preview: "images/red-tshirt.jpg",
    brand: "Nike",
    price: 999,
    isAccessory: false
  },
  {
    id: 2,
    name: "Stylish Watch",
    preview: "images/watch.jpg",
    brand: "Fossil",
    price: 4999,
    isAccessory: true
  },
  {
    id: 3,
    name: "Blue Hoodie",
    preview: "images/hoodie.jpg",
    brand: "Adidas",
    price: 1299,
    isAccessory: false
  },
  {
    id: 4,
    name: "Sunglasses",
    preview: "images/sunglasses.jpg",
    brand: "Ray-Ban",
    price: 2999,
    isAccessory: true
  },
  {
    id: 5,
    name: "Organic Apples",
    preview: "images/apples.jpg",
    brand: "Nature's Basket",
    price: 199,
    isAccessory: false,
    isMart: true // ✅ Mart product
  },
  {
    id: 6,
    name: "Rice 5kg",
    preview: "images/rice.jpg",
    brand: "SuperMart",
    price: 899,
    isAccessory: false,
    isMart: true // ✅ Mart product
  }
];

// Render cards
for (let i = 0; i < contentTitle.length; i++) {
  let item = contentTitle[i];

  if (item.isMart) {
    containerMart.appendChild(dynamicClothingSection(item));
  } else if (item.isAccessory) {
    containerAccessories.appendChild(dynamicClothingSection(item));
  } else {
    containerClothing.appendChild(dynamicClothingSection(item));
  }
}
