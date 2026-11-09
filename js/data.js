const CATEGORIES = ["All", "Sofas", "Chairs", "Tables", "Beds"];
const CATALOG = [
  {
    model: "sofa",
    cat: "Sofas",
    specs: [
      "Size: 210 × 90 × 85 cm",
      "Frame: Solid walnut",
      "Seats: 3",
      "Delivery: 2–3 weeks",
    ],
    opts: [
      ["Crimson", 0xa51f1a, 0.9, 0, "Velvet"],
      ["Chestnut", 0x6b3e26, 0.85, 0, "Leather"],
      ["Sand", 0xd8c3a5, 1, 0, "Linen"],
      ["Cocoa", 0x3b2418, 0.5, 0.1, "Leather"],
    ],
    items: [
      ["Cloudline Sectional", 1299, "assets/images/sofa%20(1).png", "A spacious, low-profile sectional with soft neutral cushions."],
      ["Oakmont Sofa", 1499, "assets/images/sofa%20(2).png", "A contemporary three-seater with deep, generously padded cushions."],
      ["Chesterfield Sofa", 1799, "assets/images/sofa%20(3).png", "A classic tufted sofa with rolled arms and a rich leather finish."],
      ["Golden Hour Sofa", 2199, "assets/images/sofa%20(4).png", "A relaxed, generously cushioned sofa in a warm golden fabric."],
    ],
  },
  {
    model: "chair",
    cat: "Chairs",
    specs: [
      "Size: 45 × 50 × 90 cm",
      "Frame: Walnut / Oak / Painted",
      "Weight: 5 kg",
      "Delivery: 1 week",
    ],
    opts: [
      ["Walnut", 0x5a3520, 0.6, 0, "Walnut wood"],
      ["Oak", 0xb98a55, 0.6, 0, "Oak wood"],
      ["Red lacquer", 0xb3261e, 0.25, 0.1, "Lacquer"],
      ["Ebony", 0x1f130d, 0.35, 0.1, "Ebony stain"],
    ],
    items: [
      ["Barcelona Lounge Chair", 529, "assets/images/Chair%20(1).png", "A distinctive leather lounge chair with a low profile and chrome frame."],
      ["Lounge Accent Chair", 349, "assets/images/Chair%20(2).png", "A softly upholstered accent chair with a modern silhouette."],
      ["Regency Tufted Chair", 579, "assets/images/Chair%20(3).png", "An ornate tufted armchair with carved details and a traditional finish."],
      ["Heritage Armchair", 449, "assets/images/Chair%20(4).png", "A timeless carved armchair with a light, comfortable seat."],
    ],
  },
  {
    model: "table",
    cat: "Tables",
    specs: [
      "Size: 180 × 90 × 75 cm",
      "Top: 4 cm solid wood",
      "Seats: 6",
      "Delivery: 2 weeks",
    ],
    opts: [
      ["Walnut", 0x5a3520, 0.55, 0, "Walnut wood"],
      ["Oak", 0xb98a55, 0.55, 0, "Oak wood"],
      ["Mahogany", 0x7a2a1c, 0.4, 0.05, "Mahogany"],
      ["Black ash", 0x24160f, 0.5, 0, "Ash stain"],
    ],
    items: [
      ["Emberwood Coffee Table", 499, "assets/images/Table%20(1).png", "A solid wood coffee table with a sculptural base."],
      ["Noir Storage Table", 649, "assets/images/Table%20(2).png", "A sleek coffee table with a bold black finish and useful storage."],
      ["Heritage Dining Table", 1199, "assets/images/Table%20(3).png", "A generous dining table with a thick, hand-finished wooden top."],
      ["Haven Coffee Table", 799, "assets/images/Table%20(4).png", "A contemporary coffee table with warm wood grain and open storage."],
    ],
  },
  {
    model: "bed",
    cat: "Beds",
    specs: [
      "Size: King 200 × 210 cm",
      "Headboard: Padded",
      "Slats: Included",
      "Delivery: 3 weeks",
    ],
    opts: [
      ["Brick red", 0x9c2a22, 0.9, 0, "Linen"],
      ["Espresso", 0x3a2216, 0.9, 0, "Velvet"],
      ["Camel", 0xb48556, 0.9, 0, "Cotton"],
      ["Stone", 0xcbbba6, 1, 0, "Cotton"],
    ],
    items: [
      ["Ember Platform Bed", 1099, "assets/images/Bed%20(1).png", "A low platform bed with a clean-lined upholstered headboard."],
      ["Regency Upholstered Bed", 1899, "assets/images/Bed%20(2).png", "An elegant upholstered bed with ornate details and a graceful profile."],
      ["Haven Tufted Bed", 1599, "assets/images/Bed%20(3).png", "A plush tufted bed with a warm, inviting finish."],
      ["Modern Wingback Bed", 1399, "assets/images/Bed%20(4).png", "A contemporary bed with a tall, softly padded wingback headboard."],
    ],
  },
];
const PRODUCTS = CATALOG.flatMap((category) =>
  category.items.map(([name, price, image, desc], i) => ({
    id: i === 0 ? category.model : `${category.model}-${i + 1}`,
    model: category.model,
    name,
    cat: category.cat,
    price,
    img: image,
    desc,
    specs: category.specs,
    opts: category.opts,
  })),
);
const money = (n) => "$" + n.toLocaleString();
function card(product) {
  return `<article class="card"><div class="img"><img src="${product.img}" alt="${product.name}" loading="lazy"></div><div class="body"><small>${product.cat}</small><h3>${product.name}</h3><p>${product.desc}</p><span class="price">${money(product.price)}</span><a class="btn" href="showroom.html?p=${product.id}">View in 3D</a></div></article>`;
}
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", () =>
      document.querySelector("nav").classList.toggle("open"),
    );
  }
});
