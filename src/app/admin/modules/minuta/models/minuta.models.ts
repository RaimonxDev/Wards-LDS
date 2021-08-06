export type ActionForm = 'crear' | 'editar';

// Tipado para añadir campos repeteables en las minutas
export type repeatableFields = 'discursantes' | 'sostenimientos' | 'relevos';

export interface formControlRepeatable {
  nombre: string;
  detalles: string;
  id?: string;
}

export interface dataEmitRepetableForm {
  form: formControlRepeatable;
  type: repeatableFields;
}

// Response petition HTTP
export interface Minuta {
  id: string;
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
  created_at?: Date;
  published_at?: Date;
  updated_at?: Date;
  creada_por?: string;
  hora?: string;
}

export interface Barrio {
  id?: string;
  nombre?: string;
  minuta?: string;
  ubicacion?: string;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

// Para evitar problemas con InitialData se colocan todos los campos como opcionales
export interface tipoMinutas {
  id?: string;
  type?: string;
  ubicacion?: string;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  minutas?: Minuta[];
}
