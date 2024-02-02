import { useState } from "react";
import { PartySize } from "../Pages/ShopBookingPage/PartySize";

type Props = {
  partySize: PartySize;
};

export const PartySizeList = ({ partySize }: Props): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [adult, setAdult] = useState<number>(0);
  const [child, setChild] = useState<number>(0);
  const [baby, setBaby] = useState<number>(0);
  const [senior, setSenior] = useState<number>(0);
  console.log(partySize);

  const submissionHandler = (e) => {
    e.preventDefault();
    let people = adult + child + baby + senior;
    try {
      const max = partySize.getShop().maxNumPeople;
      const min = partySize.getShop().minNumPeople;
      if (people > max) {
        setErrorMessage(`This restaurant is limited to ${max} people per reservation.`);
        setShowError(true);
      } else if (people < min) {
        setErrorMessage(`This restaurant requires at least ${min} people to make a reservation.`);
        setShowError(true);
      }
    } catch (error) {
      console.error(error)
    }
    console.log('handler')
  }

  const adultHandler = (e) => {
    setAdult(Number(e.target.value));
  }
  
  const childHandler = (e) => {
    setChild(Number(e.target.value));
  }
  
  const babyHandler = (e) => {
    setBaby(Number(e.target.value));
  }
  
  const seniorHandler = (e) => {
    setSenior(Number(e.target.value));
  }
  
  return (
    <div data-testid="Party Size List">
      <form onSubmit={submissionHandler} action="">
        <>
          <label htmlFor="adult"># of adults:</label>
          <input
            value={adult}
            type="number"
            name="adult"
            data-testid="Party Size List Adults Counter"
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
            data-testid="Counter Add Button"
          >
            +
          </button>
        </>
        {partySize.getShop().showChild && (
          <>
            <br />
            <label htmlFor="children"># of children:</label>
            <input
              value={child}
              type="number"
              name="children"
              data-testid="Party Size List Children Counter"
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
              data-testid="Counter Add Button"
            >
              +
            </button>
          </>
        )}
        {partySize.getShop().showSenior && (
          <>
            <br />
            <label htmlFor="seniors"># of seniors:</label>
            <input
              value={senior}
              type="number"
              name="seniors"
              data-testid="Party Size List Seniors Counter"
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
              data-testid="Counter Add Button"
            >
              +
            </button>
          </>
        )}
        {partySize.getShop().showBaby && (
          <>
            <br />
            <label htmlFor="babies"># of babies:</label>
            <input
              value={baby}
              type="number"
              name="babies"
              data-testid="Party Size List Babies Counter"
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
              data-testid="Counter Add Button"
            >
              +
            </button>
          </>
        )}
        <br />
        {showError && <p id="error">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
