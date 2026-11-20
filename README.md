# MOTRIX

Landing en React, TypeScript, Vite y Tailwind CSS, con una escena con deportivo conceptual y envase en React Three Fiber, Drei y GSAP.

## Ejecutar

Usa Node.js 20.19+, 22.12+ o una versión posterior compatible.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Vite genera el sitio estático en `dist/`. Usa un servidor HTTP para servirlo.

## Activos y contenido

| Activo | Dónde editar |
| --- | --- |
| Logo oficial | `public/brand/motrix.png` contiene el PNG original. Configura la ruta en `src/data/site.ts`. Si la nueva imagen tiene márgenes distintos, ajusta el encuadre en `globals.css` y el recorte sin deformación en `ProductModel.tsx`. |
| Catálogo PDF | Guarda el archivo en `public/catalog/` y escribe su ruta relativa, por ejemplo `catalog/motrix.pdf`, en `site.catalog`. El servidor debe entregar el tipo `application/pdf` en la respuesta HEAD. |
| Modelo 3D | Guarda el GLB en `public/models/` y configura `site.model` con una ruta como `models/motrix.glb`. Usa Y hacia arriba, cara frontal hacia +Z, origen centrado y una altura cercana a 2,8 unidades. El GLB reemplaza el envase de la escena. El deportivo se construye con geometría procedural en SportsCar.tsx del mismo directorio three. |
| Respaldo del hero | Reemplaza `public/images/envase-motrix.webp` cuando cambies de modelo. Usa una imagen con fondo transparente y encuadre equivalente. La imagen se muestra durante la carga, si WebGL falla y con movimiento reducido. |
| Fotografías y fichas | Guarda las fotos en `public/products/` y completa `photo`, `description`, `presentation` o `price` en `src/data/products.ts`. Cada ficha requiere un `id` único. |
| Datos comerciales | Completa `site.contact` en `src/data/site.ts`. Usa número internacional en `phone`, solo dígitos con código de país para `whatsapp`, URLs HTTPS para redes y mapa, y texto para `location`. |

La intro se reproduce una vez por sesión de pestaña. El lienzo se monta solo en pantalla y renderiza bajo demanda.


