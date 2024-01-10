export interface Plantation {

  id: number | null;
  name: string;
  nip: string;
  regon: 'string';
  city: string;
  street: string;
  houseNumber: number;
  flatNumber: 0;
  postCode: '11-111';
  area: {
    id: null;
    name: 'string';
    polygonColor: 'string';
    coordinates: [
      {
        id: number | null;
        latitude: 0;
        longitude: 0;
      }
    ];
    isMainArea: true
  };
  sectors: [
    {
      id: number | null;
      name: 'string';
      polygonColor: 'string';
      coordinates: [
        {
          id: number | null;
          latitude: 0;
          longitude: 0;
        }
      ];
      isMainArea: true
    }
  ];
  ownerId: number | null;
  employeeIds: [
    0
  ]

}
