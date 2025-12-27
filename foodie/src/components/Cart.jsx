import React from 'react';
import { useSelector } from 'react-redux';
import Addtocartcard from './Addtocartcard';

function Cart() {
  const { cartList } = useSelector((state) => state.cart);

  return (
    <div className="max-w-[800px] mx-auto mt-6">
      {cartList.length > 0 ? (
        cartList.map((item) => <Addtocartcard key={item.idMeal} item={item} />)
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
