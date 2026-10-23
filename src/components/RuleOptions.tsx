import { colourOptions, useChampionshipConfig } from '../context/ChampionshipConfig';

// <option> lists for the select boxes, built from the championship config

export const GenderOptions = () => {
  const { genders } = useChampionshipConfig();
  return (
    <>
      {genders.map((gender) => (
        <option key={gender.code} value={gender.code}>
          {gender.label}
        </option>
      ))}
    </>
  );
};

export const BeltTypeOptions = () => {
  const { belt_types } = useChampionshipConfig();
  return (
    <>
      {belt_types.map((belt) => (
        <option key={belt.id} value={belt.name}>
          {belt.name}
        </option>
      ))}
    </>
  );
};

export const ColourOptions = ({ beltType }: { beltType?: string }) => {
  const config = useChampionshipConfig();
  return (
    <>
      {colourOptions(config, beltType).map((colour) => (
        <option key={colour} value={colour}>
          {colour}
        </option>
      ))}
    </>
  );
};
