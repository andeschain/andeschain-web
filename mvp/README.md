# AndesChain - Sistema de Trazabilidad Blockchain

## 🌱 Descripción General

Sistema completo de trazabilidad de alimentos usando blockchain Polygon, diseñado para productores latinoamericanos y entidades públicas.

## 📁 Estructura del Proyecto

```
andeschain-web/
├── index.html              # Landing page principal
├── trazabilidad.html       # Dashboard de trazabilidad (demo papas Astrid)
├── productor-app.html      # App móvil para productores
├── README.md              # Este archivo
├── assets/                # Imágenes y recursos
│   ├── images/           # Fotos de campo, cosechas, productores
│   └── logos/            # Logo y favicon
└── contracts/             # Smart contracts (siguiente fase)
    └── Traceability.sol  # Contrato principal
```

## 🚀 Deployment Rápido

### Opción 1: Cloudflare Pages (Recomendado)

```bash
# 1. Crear repositorio en GitHub
git init
git add .
git commit -m "Initial commit - AndesChain MVP"
git remote add origin https://github.com/tu-usuario/andeschain-web.git
git push -u origin main

# 2. En Cloudflare Pages:
# - Conectar repositorio GitHub
# - Build command: (vacío - es HTML estático)
# - Build output directory: /
# - Deploy!
```

Tu sitio estará en: `andeschain.pages.dev`
Luego configura tu dominio: `andeschain.io`

### Opción 2: Deploy Manual

Sube los archivos HTML directamente a tu hosting existente en Cloudflare.

## 🔗 Integración Blockchain (Polygon Mainnet) ✅

### ¡YA DEPLOYADO EN MAINNET!

Tu contrato está en producción. Ahora necesitas configurar el frontend:

#### Paso 1: Actualizar `config.js`

```javascript
// En el archivo config.js, actualiza estos valores:

const BLOCKCHAIN_CONFIG = {
    network: 'polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    
    // ACTUALIZA CON TU DIRECCIÓN REAL DEL CONTRATO:
    contractAddress: '0xTU_DIRECCIÓN_AQUI', // La que obtuviste del deployment
    
    // El ABI está correcto, pero verifica que coincida con tu contrato
    contractABI: [...]
};
```

#### Paso 2: Obtener datos de tu deployment

Si usaste Hardhat, busca en:
```bash
# Tu dirección del contrato está en:
artifacts/deployment-address.txt

# O en la salida del deployment:
npx hardhat run scripts/deploy.js --network polygon
# Contract deployed to: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

Si usaste Remix:
- Copia la dirección del contrato después del deployment
- Descarga el ABI desde la pestaña "Compile"

#### Paso 3: Verificar el contrato en PolygonScan

```bash
npx hardhat verify --network polygon TU_CONTRACT_ADDRESS
```

Esto hace que tu contrato sea público y verificable en:
`https://polygonscan.com/address/TU_CONTRACT_ADDRESS`

#### Paso 4: Registrar primer evento

Usa la app de productor o ejecuta directo:

```javascript
// En la consola del navegador (con MetaMask conectado):
await blockchain.init();
await blockchain.registerEvent(
    'PA-2602',              // productId
    'siembra',              // eventType
    '{"lat": -33.82, "lng": -70.79}',  // location
    {
        notes: 'Primera siembra de papas Astrid',
        quantity: '0',
        timestamp: new Date().toISOString()
    }
);
```

### Costos Reales en Polygon Mainnet:

- **Gas por transacción**: ~0.001-0.003 MATIC (~$0.001 USD)
- **100 eventos**: ~$0.10 USD
- **1000 eventos/mes**: ~$1 USD

*Mucho más barato que Ethereum mainnet (~$50-100 por transacción)*

### URLs de Producción:

Una vez que actualices `config.js`:

```bash
# Subir archivos actualizados
git add config.js productor-app.html trazabilidad-live.html
git commit -m "Connect to Polygon Mainnet contract"
git push origin main
```

Cloudflare Pages desplegará automáticamente en ~2 minutos.

**Nuevas URLs:**
- Dashboard en vivo: `https://andeschain.io/trazabilidad-live.html?productId=PA-2602`
- App productor: `https://andeschain.io/productor-app.html`
- Landing: `https://andeschain.io`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AndesChainTraceability {
    struct Event {
        uint256 timestamp;
        string eventType;
        string productId;
        string location;
        string metadata;
        address producer;
    }
    
    mapping(string => Event[]) public productEvents;
    
    event EventRegistered(
        string indexed productId,
        string eventType,
        uint256 timestamp
    );
    
    function registerEvent(
        string memory productId,
        string memory eventType,
        string memory location,
        string memory metadata
    ) public {
        Event memory newEvent = Event({
            timestamp: block.timestamp,
            eventType: eventType,
            productId: productId,
            location: location,
            metadata: metadata,
            producer: msg.sender
        });
        
        productEvents[productId].push(newEvent);
        
        emit EventRegistered(productId, eventType, block.timestamp);
    }
    
    function getProductEvents(string memory productId) 
        public 
        view 
        returns (Event[] memory) 
    {
        return productEvents[productId];
    }
}
```

### Desplegar en Polygon Mumbai (Testnet)

```bash
# 1. Instalar dependencias
npm init -y
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

# 2. Inicializar Hardhat
npx hardhat

