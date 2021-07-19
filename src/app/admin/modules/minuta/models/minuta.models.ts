export type ActionForm = 'crear' | 'editar';

// Tipado para añadir campos repeteables en las minutas
export type repeatableFields = 'discursantes' | 'sostenimientos' | 'relevos';

export interface formControlRepeatable {
  _id: string;
  __v: number;
  id: string;
  nombre: string;
  details: string;
}

export interface ControlName {
  form: formControlRepeatable;
  type: repeatableFields;
}

// Response petition HTTP
export interface Minuta {
  id?: string;
  _id?: string;
  barrio: Barrio;
  preludio_musical: string;
  tipos_de_minuta: tipoMinutas;
  primera_oracion: string;
  primer_himno: string;
  anuncios: string;
  himno_sacramental: string;
  fecha: Date;
  dirige: string;
  preside: string;
  reconocimientos: string;
  discursantes: formControlRepeatable[];
  relevos: formControlRepeatable[];
  sostenimientos: formControlRepeatable[];
  ultima_oracion: string;
  ultimo_himno: string;
  completa: boolean;
  createdAt?: Date;
  published_at?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface Barrio {
  _id?: string;
  id?: string;
  nombre?: string;
  minuta?: string;
  ubicacion?: string;
  published_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

// Para evitar problemas con InitialData se colocan todos los campos como opcionales
export interface tipoMinutas {
  _id?: string;
  nombre?: string;
  ubicacion?: string;
  published_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  id?: string;
  minuta?: string;
}
