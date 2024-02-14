import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add Your First County Be Clicking On It On the Map" />
    );

  const countires = cities.reduce(
    (arr, city) => {
      if (!arr.map((el) => el.countires).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
    },

    []
  );
  return (
    <ul className={styles.countryList}>
      {countires.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
