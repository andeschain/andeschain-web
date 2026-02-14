/**
 * ANDESCHAIN - INFRAESTRUCTURA DE TRAZABILIDAD TERRITORIAL
 * Archivo: js/simulador.js
 * Descripción: Base de Datos Maestra y Lógica de Sincronización Local.
 * * GUÍA DE ATRIBUTOS (DICCIONARIO DE DATOS):
 * -----------------------------------------
 * @id:        String único (ID correlativo).
 * @tipo:      [Agricultor | Emprendedor | Empresa] -> Define gráfico "Segmentación".
 * @manejo:    [Orgánica | Agroecológica | Tradicional] -> Define gráfico "Sistemas de Producción".
 * @fomento:   [INDAP | PRODESAL | Patrimonial | Vacío] -> Filtra KPI INDAP (Color Azul).
 * @estado:    [VERIFIED | PENDING] -> Estado de validación en Blockchain.
 * @lat / @lon: Coordenadas geográficas para el posicionamiento en Mapa Leaflet.
 */

console.log("✅ Sistema AndesChain: Sincronizando Infraestructura...");

// 1. DATOS SEMILLA (Base de Datos Maestra)
const seedData = [
    {
        id: "1001",
        nombre: "Papa Astrid",
        lote: "Lote #04-2026",
        productor: "El Otro Huerto (Quillagua)",
        tipo: "Empresa",        // Clasificación socioproductiva
        manejo: "Agroecológica", // Tipo de sistema productivo
        fomento: "",            // Si es INDAP, activar etiqueta azul en mapa
        ubicacion: "El Vínculo, Paine",
        lat: "-33.846294574770894", 
        lon: "-70.80930607600027",
        fecha: "30 Ene 2026",
        estado: "VERIFIED",
        historia: "Papas agroecologicas con prácticas iniciales de agricultura biodinámica. Producción y cosecha familiar utilizada con fines educativos.",
        img: "assets/papa.jpg", 
        hitos: [
            { titulo: "Preparación terreno", fecha: "1 Oct 2025", desc: "Realizado por Francisco Toto Hernández" },
            { titulo: "Siembra", fecha: "16 Oct 2025", desc: "Instancia familiar en donde todos sembramos." },
            { titulo: "Cosecha", fecha: "30 Ene 2026", desc: "Cosecha y recolección manual a las 8:34 am. Temp: 20°C." }
        ]
    },
    {
        id: "5006",
        nombre: "Poroto Metro (Yarda)",
        productor: "Luis Miranda",
        tipo: "Agricultor",     // Para gráfico: Agricultura Familiar Campesina (AFC)
        manejo: "Agroecológica", 
        fomento: "PRODESAL",    // Programa de fomento asociado
        ubicacion: "Colonia Kennedy, Paine",
        lat: "-33.857142", 
        lon: "-70.730938",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        historia: "Variedad de poroto para consumo en verde de gran longitud. El cultivo es custodiado por bandas florales de biodiversidad que favorecen el control natural de plagas, eliminando el uso de pesticidas sintéticos.",
        img: "assets/porotoyarda.jpg", 
        hitos: [
            { titulo: "Instalación de Banda Floral", fecha: "10 Oct 2025", desc: "Siembra de especies melíferas para atraer polinizadores y controladores naturales." },
            { titulo: "Aparición de Vainas", fecha: "05 Jan 2026", desc: "Desarrollo de vainas de más de 40cm de largo bajo manejo agroecológico." },
            { titulo: "Validación de Origen Digital", fecha: "13 Feb 2026", desc: "Certificación de geolocalización y prácticas en Colonia Kennedy, Paine." }
        ]
    },
    {
        id: "3003",
        nombre: "Almendra Nonpareil",
        lote: "Lote #05-2026",
        productor: "Sol de Almendras",
        tipo: "Agricultor",
        manejo: "Tradicional",
        fomento: "INDAP",       // Activa marcador AZUL en GeoDashboard
        ubicacion: "El Vínculo, Paine",
        lat: "-33.842301",
        lon: "-70.811054",
        fecha: "12 Feb 2026",
        estado: "VERIFIED",
        historia: "Almendras de calibre exportación. Producidas con riego por goteo optimizado. Polinización natural certificada.",
        img: "assets/almendra.jpg", 
        hitos: [
            { titulo: "Floración", fecha: "15 Ago 2025", desc: "Polinización con abejas locales." },
            { titulo: "Cuaja", fecha: "20 Nov 2025", desc: "Control de carga frutal." },
            { titulo: "Cosecha", fecha: "10 Feb 2026", desc: "Recolección mecánica. Temp: 28°C." }
        ]
    },
    {
        id: "4004",
        nombre: "Tomate Cal-Ace",
        lote: "Lote #06-2026",
        productor: "Familia Alburquenque",
        tipo: "Agricultor",
        manejo: "Tradicional",
        fomento: "INDAP",       // Usuario INDAP verificado
        ubicacion: "Mansel, Paine",
        lat: "-33.85199885495518",
        lon: "-70.78121948081238",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        historia: "Tomate cal-ace producidas sin agroquímicos por un agricultor con historia en la comuna.",
        img: "assets/tomate.jpg", 
        hitos: [
            { titulo: "Siembra", fecha: "10 Oct 2025", desc: "Semillas ancestrales de mi familia." },
            { titulo: "Trasplante", fecha: "25 Nov 2025", desc: "Semillas ancestrales de mi familia." },
            { titulo: "Cosecha", fecha: "13 Feb 2026", desc: "Cosecha manual. Temp: 20°C." }
        ]
    },
    {
        id: "5005",
        nombre: "Zapallo de Guarda Antiguo",
        lote: "Lote #07-2026",
        productor: "Luis Miranda",
        tipo: "Agricultor",
        manejo: "Agroecológico",
        fomento: "", 
        ubicacion: "Colonia Kennedy, Paine",
        lat: "-33.857142", 
        lon: "-70.730938",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        historia: "Cultivo agroecológico a partir de semilla tradicional, rescatando el sabor y la durabilidad del zapallo de guarda auténtico de la zona.",
        img: "/assets/zapalloguarda.jpg",
        hitos: [
            { titulo: "Siembra Tradicional", fecha: "15 Sep 2025", desc: "Uso de semillas ancestrales sin intervención química." },
            { titulo: "Validación de Origen", fecha: "13 Feb 2026", desc: "Registro de coordenadas en Colonia Kennedy mediante AndesChain." }
        ]
    },
    {
        id: "2002",
        nombre: "Sidra Patrimonial",
        lote: "Barrica Origen #77",
        productor: "Punta de Fierro",
        tipo: "Emprendedor",    // Para gráfico: Generador de valor agregado
        manejo: "Agroecológico",
        fomento: "Patrimonial", // Categoría especial de fomento
        ubicacion: "Cayumapu, Valdivia",
        lat: "-39.729432",
        lon: "-73.109730",
        fecha: "10 Feb 2026",
        estado: "VERIFIED",
        historia: "Sidra elaborada en colaboración con la Sra. María (AFC). Manzanas de quintas patrimoniales recuperadas.",
        img: "assets/puchacay.jpg",
        hitos: [
            { titulo: "Recepción", fecha: "15 Dic 2025", desc: "Vínculo con Agricultura Familiar Campesina." },
            { titulo: "Fermentación", fecha: "20 Dic 2025", desc: "Proceso natural sin aditivos." },
            { titulo: "Embotellado", fecha: "08 Feb 2026", desc: "Lote limitado." }
        ]
    }
];