# 3. Configurar hardhat.config.js
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY] // Tu private key (NUNCA la subas a Git)
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY]
    }
  }
};

# 4. Deploy
npx hardhat run scripts/deploy.js --network mumbai
```

### Conectar Frontend con Blockchain

Agrega al final de cada HTML (antes de `</body>`):

```html
<script src="https://cdn.jsdelivr.net/npm/web3@1.8.0/dist/web3.min.js"></script>
<script>
// Configuración Web3
const contractAddress = "TU_CONTRACT_ADDRESS_AQUI";
const contractABI = [...]; // ABI del contrato

let web3;
let contract;

async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        // Fallback a Mumbai RPC público
        web3 = new Web3('https://rpc-mumbai.maticvigil.com');
        contract = new web3.eth.Contract(contractABI, contractAddress);
    }
}

// Registrar evento en blockchain
async function registerBlockchainEvent(eventData) {
    const accounts = await web3.eth.getAccounts();
    const tx = await contract.methods.registerEvent(
        eventData.productId,
        eventData.eventType,
        eventData.location,
        JSON.stringify(eventData.metadata)
    ).send({ from: accounts[0] });
    
    return tx.transactionHash;
}

// Obtener eventos de un producto
async function getProductHistory(productId) {
    const events = await contract.methods.getProductEvents(productId).call();
    return events;
}

initWeb3();
</script>
```

## 📱 URLs del Sistema

Después del deployment:

- **Landing Page**: `https://andeschain.io`
- **Dashboard Demo**: `https://andeschain.io/trazabilidad.html?lote=PA-2602`
- **App Productor**: `https://andeschain.io/productor-app.html`

## 🎯 Para tu Presentación (Próxima Semana)

### Demo Flow Recomendado:

1. **Mostrar Landing** (2 min)
   - Historia (IBM → Campo → Blockchain)
   - Problemas que resuelve
   - Casos reales

2. **Demo Dashboard** (3 min)
   - Abrir `trazabilidad.html`
   - Mostrar timeline completo de las papas
   - Explicar cada evento verificado
   - Mostrar TX hash en blockchain

3. **App de Productor** (2 min)
   - Abrir `productor-app.html` en celular
   - Simular registro de cosecha de almendras
   - Captura GPS automática
   - Foto del producto
   - Envío a blockchain en tiempo real

4. **Propuesta para Pilotos** (3 min)
   - **Paine**: 20 productores, 6 meses, $X aporte municipal
   - **Providencia**: Ferias libres, trazabilidad de verduras
   - Métricas: eventos/mes, productos certificados, QR escaneados

## 💡 Mejoras Post-Presentación

### Fase 2 (Después de conseguir pilotos):
- [ ] Integración con IPFS para imágenes
- [ ] QR dinámicos con NFC
- [ ] Dashboard para alcaldes (métricas en tiempo real)
- [ ] App móvil nativa (React Native)
- [ ] Integración con ERPs agrícolas

### Fase 3 (Escalamiento):
- [ ] API pública para desarrolladores
- [ ] Marketplace de productos certificados
- [ ] Certificaciones automáticas (orgánico, comercio justo)
- [ ] Exportación a Polygon mainnet

## 🎨 Personalización

### Agregar tus imágenes reales:

```bash
andeschain-web/
└── assets/
    └── images/
        ├── papas-campo.jpg      # Foto de las papas en El Otro Huerto
        ├── almendras.jpg        # Cosecha de almendras
        ├── productor.jpg        # Foto del productor
        ├── manzanas-valdivia.jpg # Para la sidra
        └── hero-background.jpg  # Background del hero
```

Luego actualiza en `index.html`:

```css
.hero {
    background-image: url('assets/images/hero-background.jpg');
    background-size: cover;
}

.caso-image {
    background-image: url('assets/images/papas-campo.jpg');
    background-size: cover;
}
```

## 🔑 Variables de Entorno

Crea un archivo `.env` (NO subir a Git):

```env
# Polygon
POLYGON_RPC_URL=https://polygon-rpc.com
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
PRIVATE_KEY=tu_private_key_aqui

# IPFS (para imágenes)
PINATA_API_KEY=tu_api_key
PINATA_SECRET=tu_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=contacto@andeschain.io
SMTP_PASS=tu_password
```

## 📊 Métricas para Alcaldes

El dashboard de alcaldes mostrará:

- Productores registrados en la comuna
- Productos certificados este mes
- QR codes escaneados (engagement)
- Mapa de producción local
- Toneladas con trazabilidad
- Impacto en huella de carbono

## 🤝 Contacto y Soporte

- Email: contacto@andeschain.io
- GitHub: github.com/andeschain
- Documentación: docs.andeschain.io (próximamente)

## 📝 Notas Técnicas

### Costos Aproximados:
- **Polygon Mumbai (testnet)**: Gratis
- **Polygon Mainnet**: ~$0.001 por transacción
- **Cloudflare Pages**: Gratis
- **Dominio .io**: ~$40/año

### Stack Tecnológico:
- Frontend: HTML5 + CSS3 + Vanilla JS
- Blockchain: Polygon (Layer 2 de Ethereum)
- Storage: IPFS (descentralizado)
- Hosting: Cloudflare Pages
- Smart Contracts: Solidity 0.8.19

---

¡Éxito en tu presentación! 🚀🌱
