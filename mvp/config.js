// config.js - Configuración Polygon Mainnet
const BLOCKCHAIN_CONFIG = {
    network: 'polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    
    // ACTUALIZA ESTOS VALORES CON TUS DATOS REALES:
    contractAddress: 'TU_CONTRACT_ADDRESS_AQUI', // Ej: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
    
    // ABI del contrato (copia desde tu deployment)
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
        },
        {
            "anonymous": false,
            "inputs": [
                {"indexed": true, "internalType": "string", "name": "productId", "type": "string"},
                {"indexed": false, "internalType": "string", "name": "eventType", "type": "string"},
                {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
            ],
            "name": "EventRegistered",
            "type": "event"
        }
    ]
};

// Funciones helper para interactuar con el contrato
class AndesChainBlockchain {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
    }
    
    async init() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                // Usuario tiene MetaMask o wallet compatible
                this.web3 = new Web3(window.ethereum);
                
                // Verificar que está en Polygon
                const chainId = await this.web3.eth.getChainId();
                if (chainId !== BLOCKCHAIN_CONFIG.chainId) {
                    await this.switchToPolygon();
                }
                
                // Solicitar acceso a la cuenta
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                this.account = accounts[0];
            } else {
                // Modo lectura (sin wallet)
                this.web3 = new Web3(BLOCKCHAIN_CONFIG.rpcUrl);
            }
            
            // Inicializar contrato
            this.contract = new this.web3.eth.Contract(
                BLOCKCHAIN_CONFIG.contractABI,
                BLOCKCHAIN_CONFIG.contractAddress
            );
            
            return true;
        } catch (error) {
            console.error('Error inicializando blockchain:', error);
            return false;
        }
    }
    
    async switchToPolygon() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }], // 137 en hexadecimal
            });
        } catch (switchError) {
            // Si Polygon no está agregado, lo agregamos
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x89',
                        chainName: 'Polygon Mainnet',
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18
                        },
                        rpcUrls: ['https://polygon-rpc.com'],
                        blockExplorerUrls: ['https://polygonscan.com']
                    }]
                });
            }
        }
    }
    
    async registerEvent(productId, eventType, location, metadata) {
        if (!this.account) {
            throw new Error('Necesitas conectar una wallet para registrar eventos');
        }
        
        try {
            const tx = await this.contract.methods.registerEvent(
                productId,
                eventType,
                location,
                JSON.stringify(metadata)
            ).send({ 
                from: this.account,
                gas: 300000 // Ajustar según necesidad
            });
            
            return {
                success: true,
                txHash: tx.transactionHash,
                blockNumber: tx.blockNumber,
                explorerUrl: `${BLOCKCHAIN_CONFIG.explorerUrl}/tx/${tx.transactionHash}`
            };
        } catch (error) {
            console.error('Error registrando evento:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    async getProductHistory(productId) {
        try {
            const events = await this.contract.methods.getProductEvents(productId).call();
            
            return events.map(event => ({
                timestamp: new Date(event.timestamp * 1000),
                eventType: event.eventType,
                productId: event.productId,
                location: event.location,
                metadata: JSON.parse(event.metadata),
                producer: event.producer
            }));
        } catch (error) {
            console.error('Error obteniendo historial:', error);
            return [];
        }
    }
    
    formatAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    }
    
    getExplorerUrl(txHash) {
        return `${BLOCKCHAIN_CONFIG.explorerUrl}/tx/${txHash}`;
    }
}

// Instancia global
const blockchain = new AndesChainBlockchain();
