# 🌱 AndesChain MVP - Sistema Completo Actualizado

## 📁 Estructura del Proyecto

```
andeschain-web/mvp/
├── index.html                          # Página principal
├── pages/
│   ├── historia.html                  # Historia de Quillagua → AndesChain
│   ├── soluciones.html                # Para productores, entidades públicas
│   ├── casos.html                     # Casos de uso (papas, almendras, sidra)
│   ├── contacto.html                  # Formulario de contacto
│   ├── productor-app.html             # ⭐ App con extracción EXIF completa
│   └── demo.html                      # Dashboard de trazabilidad live
│
├── assets/
│   ├── logo.png                       # Tu logo actual
│   ├── favicon.png                    # Tu favicon actual
│   ├── images/                        # Fotos de campo, cosechas
│   ├── css/
│   │   ├── main.css                   # Estilos generales
│   │   └── productor.css              # Estilos app productor
│   └── js/
│       ├── config.js                  # ⚙️ Configuración (contrato: 0x34fe...)
│       ├── exif-extractor.js          # 📸 Extracción EXIF completa
│       └── blockchain.js              # Interacción con Polygon
│
├── scripts/                           # Scripts de Remix
│   └── (archivos de deployment)
│
└── contracts/
    └── AndesChainTraceability.sol
```

---

## ✨ NUEVAS FUNCIONALIDADES

### 1. Extracción Completa de EXIF 📸

La app de productor ahora extrae **automáticamente** de cada foto:

- **📍 GPS**: Latitud, Longitud, Altitud, Precisión
- **📅 Fecha/Hora**: Timestamp original de captura
- **📱 Dispositivo**: Marca, Modelo, Lente
- **🌡️ Condiciones**: ISO, Exposición, Flash, Balance de blancos
- **🌤️ Ambiente**: Temperatura, Humedad, Presión (si el dispositivo tiene sensores)
- **🔒 Hash SHA-256**: Verificación de integridad de la imagen

**Todo esto se registra automáticamente en el blockchain.**

### 2. Estructura Multi-Página

Ya no es una one-page. Ahora tienes:
- **Home** → Hero + Features + Trust + CTA
- **Historia** → Tu trayectoria IBM → Quillagua → AndesChain
- **Soluciones** → Tabs: Productores / Entidades Públicas / Consumidores
- **Casos** → Papas Astrid, Almendras, Sidra
- **Contacto** → Formulario + Datos
- **App Productor** → Con EXIF completo
- **Demo** → Dashboard con datos reales del blockchain

### 3. Integración con Tu Contrato Actual

El sistema ya está conectado a:
```
Contrato: 0x34fe41bd7a2a34597bd098f29e2256b86ca60611
Red: Polygon Mainnet
Explorer: https://polygonscan.com/address/0x34fe...
```

### 4. Colores del Branding

Basados en tu sitio actual andeschain.io:
- Primary: `#2D5F3F` (Verde oscuro)
- Secondary: `#4A7C59` (Verde medio)
- Accent: `#7BA682` (Verde claro)
- Background: `#F5F5F3` (Gris claro)

---

## 🚀 Deployment

### Estructura en GitHub:

```
tu-repo/
└── andeschain-web/
    └── mvp/                    ← Subir esta carpeta
        ├── index.html
        ├── pages/
        ├── assets/
        etc...
```

### En Cloudflare Pages:

1. **Build settings:**
   - Build command: (vacío)
   - Build output directory: `/andeschain-web/mvp`
   - Root directory: (vacío)

2. **Deploy!**

Tu sitio estará en: `https://tu-proyecto.pages.dev`

3. **Custom Domain:**
   - Configurar andeschain.io apuntando a Cloudflare Pages

---

## 📸 Cómo Funciona la Extracción EXIF

### Cuando el productor toma una foto:

1. **Upload de imagen**
2. **Extracción automática** de todos los datos EXIF usando `exif-js`
3. **Procesamiento** de coordenadas DMS → Decimal
4. **Hash SHA-256** de la imagen para verificación
5. **Display en UI** de datos extraídos
6. **Registro en blockchain** con toda la metadata

### Ejemplo de metadata registrada:

```json
{
  "quantity": "150",
  "quality": "Premium",
  "notes": "Cosecha matinal, condiciones óptimas",
  "timestamp": "2026-02-10T10:30:00Z",
  "exif": {
    "gps": {
      "latitude": -33.8203,
      "longitude": -70.7898,
      "altitude": 450,
      "precision": 5
    },
    "datetime": {
      "original": "2026-02-10T10:15:23Z"
    },
    "device": {
      "make": "Apple",
      "model": "iPhone 15 Pro"
    },
    "capture": {
      "iso": 100,
      "exposureTime": "1/250",
      "fNumber": 1.8
    },
    "environment": {
      "temperature": 22,
      "humidity": 65
    }
  },
  "imageHash": "a3f5c8d2e1b4..."
}
```

---

