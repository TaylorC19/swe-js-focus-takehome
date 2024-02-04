import React, {MouseEventHandler} from "react";

type Props = {
  counter: number;
  subtractDisable: boolean;
  handleSubtract: MouseEventHandler<HTMLButtonElement>;
  addDisable: boolean;
  handleAdd: MouseEventHandler<HTMLButtonElement>;
  componentId: string;
  labelName: string;
  labelHtmlFor: string;
};

export const PartySizeAlias = ({
  counter,
  subtractDisable,
  handleSubtract,
  addDisable,
  handleAdd,
  componentId,
  labelName,
  labelHtmlFor
}: Props): JSX.Element => {
  return (
    <div data-testid={componentId}>
      <label htmlFor={labelHtmlFor}>{labelName}</label>
      <input
        value={counter}
        disabled={true}
        type="number"
        name={labelHtmlFor}
        id={labelHtmlFor}
      />
      <button
        type="button"
        onClick={handleSubtract}
        disabled={subtractDisable}
        data-testid="Counter Subtract Button"
      >
        -
      </button>
      <button
        type="button"
        onClick={handleAdd}
        disabled={addDisable}
        data-testid="Counter Add Button"
      >
        +
      </button>
    </div>
  );
};