export interface Product {
  id: string
  name: string
  category: string
  photo: string
  description: string
  presentation: string
  price: string
}

const pending = { photo: '', description: '', presentation: '', price: '' }

export const products: Product[] = [
  { ...pending, id: 'champu', name: 'Champú normal para vehículos', category: 'Lavado' },
  { ...pending, id: 'cera', name: 'Champú con cera', category: 'Lavado' },
  { ...pending, id: 'desengrasante', name: 'Desengrasante', category: 'Limpieza' },
  { ...pending, id: 'aspirapara', name: 'Aspirapara interiores o partes negras', category: 'Interiores' },
  { ...pending, id: 'llantas', name: 'Abrillantador de llantas', category: 'Llantas' },
]
