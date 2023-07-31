import { countryCodes } from '../data/countryCodes';

export function useCountries() {
  return {
    countries: countryCodes,
  };
}
