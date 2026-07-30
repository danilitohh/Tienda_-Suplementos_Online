# FuelLab Colombia

Tienda online de suplementos creada en React + JavaScript, sin backend, con:

- catálogo filtrable
- carrito persistente
- cupón de descuento
- quick view de producto
- checkout interactivo
- diseño responsive

## Ejecutar

Usa el Node incluido en Adobe Creative Cloud Experience:

```powershell
& 'C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe' server.cjs
```

Abre luego `http://127.0.0.1:4173`.

## Notas

- El sitio usa React cargado desde CDN para mantener el proyecto simple y portable.
- El checkout es funcional a nivel de interfaz y flujo. Todavía no hay backend ni pasarela de pago real.
