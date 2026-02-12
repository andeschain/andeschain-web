// js/simulador.js

// 1. DATOS INICIALES (CASOS DE USO)
const seedData = [
    {
        id: "1001",
        nombre: "Almendras Nonpareil",
        lote: "Lote #04-2026",
        productor: "Agrícola El Vínculo",
        tipo: "Agricultor",
        ubicacion: "Paine, El Vínculo",
        lat: "-33.84230133754286",
        lon: "-70.811054665178",
        fecha: "12 Feb 2026",
        estado: "VERIFIED",
        historia: "Almendras de calibre exportación. Producidas con riego por goteo optimizado. Polinización natural certificada.",
        img: "assets/cosecha.jpg", // Usamos papas.jpg como placeholder si no tienes almendras
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
        lat: "-39.72943265745812",
        lon: "-73.10973057843908",
        fecha: "10 Feb 2026",
        estado: "VERIFIED",
        historia: "Sidra elaborada en colaboración con la Sra. María (Agricultura Familiar Campesina). Manzanas de quintas patrimoniales recuperadas. Economía circular.",
        img: "assets/puchacay.jpg",
        hitos: [
            { titulo: "Recepción (Sra. María)", fecha: "15 Dic 2025", desc: "Vínculo con Agricultura Familiar Campesina." },
            { titulo: "Fermentación", fecha: "20 Dic 2025", desc: "Proceso natural sin aditivos." },
            { titulo: "Embotellado", fecha: "08 Feb 2026", desc: "Lote limitado." }
        ]
    }
];

// 2. INICIALIZADOR
function initAndesChain() {
    if (!localStorage.getItem('andesDB')) {
        console.log("⚡ Inicializando AndesChain Genesis Block...");
        localStorage.setItem('andesDB', JSON.stringify(seedData));
    }
}

// 3. FUNCIONES DE LECTURA/ESCRITURA
function getProductos() {
    return JSON.parse(localStorage.getItem('andesDB')) || [];
}

function saveProducto(nuevoProducto) {
    let db = getProductos();
    db.unshift(nuevoProducto); // Agregar al principio
    localStorage.setItem('andesDB', JSON.stringify(db));
}

// Ejecutar al cargar
initAndesChain();