// 2. INICIALIZADOR CON SINCRONIZACIÓN AUTOMÁTICA
(function initAndesChain() {
    // Recuperar base de datos de LocalStorage o iniciar vacía
    let currentDB = JSON.parse(localStorage.getItem('andesDB')) || [];
    let nuevosAgregados = 0;

    // Sincronizar seedData con la memoria local sin duplicar IDs
    seedData.forEach(seedItem => {
        const existe = currentDB.find(dbItem => dbItem.id === seedItem.id);
        if (!existe) {
            currentDB.push(seedItem);
            nuevosAgregados++;
        }
    });

    if (nuevosAgregados > 0) {
        localStorage.setItem('andesDB', JSON.stringify(currentDB));
        console.log(`✨ Sincronizados ${nuevosAgregados} productos nuevos.`);
    } else {
        console.log("🔄 Memoria local actualizada.");
    }
})();

// 3. MÉTODOS DE ACCESO GLOBALES
window.getProductos = function() {
    return JSON.parse(localStorage.getItem('andesDB')) || [];
};

window.saveProducto = function(nuevoProducto) {
    let db = window.getProductos();
    db.unshift(nuevoProducto); // Agrega al inicio para mostrar primero en dashboard
    localStorage.setItem('andesDB', JSON.stringify(db));
    console.log("💾 Registro guardado en infraestructura local.");
};
