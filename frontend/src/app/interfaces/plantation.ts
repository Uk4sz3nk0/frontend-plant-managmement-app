export interface Plantation {
    
        id: 1;
        name: string;
        nip: string;
        regon: 'string';
        city: string;
        street: string;
        houseNumber: number;
        flatNumber: 0;
        postCode: '11-111';
        area: {
          id: 0;
          name: 'string';
          polygonColor: 'string';
          coordinates: [
            {
              id: 0;
              latitude: 0;
              longitude: 0;
            }
          ];
          isMainArea: true
        };
        sectors: [
          {
            id: 0;
            name: 'string';
            polygonColor: 'string';
            coordinates: [
              {
                id: 0;
                latitude: 0;
                longitude: 0;
              }
            ];
            isMainArea: true
          }
        ];
        ownerId: 1;
        employeeIds: [
          0
        ]
      
}
