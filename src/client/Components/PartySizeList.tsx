import { useState, useEffect } from "react";
import { PartySize } from "../Pages/ShopBookingPage/PartySize";

type Props = {
  partySize: PartySize;
};

export const PartySizeList = ({ partySize }: Props): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [adult, setAdult] = useState<number>(0);
  const [child, setChild] = useState<number>(0);
  const [baby, setBaby] = useState<number>(0);
  const [senior, setSenior] = useState<number>(0);
  const [totalPeople, setTotalPeople] = useState<number>(0);

  useEffect(() => {
    setTotalPeople(adult + child + baby + senior);
  }, [adult, child, baby, senior]);

  const submissionHandler = (e) => {
    e.preventDefault();
    try {
      const max = partySize.getShop().maxNumPeople;
      const min = partySize.getShop().minNumPeople;
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

  const adultHandler = (e) => {
    setAdult(Number(e.target.value));
  };

  const childHandler = (e) => {
    setChild(Number(e.target.value));
  };

  const babyHandler = (e) => {
    setBaby(Number(e.target.value));
  };

  const seniorHandler = (e) => {
    setSenior(Number(e.target.value));
  };

  return (
    <div data-testid="Party Size List">
      <form onSubmit={submissionHandler} action="">
        <div data-testid="Party Size List Adults Counter">
          <label htmlFor="adult"># of adults:</label>
          <input
            value={adult}
            disabled={true}
            type="number"
            name="adult"
            id="adult"
            onChange={adultHandler}
          />
          <button
            type="button"
            onClick={(e) => setAdult(adult - 1)}
            disabled={adult <= 0}
            data-testid="Counter Subtract Button"
          >
            -
          </button>
          <button
            type="button"
            onClick={(e) => setAdult(adult + 1)}
            disabled={totalPeople >= partySize.getShop().maxNumPeople}
            data-testid="Counter Add Button"
          >
            +
          </button>
        </div>
        {partySize.getShop().showChild && (
          <div data-testid="Party Size List Children Counter">
            <label htmlFor="children"># of children:</label>
            <input
              value={child}
              disabled={true}
              type="number"
              name="child"
              id="child"
              onChange={childHandler}
            />
            <button
              type="button"
              onClick={(e) => setChild(child - 1)}
              disabled={child <= 0}
              data-testid="Counter Subtract Button"
            >
              -
            </button>
            <button
              type="button"
              onClick={(e) => setChild(child + 1)}
              disabled={totalPeople >= partySize.getShop().maxNumPeople}
              data-testid="Counter Add Button"
            >
              +
            </button>
          </div>
        )}
        {partySize.getShop().showSenior && (
          <div data-testid="Party Size List Seniors Counter">
            <label htmlFor="seniors"># of seniors:</label>
            <input
              value={senior}
              disabled={true}
              type="number"
              name="senior"
              id="senior"
              onChange={seniorHandler}
            />
            <button
              type="button"
              onClick={(e) => setSenior(senior - 1)}
              disabled={senior <= 0}
              data-testid="Counter Subtract Button"
            >
              -
            </button>
            <button
              type="button"
              onClick={(e) => setSenior(senior + 1)}
              disabled={totalPeople >= partySize.getShop().maxNumPeople}
              data-testid="Counter Add Button"
            >
              +
            </button>
          </div>
        )}
        {partySize.getShop().showBaby && (
          <div data-testid="Party Size List Babies Counter">
            <label htmlFor="babies"># of babies:</label>
            <input
              value={baby}
              disabled={true}
              type="number"
              name="baby"
              id="baby"
              onChange={babyHandler}
            />
            <button
              type="button"
              onClick={(e) => setBaby(baby - 1)}
              disabled={baby <= 0}
              data-testid="Counter Subtract Button"
            >
              -
            </button>
            <button
              type="button"
              onClick={(e) => setBaby(baby + 1)}
              disabled={totalPeople >= partySize.getShop().maxNumPeople}
              data-testid="Counter Add Button"
            >
              +
            </button>
          </div>
        )}
        <br />
        {showError && <p id="error">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
