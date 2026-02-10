// config.js - Configuración Global AndesChain
const ANDESCHAIN_CONFIG = {
    // Blockchain
    network: 'polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    contractAddress: '0x34fe41bd7a2a34597bd098f29e2256b86ca60611', // Tu contrato actual
    
    // Colores del branding (basados en andeschain.io)
    colors: {
        primary: '#2D5F3F',      // Verde oscuro
        secondary: '#4A7C59',    // Verde medio
        accent: '#7BA682',       // Verde claro
        background: '#F5F5F3',   // Gris claro
        text: '#2C1810',         // Marrón oscuro
        white: '#FFFFFF'
    },
    
    // Rutas de assets
    paths: {
        logo: '/assets/logo.png',
        favicon: '/assets/favicon.png',
        images: '/assets/images/'
    },
    
    // ABI del contrato
    contractABI: [
        {
            "inputs": [
                {"internalType": "string", "name": "productId", "type": "string"},
                {"internalType": "string", "name": "eventType", "type": "string"},
                {"internalType": "string", "name": "location", "type": "string"},
                {"internalType": "string", "name": "metadata", "type": "string"}
            ],
            "name": "registerEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {"internalType": "string", "name": "productId", "type": "string"}
            ],
            "name": "getProductEvents",
            "outputs": [
                {
                    "components": [
                        {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                        {"internalType": "string", "name": "eventType", "type": "string"},
                        {"internalType": "string", "name": "productId", "type": "string"},
                        {"internalType": "string", "name": "location", "type": "string"},
                        {"internalType": "string", "name": "metadata", "type": "string"},
                        {"internalType": "address", "name": "producer", "type": "address"}
                    ],
                    "internalType": "struct AndesChainTraceability.Event[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
};
