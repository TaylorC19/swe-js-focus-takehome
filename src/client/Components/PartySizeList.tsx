import { useState, useEffect } from "react";
import { PartySize } from "../Pages/ShopBookingPage/PartySize";
import { PartySizeAlias } from "./PartySizeAlias";

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
  const max = partySize.getMaxPartySize();
  const min = partySize.getMinPartySize();

  useEffect(() => {
    setTotalPeople(adult + child + baby + senior);
  }, [adult, child, baby, senior]);

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
            subtractDisable={senior <= partySize.getMinPartySize() - adult || senior <= 0}
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
        <span>Min: {partySize.getMinPartySize()}</span>
        <br />
        <span>Max: {partySize.getMaxPartySize()}</span>
        <br />
        {showError && <p id="error">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
