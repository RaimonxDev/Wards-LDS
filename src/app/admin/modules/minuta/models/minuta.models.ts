export type ActionForm = 'crear' | 'editar';

// Tipado para añadir campos repeteables en las minutas
export type repeatableFields = 'discursantes' | 'sostenimientos' | 'relevos';

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
  discursantes: Discursante[];
  relevos: Discursante[];
  sostenimientos: Discursante[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  barrio: Barrio;
  tipos_de_minuta: tipoMinutas;
  id: string;
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

export interface Discursante {
  _id: string;
  nombre: string;
  tema?: string;
  __v: number;
  id: string;
  llamamiento?: string;
}
