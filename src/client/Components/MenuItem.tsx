import React, { MouseEventHandler } from "react";

type Props = {
  title: string;
  key: number;
  description: string;
  isGroupOrder: boolean;
  quantity: number;
  minQty: number;
  maxQty: number;
  totalFoodItems: number;
  totalPeople: number;
  onAdd: MouseEventHandler<HTMLButtonElement>;
  onSubtract: MouseEventHandler<HTMLButtonElement>;
  testId: string;
  className: string;
};

export const MenuItem = ({
  title,
  key,
  description,
  isGroupOrder,
  totalFoodItems,
  totalPeople,
  quantity,
  minQty,
  maxQty,
  onAdd,
  onSubtract,
  testId,
  className
}: Props): JSX.Element => {
  return (
    <div className={className} data-testid={testId}>
      <h3>{title}</h3>
      <p>{description}</p>

      <input disabled={true} type="number" name={testId} id="" value={quantity} />
      <button
        type="button"
        disabled={quantity === 0}
        onClick={onSubtract}
        data-testid="Counter Subtract Button"
      >
        -
      </button>
      <button
        type="button"
        disabled={
          quantity >= maxQty ||
          quantity >= totalPeople ||
          totalFoodItems >= totalPeople
        }
        onClick={onAdd}
        data-testid="Counter Add Button"
      >
        +
      </button>
      {minQty > 1 && (
        <p>This item requires a minimum of {minQty} servings to order.</p>
      )}
      {maxQty > 0 && maxQty !== Infinity && (
        <p>This item is limited to {maxQty} per order or one per person.</p>
      )}
    </div>
  );
};
