export const ErrorMessages = {
  required: 'El campo es requerido',
  pattern: {
    email: 'Introduzca un email válido',
    cellphone: 'Introduzca un número telefónico válido',
    characters: 'Introduzca sólo letras',
    alphanumeric: 'Introduzca sólo letras y números',
    numeric: 'Introduzca sólo números',
  },
};

export const genders = [
  { id: 5, name: 'Masculino' },
  { id: 6, name: 'Femenino' },
];

export const documentsType = [
  { id: 7, name: 'V-' },
  { id: 8, name: 'E-' },
  { id: 37, name: 'J-' },
  { id: 38, name: 'G-' },
  { id: 39, name: 'P-' },
];

export const civilStatus = [
  { id: 9, name: 'Casado' },
  { id: 10, name: 'Soltero' },
  { id: 11, name: 'Viudo' },
  { id: 12, name: 'Divorciado' },
];

export const states = [
  { id: 13, name: 'Amazonas' },
  { id: 14, name: 'Anzoátegui' },
  { id: 15, name: 'Apure' },
  { id: 16, name: 'Aragua' },
  { id: 17, name: 'Barinas' },
  { id: 18, name: 'Bolívar' },
  { id: 19, name: 'Carabobo' },
  { id: 20, name: 'Cojedes' },
  { id: 21, name: 'Delta Amacuro' },
  { id: 22, name: 'Distrito Capital' },
  { id: 23, name: 'Falcón' },
  { id: 24, name: 'Guárico' },
  { id: 25, name: 'Lara' },
  { id: 26, name: 'Mérida' },
  { id: 27, name: 'Miranda' },
  { id: 28, name: 'Monagas' },
  { id: 29, name: 'Nueva Esparta' },
  { id: 30, name: 'Portuguesa' },
  { id: 31, name: 'Sucre' },
  { id: 32, name: 'Táchira' },
  { id: 33, name: 'Trujillo' },
  { id: 34, name: 'Vargas' },
  { id: 35, name: 'Yaracuy' },
  { id: 36, name: 'Zulia' },
];

export const brands = [
  { id: 1, name: 'Alfa Romeo' },
  { id: 2, name: 'Aprilia' },
  { id: 3, name: 'Audi' },
  { id: 4, name: 'BMW' },
  { id: 5, name: 'Cogiva' },
  { id: 6, name: 'Citroen' },
  { id: 7, name: 'Dacia' },
  { id: 8, name: 'Derbi' },
  { id: 9, name: 'Ducati' },
  { id: 10, name: 'Fiat' },
  { id: 11, name: 'Ford' },
  { id: 12, name: 'Gilera' },
  { id: 13, name: 'Honda' },
  { id: 14, name: 'Hyundai' },
  { id: 15, name: 'Kawasaki' },
  { id: 16, name: 'Kia' },
  { id: 17, name: 'Kymco' },
  { id: 18, name: 'Lancia' },
  { id: 19, name: 'Land Rover' },
  { id: 20, name: 'Lexus' },
  { id: 21, name: 'Mazda' },
  { id: 22, name: 'Mercedes' },
  { id: 23, name: 'Mini' },
  { id: 24, name: 'Mitsubishi' },
  { id: 25, name: 'Nissan' },
  { id: 26, name: 'Opel' },
  { id: 27, name: 'Peugeot' },
  { id: 28, name: 'Piaggio' },
  { id: 29, name: 'Renault' },
  { id: 30, name: 'Rieju' },
  { id: 31, name: 'Seat' },
  { id: 32, name: 'Skoda' },
  { id: 33, name: 'Smart' },
  { id: 34, name: 'SsangYong' },
  { id: 35, name: 'Subaru' },
  { id: 36, name: 'Suzuki' },
  { id: 37, name: 'Toyota' },
  { id: 38, name: 'Vespa' },
  { id: 39, name: 'Volkswagen' },
  { id: 40, name: 'Volvo' },
  { id: 41, name: 'Yamaha' },
];

export const policiesType = [
  { id: 1, name: 'Responsabilidad Civil Vial (RCV)' },
  { id: 2, name: 'Perdida Total' },
  { id: 3, name: 'Cobertura Amplia' },
];


export const policiesType2 = [
  { id: 'Responsabilidad Civil Vial (RCV)', name: 'Responsabilidad Civil Vial (RCV)' },
  { id: 'Perdida Total' , name: 'Perdida Total' },
  { id: 'Cobertura Amplia' , name: 'Cobertura Amplia' },
];

export const approval = [
  { id: 1, name: 'Por Revisar' },
  { id: 2, name: 'Aprobado' },
  { id: 3, name: 'Rechazado' },
];

export const vehicleType = [
  { id: "coupe", name: 'COUPE' },
  { id: 'sedan', name: 'SEDAN' },
  { id: 'rustico', name: 'RUSTICO' },
  { id: 'pickup' , name: 'PICK UP' },
  { id: 'carga', name: 'CARGA' },
  { id: 'otros' , name: 'OTROS' },

];

export const coverageFormType = [
  { id: 1, name: 'Suma Asegurada Fija' },
  { id: 2, name: 'Tasa Fija' },
];





export const responsabilidad_civil_vial= [
{id:'DAÑOS A COSAS',name:'DAÑOS A COSAS'},
{id:'DAÑOS A PERSONAS',name:'DAÑOS A PERSONAS'},
{id:'EXCESO DE LIMITE',name:'EXCESO DE LIMITE'},
{id:'DEFENSA PENAL',name:'DEFENSA PENAL'},
{id:'MUERTE ACCIDENTAL CONDUCTOR Y/O PASAJEROS',name:'MUERTE ACCIDENTAL CONDUCTOR Y/O PASAJEROS'},
{id:'INVALIDEZ PERMANENTE CONDUCTOR Y/O PASAJEROS',name:'INVALIDEZ PERMANENTE CONDUCTOR Y/O PASAJEROS'},
{id:'GASTOS MÉDICOS CONDUCTOR Y/O PASAJEROS',name:'GASTOS MÉDICOS CONDUCTOR Y/O PASAJEROS'},
{id:'GASTOS FUNERARIOS CONDUCTOR Y/O PASAJEROS',name:'GASTOS FUNERARIOS CONDUCTOR Y/O PASAJEROS'},
]

export const perdida_total= [
  {id:'COBERTURA CATASTROFICA',name:'COBERTURA CATASTROFICA'},
  {id:'PÉRDIDA TOTAL',name:'PÉRDIDA TOTAL'},
  {id:'INDEMNIZACION DIARIA POR ROBO',name:'INDEMNIZACION DIARIA POR ROBO'},
]

export const cobertura_amplia= [
  {id:'COBERTURA AMPLIA/MOTÍN',name:'COBERTURA AMPLIA/MOTÍN'},
  {id:'INDEMNIZACION DIARIA POR ROBO',name:'INDEMNIZACION DIARIA POR ROBO'},
  {id:'COBERTURA CATASTROFICA',name:'COBERTURA CATASTROFICA'},
]

export const ramoPerdidaTotal = [
  { id: 2 , name: 'Perdida Total' },
  { id: 1 , name: 'Responsabilidad Civil Vial (RCV)' },
];

export const RamoCoberturaAmplia = [
  
  { id: 1, name: 'Responsabilidad Civil Vial (RCV)' },
  { id: 2 , name: 'Perdida Total' },
  {id: 3 , name: 'Cobertura Amplia' },
];

export const RamoRCV = [
  { id: 1, name: 'Responsabilidad Civil Vial (RCV)' },
];