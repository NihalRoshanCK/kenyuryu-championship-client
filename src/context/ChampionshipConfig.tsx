import React, { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstanceNoToken } from '../axios/config';

export interface WeightCategoryConfig {
  label: string;
  max_weight: number | null;
  gender: string | null;
}

export interface AgeCategoryConfig {
  id: number;
  name: string;
  min_age: number;
  max_age: number | null;
  weight_categories: WeightCategoryConfig[];
}

export interface BeltTypeConfig {
  id: number;
  name: string;
  colours: { name: string; filter_group: string }[];
  age_categories: AgeCategoryConfig[];
}

export interface PriceConfig {
  events: 'kata' | 'kumite' | 'both';
  price: number;
  belt_type: number | null;
  age_category: number | null;
}

export interface ChampionshipConfig {
  version: string;
  genders: { code: string; label: string }[];
  belt_types: BeltTypeConfig[];
  prices: PriceConfig[];
}

const STORAGE_KEY = 'championshipConfig';

const emptyConfig: ChampionshipConfig = { version: '', genders: [], belt_types: [], prices: [] };

const readCache = (): ChampionshipConfig => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : emptyConfig;
  } catch (error) {
    return emptyConfig;
  }
};

const ChampionshipConfigContext = createContext<ChampionshipConfig>(emptyConfig);

export const ChampionshipConfigProvider = ({ children }: { children: React.ReactNode }) => {
  // Render straight away from the cached copy, then refresh it in the background
  const [config, setConfig] = useState<ChampionshipConfig>(readCache);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data }: any = await axiosInstanceNoToken.get('/api/championship-config/');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setConfig((current) => (current.version === data.version ? current : data));
      } catch (error) {
        console.error('Error fetching championship config:', error);
      }
    };
    fetchConfig();
  }, []);

  return (
    <ChampionshipConfigContext.Provider value={config}>
      {children}
    </ChampionshipConfigContext.Provider>
  );
};

export const useChampionshipConfig = () => useContext(ChampionshipConfigContext);

const unique = (values: string[]) => Array.from(new Set(values));

export const findBeltType = (config: ChampionshipConfig, beltType?: string) =>
  config.belt_types.find((belt) => belt.name === beltType);

export const colourOptions = (config: ChampionshipConfig, beltType?: string) =>
  findBeltType(config, beltType)?.colours.map((colour) => colour.name) || [];

// Belt types with a single colour (e.g. Black Belt) don't ask for one
export const needsColour = (config: ChampionshipConfig, beltType?: string) =>
  colourOptions(config, beltType).length > 1;

export const colourGroups = (config: ChampionshipConfig, beltType?: string) => {
  const groups = new Map<string, string[]>();
  findBeltType(config, beltType)?.colours.forEach((colour) => {
    groups.set(colour.filter_group, [...(groups.get(colour.filter_group) || []), colour.name]);
  });
  return Array.from(groups, ([label, names]) => ({ label, value: names.join(',') }));
};

const beltsFor = (config: ChampionshipConfig, beltType?: string) =>
  beltType ? config.belt_types.filter((belt) => belt.name === beltType) : config.belt_types;

export const ageCategoryNames = (config: ChampionshipConfig, beltType?: string) =>
  unique(beltsFor(config, beltType).flatMap((belt) => belt.age_categories.map((age) => age.name)));

export const weightCategoryLabels = (
  config: ChampionshipConfig,
  beltType?: string,
  ageCategory?: string,
  gender?: string,
) =>
  unique(
    beltsFor(config, beltType)
      .flatMap((belt) => belt.age_categories)
      .filter((age) => age.name === ageCategory)
      .flatMap((age) => {
        if (!gender) return age.weight_categories;
        // Gender specific classes win over the shared ones, as on the backend
        const own = age.weight_categories.filter((weight) => weight.gender === gender);
        return own.length ? own : age.weight_categories.filter((weight) => weight.gender === null);
      })
      .map((weight) => weight.label),
  );

export const eventsKey = (kata: boolean, kumite: boolean) =>
  kata && kumite ? 'both' : kata ? 'kata' : kumite ? 'kumite' : null;

export const basePrice = (config: ChampionshipConfig, events: string) =>
  config.prices.find((price) => price.events === events && !price.belt_type && !price.age_category)?.price;

// Mirrors the backend fee lookup so the forms can show the fee before saving
export const estimateFee = (
  config: ChampionshipConfig,
  beltType: string | undefined,
  age: number,
  kata: boolean,
  kumite: boolean,
) => {
  const events = eventsKey(kata, kumite);
  const belt = findBeltType(config, beltType);
  if (!events || !belt || Number.isNaN(age)) return null;
  const ageCategory = belt.age_categories.find(
    (category) => category.min_age <= age && (category.max_age === null || age <= category.max_age),
  );
  if (!ageCategory) return null;
  let best: PriceConfig | undefined;
  let bestScore = -1;
  config.prices.forEach((price) => {
    if (price.events !== events) return;
    if (price.belt_type !== null && price.belt_type !== belt.id) return;
    if (price.age_category !== null && price.age_category !== ageCategory.id) return;
    const score = (price.age_category ? 2 : 0) + (price.belt_type ? 1 : 0);
    if (score > bestScore) {
      best = price;
      bestScore = score;
    }
  });
  return best ? best.price : null;
};

export const apiErrorMessage = (error: any) => {
  const data = error?.response?.data;
  if (!data || typeof data !== 'object') return 'Something went wrong, please try again.';
  const first = Object.values(data)[0];
  return Array.isArray(first) ? String(first[0]) : String(first);
};
