// blockchain.js - Helper functions para interactuar con el blockchain

class AndesChainBlockchain {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
    }
    
    async init() {
        try {
            // Usar RPC público para lectura
            this.web3 = new Web3(ANDESCHAIN_CONFIG.rpcUrl);
            
            // Inicializar contrato
            this.contract = new this.web3.eth.Contract(
                ANDESCHAIN_CONFIG.contractABI,
                ANDESCHAIN_CONFIG.contractAddress
            );
            
            return true;
        } catch (error) {
            console.error('Error inicializando blockchain:', error);
            return false;
        }
    }
    
    async connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('Por favor instala MetaMask');
        }
        
        try {
            this.web3 = new Web3(window.ethereum);
            
            // Verificar que está en Polygon
            const chainId = await this.web3.eth.getChainId();
            if (chainId !== ANDESCHAIN_CONFIG.chainId) {
                await this.switchToPolygon();
            }
            
            // Solicitar acceso a la cuenta
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            this.account = accounts[0];
            
            // Reinicializar contrato con wallet
            this.contract = new this.web3.eth.Contract(
                ANDESCHAIN_CONFIG.contractABI,
                ANDESCHAIN_CONFIG.contractAddress
            );
            
            return this.account;
        } catch (error) {
            console.error('Error conectando wallet:', error);
            throw error;
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
            } else {
                throw switchError;
            }
        }
    }
    
    async registerEvent(productId, eventType, location, metadata) {
        if (!this.account) {
            await this.connectWallet();
        }
        
        try {
            const tx = await this.contract.methods.registerEvent(
                productId,
                eventType,
                location,
                metadata
            ).send({ 
                from: this.account,
                gas: 300000
            });
            
            return {
                success: true,
                txHash: tx.transactionHash,
                blockNumber: tx.blockNumber,
                explorerUrl: `${ANDESCHAIN_CONFIG.explorerUrl}/tx/${tx.transactionHash}`
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
                location: this.parseJSON(event.location),
                metadata: this.parseJSON(event.metadata),
                producer: event.producer
            }));
        } catch (error) {
            console.error('Error obteniendo historial:', error);
            return [];
        }
    }
    
    parseJSON(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }
    
    formatAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    }
    
    getExplorerUrl(txHash) {
        return `${ANDESCHAIN_CONFIG.explorerUrl}/tx/${txHash}`;
    }
}

// Instancia global
const blockchain = new AndesChainBlockchain();
