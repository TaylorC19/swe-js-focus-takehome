import React, {MouseEventHandler} from "react";

type Props = {
  title: string;
  key: number;
  description: string;
  isGroupOrder: boolean;
  quantity: number;
  minQty: number;
  maxQty: number;
  onAdd: MouseEventHandler<HTMLButtonElement>;
  onSubtract: MouseEventHandler<HTMLButtonElement>;
};

export const MenuItem = ({ title, key, description, isGroupOrder, quantity, minQty, maxQty, onAdd, onSubtract }:Props): JSX.Element => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>

      <div>
        <input type="number" name="" id="" value={quantity} />
        <button type="button" disabled={quantity <= minQty} onClick={onSubtract}>-</button>
        <button type="button" disabled={quantity >= maxQty} onClick={onAdd}>+</button>
      </div>
    </div>
  )
}