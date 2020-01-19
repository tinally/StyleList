import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";

import ProductCard from "../Card/ProductCard";
import "./Deck.css";

const data_one = [
  {
    product_name: "Logo One-Piece Swimsuit",
    img_url: "https://n.nordstrommedia.com/id/sr3/a3c47a21-ad49-4b4f-ab47-715bc989ac44.jpeg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=1.5",
    product_url: "https://shop.nordstrom.com/s/gucci-logo-one-piece-swimsuit/5116547/full?origin=category-personalizedsort&breadcrumb=Home%2FBrands%2FGucci&color=black%2F%20multicolor",
    details: "A logo inspired by Gucci's designs from the '80s adds signature style to a svelte one-piece that looks just as good tucked into jeans as it does by the pool.",
    color_url_list: ["https://n.nordstrommedia.com/id/sr3/c6cf4b3d-64e9-440a-8c5d-f74c333f58f3.jpeg?crop=fit&w=31&h=31"],
    price: 450
  },
  {
    product_name: "Jacquard Stripe Sleeve Piqué Polo",
    img_url: "https://n.nordstrommedia.com/id/sr3/59069faa-6f1b-4144-ab43-66c3d780ad6d.jpeg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196",
    product_url: "https://shop.nordstrom.com/s/gucci-jacquard-stripe-sleeve-pique-polo/4787761/full?origin=category-personalizedsort&breadcrumb=Home%2FBrands%2FGucci&color=black",
    details: "Gucci-branded stripe trim edges the shoulders of a classic stretch-piqué polo topped with a contrasting tipped collar.",
    color_url_list: ["https://n.nordstrommedia.com/id/sr3/c6cf4b3d-64e9-440a-8c5d-f74c333f58f3.jpeg?crop=fit&w=31&h=31"],
    price: 931
  },
  {
    product_name: "Roxwell Vintage Check Hood Thermoregulated Quilted Coat",
    img_url: "https://n.nordstrommedia.com/id/sr3/4be64dbd-37d2-4c3b-be6b-944c2065badf.jpeg?crop=pad&pad_color=FFF&format=jpeg&w=1660&h=2546",
    product_url: "https://shop.nordstrom.com/s/gucci-jacquard-stripe-sleeve-pique-polo/4787761/full?origin=category-personalizedsort&breadcrumb=Home%2FBrands%2FGucci&color=black",
    details: "This diamond-quilted coat features innovative 37.5® thermoregulation technology that both evaporates moisture and traps body heat to keep you comfortable.",
    color_url_list: ["https://n.nordstrommedia.com/id/sr3/73634bea-b154-4f69-9a2a-ef00e7641424.jpeg?crop=fit&w=31&h=31", "https://n.nordstrommedia.com/id/sr3/73634bea-b154-4f69-9a2a-ef00e7641424.jpeg?crop=fit&w=31&h=31"],
    price: 1301.50
  },

];

const data_two =
  [
    {
      product_name: "Jacquard Stripe Sleeve Piqué Polo",
      img_url: "https://n.nordstrommedia.com/id/sr3/59069faa-6f1b-4144-ab43-66c3d780ad6d.jpeg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196",
      product_url: "https://shop.nordstrom.com/s/gucci-jacquard-stripe-sleeve-pique-polo/4787761/full?origin=category-personalizedsort&breadcrumb=Home%2FBrands%2FGucci&color=black",
      details: "Gucci-branded stripe trim edges the shoulders of a classic stretch-piqué polo topped with a contrasting tipped collar.",
      color_url_list: ["https://n.nordstrommedia.com/id/sr3/c6cf4b3d-64e9-440a-8c5d-f74c333f58f3.jpeg?crop=fit&w=31&h=31"],
      price: 931
    }
  ];

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 10,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

// const trans = (r, s) =>
//   `perspective(1500px) rotateX(0deg) rotateY(${r /
//     9}deg) rotateZ(${r}deg) scale(${s})`;

const trans = (r, s) =>
  `perspective(1500px) rotateX(0 deg) rotateY(${r /
  0}deg) rotateZ(0deg) scale(${s})`;

function Deck() {
  const [flipped, flip] = useState(false);
  const data = flipped ? data_one : data_two;
  
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(data.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.5;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        gone.add(index);
        console.log(index)
        let direction = xDir < 0 ? "left" : "right"
        console.log(direction)
      }

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === data.length) {
        // api call to backend
        flip(!flipped);
        console.log(flipped);
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
      }
    }
  );

  return props.map(({ x, y, rot, scale }, i) => (
    <ProductCard
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      data={data}
      bind={bind}
    />
  ));
}

export default Deck;