
/**
 * This function calculates a new order total Price
 * @param {Array} products cartProducts: Objects array
 * @returns {number} Total price
 */
export const totalPrice = (products) =>{
  let sum = 0 //acumulador
  products.forEach(product => sum += product.price);
  return sum
}