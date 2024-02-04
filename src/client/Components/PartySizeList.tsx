import { useState, useEffect } from "react";
import { PartySize } from "../Pages/ShopBookingPage/PartySize";
import { PartySizeAlias } from "./PartySizeAlias";
import { MenuItem as MenuItemType } from "../../types";
import { MenuItem } from "./MenuItem";

type Props = {
  partySize: PartySize;
};

export const PartySizeList = ({ partySize }: Props): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [adult, setAdult] = useState<number>(partySize.getMinPartySize());
  const [child, setChild] = useState<number>(0);
  const [baby, setBaby] = useState<number>(0);
  const [senior, setSenior] = useState<number>(0);
  const [totalPeople, setTotalPeople] = useState<number>(0);
  const [menuItemQuantities, setMenuItemQuantities] = useState<Record<number, number>>({})
  const [totalFoodItems, setTotalFoodItems] = useState<number>(0)
  const max = partySize.getMaxPartySize();
  const min = partySize.getMinPartySize();

  useEffect(() => {
    setTotalPeople(adult + child + baby + senior);
  }, [adult, child, baby, senior]);

  const handleAddMenuItem = (itemId: number, minOrderQty: number) => {
    setMenuItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 0) + 1, minOrderQty),
    }));
    setTotalFoodItems(totalFoodItems + 1)
  };

  const handleSubtractMenuItem = (itemId: number, minOrderQty) => {
    if(menuItemQuantities[itemId] === minOrderQty) {
      setMenuItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: 0,
      }));
    } else {
      setMenuItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0),
      }));
    }
    setTotalFoodItems(totalFoodItems - 1);
  };

  const submissionHandler = (e) => {
    e.preventDefault();
    try {
      if (totalPeople > max) {
        setErrorMessage(
          `This restaurant is limited to ${max} people per reservation.`
        );
        setShowError(true);
      } else if (totalPeople < min) {
        setErrorMessage(
          `This restaurant requires at least ${min} people to make a reservation.`
        );
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div data-testid="Party Size List">
      <form onSubmit={submissionHandler} action="">
        <PartySizeAlias
          counter={adult}
          handleAdd={(e) => setAdult(adult + 1)}
          handleSubtract={(e) => setAdult(adult - 1)}
          subtractDisable={adult <= min - senior}
          addDisable={totalPeople >= max}
          componentId="Party Size List Adults Counter"
          labelName="# of adults:"
          labelHtmlFor="adult"
        />
        {partySize.getShowChild() && (
          <PartySizeAlias
            counter={child}
            handleAdd={(e) => setChild(child + 1)}
            handleSubtract={(e) => setChild(child - 1)}
            subtractDisable={child <= 0}
            addDisable={totalPeople >= max}
            componentId="Party Size List Children Counter"
            labelName="# of children:"
            labelHtmlFor="children"
          />
        )}
        {partySize.getShowSenior() && (
          <PartySizeAlias
            counter={senior}
            handleAdd={(e) => setSenior(senior + 1)}
            handleSubtract={(e) => setSenior(senior - 1)}
            subtractDisable={
              senior <= partySize.getMinPartySize() - adult || senior <= 0
            }
            addDisable={totalPeople >= max}
            componentId="Party Size List Seniors Counter"
            labelName="# of seniors:"
            labelHtmlFor="senior"
          />
        )}
        {partySize.getShowBaby() && (
          <PartySizeAlias
            counter={baby}
            handleAdd={(e) => setBaby(baby + 1)}
            handleSubtract={(e) => setBaby(baby - 1)}
            subtractDisable={baby <= 0}
            addDisable={totalPeople >= max}
            componentId="Party Size List Babies Counter"
            labelName="# of babies:"
            labelHtmlFor="baby"
          />
        )}
        <br />
        <span>Min: {min}</span>
        <br />
        <span>Max: {max}</span>
        <br />
        {partySize.getMenu().length > 0 && <h2>Menu items</h2>}
        {partySize.getMenu().map((menuItem: MenuItemType, index) => {
          let minQty = menuItem.minOrderQty < 0 ? 0 : menuItem.minOrderQty;
          let maxQty = menuItem.maxOrderQty < 0 ? 10 : menuItem.maxOrderQty
          return (
            <MenuItem
              title={menuItem.title}
              key={menuItem.id}
              description={menuItem.description}
              isGroupOrder={menuItem.isGroupOrder}
              quantity={menuItemQuantities[menuItem.id] || 0}
              minQty={minQty}
              maxQty={maxQty}
              totalFoodItems={totalFoodItems}
              totalPeople={totalPeople}
              onAdd={() => handleAddMenuItem(menuItem.id, minQty)}
              onSubtract={() => handleSubtractMenuItem(menuItem.id, minQty)}
              testId={`${index}`}
            />
          );
        })}

        {showError && <p id="error">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
