export type ActionForm = 'crear' | 'editar';

// Tipado para añadir campos repeteables en las minutas
export type repeatableFields = 'discursantes' | 'sostenimientos' | 'relevos';

export interface formControlRepeatable {
  _id: string;
  __v: number;
  id: string;
  nombre: string;
  tema?: string;
  llamamiento?: string;
}

export interface ControlName {
  form: formControlRepeatable;
  type: repeatableFields;
}

// Response petition HTTP
export interface Minuta {
  _id: string;
  published_at: Date;
  anuncios: string;
  ultima_oracion: string;
  ultimo_himno: string;
  himno_sacramental: string;
  primera_oracion: string;
  primer_himno: string;
  preludio_musical: string;
  fecha: Date;
  dirige: string;
  preside: string;
  reconocimientos: string;
  discursantes: formControlRepeatable[];
  relevos: formControlRepeatable[];
  sostenimientos: formControlRepeatable[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  barrio: Barrio;
  tipos_de_minuta: tipoMinutas;
  id: string;
  completa: boolean;
}

export interface Barrio {
  _id: string;
  nombre?: string;
  ubicacion?: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  minuta?: string;
}
export interface tipoMinutas {
  _id: string;
  nombre?: string;
  ubicacion?: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  minuta?: string;
}