## 🔧 Configuración

### 1. Actualizar Assets

Copia tus archivos actuales:

```bash
cp /ruta/a/tu/logo.png andeschain-web/mvp/assets/
cp /ruta/a/tu/favicon.png andeschain-web/mvp/assets/
cp /ruta/a/tus/fotos/* andeschain-web/mvp/assets/images/
```

### 2. Verificar Config.js

Ya está configurado con tu contrato:
```javascript
// andeschain-web/mvp/assets/js/config.js
contractAddress: '0x34fe41bd7a2a34597bd098f29e2256b86ca60611'
```

Si re-deployaste el contrato, actualiza esta línea.

---

## 📱 Uso de la App Productor

### Flujo completo:

1. **Abrir app**: `https://andeschain.io/pages/productor-app.html`
2. **Conectar MetaMask** (automático al enviar)
3. **Llenar formulario:**
   - Product ID: `ALM-2602`
   - Tipo: Cosecha
   - **Tomar foto** (la app extrae EXIF automáticamente)
   - Cantidad: 150 kg
   - Calidad: Premium
   - Notas: Opcional
4. **Click "Registrar en Blockchain"**
5. **Confirmar en MetaMask** (~$0.001)
6. **Ver TX en PolygonScan**

### Datos que se registran:

- Todo lo que el productor ingresa manualmente
- **+** GPS de la foto
- **+** Fecha/hora de captura
- **+** Dispositivo usado
- **+** Condiciones ambientales (si disponible)
- **+** Hash de verificación de la imagen

---

## 🎯 Para tu Presentación

### Demo en Vivo (12 min):

1. **Home** (2 min)
   - Mostrar hero con estadísticas en vivo desde blockchain
   - Features: inmutable, accesible, verificable

2. **App Productor** (5 min) ⭐ HIGHLIGHT
   - Abrir app en celular
   - Tomar foto de un producto
   - Mostrar cómo se extraen GPS, fecha, dispositivo automáticamente
   - Enviar a blockchain EN VIVO
   - Esperar confirmación (5-10 seg)
   - Abrir TX en PolygonScan

3. **Dashboard** (3 min)
   - Ver el evento recién registrado
   - Mostrar timeline completo de PA-2602
   - Click en "Ver Contrato" → PolygonScan

4. **Propuesta Pilotos** (2 min)
   - Paine: 20 productores
   - Providencia: 5 feriantes
   - Costos, timeline, métricas

---

## 🔒 Seguridad y Privacidad

### Datos que SÍ se registran en blockchain:
- GPS de la ubicación
- Timestamp
- Cantidad, calidad, notas
- Hash de la imagen

### Datos que NO se registran:
- La imagen completa (solo el hash)
- Datos personales del productor (solo address wallet)

### Para almacenar imágenes completas:
- Usa IPFS (próxima fase)
- Hash en blockchain + imagen en IPFS = verificación completa

---

## 🆘 Troubleshooting

### "No se pueden extraer datos EXIF"
- Algunas fotos no tienen EXIF (screenshots, imágenes editadas)
- La app hace fallback a GPS del navegador automáticamente

### "Temperature/Humidity null"
- Pocos dispositivos incluyen estos sensores
- Es normal que sean `null`
- GPS y timestamp SIEMPRE funcionan

### "Error al registrar evento"
- Verifica que MetaMask esté en Polygon Mainnet
- Verifica que tengas MATIC (~0.01)
- Verifica que el contractAddress en config.js sea correcto

---

## 📊 Métricas para Alcaldes

Dashboard mostrará:
- Productores registrados en la comuna
- Eventos certificados este mes
- Toneladas con trazabilidad
- Mapa de producción local
- Impacto en huella de carbono

---

## 🎨 Personalización

### Cambiar colores:

```css
/* andeschain-web/mvp/assets/css/main.css */
:root {
    --color-primary: #TU_COLOR;
    --color-secondary: #TU_COLOR;
}
```

### Agregar más tipos de eventos:

```javascript
// En productor-app.html, agregar botón:
<button type="button" class="event-type-btn" data-type="Poda">
    <span class="icon">✂️</span>
    <span>Poda</span>
</button>
```

---

## 📚 Librerías Usadas

- **Web3.js** (1.8.0): Interacción con blockchain
- **exif-js**: Extracción de metadata de imágenes
- **Inter** + **Merriweather**: Tipografías

---

## ✅ Checklist Pre-Launch

- [ ] Assets copiados (logo, favicon, fotos)
- [ ] Config.js con dirección correcta del contrato
- [ ] Probado en mobile y desktop
- [ ] MetaMask con MATIC para demo
- [ ] Eventos de prueba cargados en blockchain
- [ ] Links a PolygonScan funcionando
- [ ] Formulario de contacto configurado

---

¡Éxito en tu presentación Jorge! 🚀🌱

La extracción automática de EXIF es un **diferenciador clave** que ninguna otra plataforma de trazabilidad tiene.
