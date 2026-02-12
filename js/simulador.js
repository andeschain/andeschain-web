// js/simulador.js

console.log("✅ Simulador AndesChain Iniciado");

// --- IMPORTANTE: LÍNEA DE RESET ---
// Esta línea borra la memoria vieja para asegurar que carguen los datos nuevos.
// Bórrala o coméntala (ponle // al inicio) cuando ya veas los productos y quieras empezar a capturar datos nuevos.
// localStorage.removeItem('andesDB'); 
// ----------------------------------

// 1. DATOS SEMILLA (Seed Data)
const seedData = [
    {
        id: "1001",
        nombre: "Papa Astrid",
        lote: "Lote #04-2026",
        productor: "Agrícola & Comercial Rural Quillagua",
        tipo: "Agricultor",
        ubicacion: "Paine, El Vínculo",
        lat: "-33.846294574770894", 
        lon: "-70.80930607600027",
        fecha: "30 Ene 2026",
        estado: "VERIFIED",
        historia: "Papas agroecologicas con prácticas iniciales de agricultura biodinámica. Producción y cosecha familiar utilizada con fines educativos.",
        img: "assets/cosecha.jpg", 
        hitos: [
            { titulo: "Preparación terreno", fecha: "1 Oct 2025", desc: "Realizado por Francisco Toto Hernández" },
            { titulo: "Siembra", fecha: "16 Oct 2025", desc: "Instancia familiar en donde todos sembramos." },
            { titulo: "Cosecha", fecha: "30 Ene 2026", desc: "Cosecha y recolección manual, y con amor a las 8:34 am. Temp: 20°C." }
        ]
    },
    {
        id: "3003",
        nombre: "Almendra Nonpareil",
        lote: "Lote #05-2026",
        productor: "Agrícola Sol de Almendras",
        tipo: "Agricultor",
        ubicacion: "Paine, El Vínculo",
        lat: "-33.842301",
        lon: "-70.811054",
        fecha: "12 Feb 2026",
        estado: "VERIFIED",
        historia: "Almendras de calibre exportación. Producidas con riego por goteo optimizado. Polinización natural certificada.",
        img: "assets/cosecha.jpg", 
        hitos: [
            { titulo: "Floración", fecha: "15 Ago 2025", desc: "Polinización con abejas locales." },
            { titulo: "Cuaja", fecha: "20 Nov 2025", desc: "Control de carga frutal." },
            { titulo: "Cosecha", fecha: "10 Feb 2026", desc: "Recolección mecánica. Temp: 28°C." }
        ]
    },
    {
        id: "2002",
        nombre: "Sidra Patrimonial",
        lote: "Barrica Origen #77",
        productor: "Punta Fierro",
        tipo: "Emprendedor",
        ubicacion: "Cayumapu, Valdivia",
        lat: "-39.729432",
        lon: "-73.109730",
        fecha: "10 Feb 2026",
        estado: "VERIFIED",
        historia: "Sidra elaborada en colaboración con la Sra. María (Agricultura Familiar Campesina). Manzanas de quintas patrimoniales recuperadas.",
        img: "assets/puchacay.jpg",
        hitos: [
            { titulo: "Recepción", fecha: "15 Dic 2025", desc: "Vínculo con Agricultura Familiar Campesina." },
            { titulo: "Fermentación", fecha: "20 Dic 2025", desc: "Proceso natural sin aditivos." },
            { titulo: "Embotellado", fecha: "08 Feb 2026", desc: "Lote limitado." }
        ]
    }
];

// 2. INICIALIZADOR ROBUSTO
(function initAndesChain() {
    // Si no existe la DB o está vacía, cargamos la semilla
    let currentDB = localStorage.getItem('andesDB');
    
    if (!currentDB || currentDB === '[]') {
        console.log("⚡ Inicializando AndesChain Genesis Block...");
        localStorage.setItem('andesDB', JSON.stringify(seedData));
    } else {
        console.log("🔄 Base de datos existente cargada.");
    }
})();

// 3. FUNCIONES GLOBALES (Conectadas a WINDOW para que el HTML las vea)

window.getProductos = function() {
    return JSON.parse(localStorage.getItem('andesDB')) || [];
}

window.saveProducto = function(nuevoProducto) {
    let db = window.getProductos();
    db.unshift(nuevoProducto); // Agregar al principio
    localStorage.setItem('andesDB', JSON.stringify(db));
    console.log("💾 Producto guardado exitosamente");
}
