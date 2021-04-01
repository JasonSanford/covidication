export interface County {
  name: string;
  fips: number;
  cases?: number;
  deaths?: number;
}

const counties: County[] = [
  {
    name: 'Iredell',
    fips: 37097
  },
  {
    name: 'Mecklenburg',
    fips: 37119
  },
  {
    name: 'Duplin',
    fips: 37061
  },
  {
    name: 'Gaston',
    fips: 37071
  },
  {
    name: 'Rowan',
    fips: 37159
  },
  {
    name: 'Horry',
    fips: 45051
  }
];

export default counties;
