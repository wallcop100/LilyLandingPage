/* ================= IMAGE LIST (ORDERED + WEIGHTED) ================= */

const imageList = [
  { src: "waterfallimages/band.png",        weight: 1 },
  { src: "waterfallimages/bankcard.png",    weight: 1 },
  { src: "waterfallimages/button.png",      weight: 1 },
  { src: "waterfallimages/coin 1.png",      weight: 1 },
  { src: "waterfallimages/coin2.png",       weight: 1 },
  { src: "waterfallimages/cream.png",       weight: 1 },
  { src: "waterfallimages/earring.png",     weight: 1 },
  { src: "waterfallimages/greeen1.png",     weight: 1 },
  { src: "waterfallimages/gum.png",         weight: 1 },
  { src: "waterfallimages/ID.png",          weight: 1 },
  { src: "waterfallimages/keys.png",        weight: 1 },
  { src: "waterfallimages/lipbalm.png",     weight: 1 },
  { src: "waterfallimages/lipgloss.png",    weight: 1 },
  { src: "waterfallimages/money(3).png",    weight: 1 },
  { src: "waterfallimages/pencil.png",      weight: 1 },
  { src: "waterfallimages/photo.png",       weight: 1 },
  { src: "waterfallimages/pill.png",        weight: 5 },
  { src: "waterfallimages/pills.png",       weight: 1 },
  { src: "waterfallimages/pin.png",         weight: 1 },
  { src: "waterfallimages/ring.png",        weight: 1 },
  { src: "waterfallimages/scissors.png",    weight: 1 },
  { src: "waterfallimages/trainticket.png", weight: 1 },
  { src: "waterfallimages/banana.png",      weight: 0.5 },
  { src: "waterfallimages/badge.png",       weight: 0.5 },
  { src: "waterfallimages/paperclip.png",   weight: 1 }
];

// Preload images
imageList.forEach(i => {
  const img = new Image();
  img.src = i.src;
  i.img = img;
});