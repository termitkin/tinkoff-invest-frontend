const getMaxQuantity = (asks, bids) => {
  let maxQuantity = 0;

  if (asks && bids) {
    [...asks, ...bids].forEach((item) => {
      if (item[1] > maxQuantity) {
        maxQuantity = item[1];
      }
    });
  }

  return maxQuantity;
};

export default getMaxQuantity;
