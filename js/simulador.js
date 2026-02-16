/**
 * ANDESCHAIN - INFRAESTRUCTURA DE TRAZABILIDAD TERRITORIAL
 * Archivo: js/simulador.js
 * Descripción: Base de Datos Maestra y Lógica de Sincronización Local.
 * * GUÍA DE ATRIBUTOS (DICCIONARIO DE DATOS):
 * -----------------------------------------
 * @id:          String único (ID correlativo).
 * @tipo:        [Agricultor | Emprendedor | Empresa] -> Define gráfico "Segmentación".
 * @manejo:      [Orgánica | Agroecológica | Tradicional] -> Define gráfico "Sistemas de Producción".
 * @fomento:     [INDAP | PRODESAL | Patrimonial | Vacío] -> Filtra KPI INDAP (Color Azul).
 * @estado:      [VERIFIED | PENDING] -> Estado de validación en Blockchain.
 * @lat / @lon: Coordenadas geográficas para el posicionamiento en Mapa Leaflet.
 * @demo:        [SI | NO] -> SI: dato generado aleatoriamente; NO: dato real capturado.
 */

console.log("✅ Sistema AndesChain: Sincronizando Infraestructura con Soporte Demo y Evidencia Visual...");

// 1. DATOS SEMILLA (Base de Datos Maestra)
const seedData = [
    {
        id: "1001",
        nombre: "Papa Astrid",
        lote: "Lote #04-2026",
        productor: "El Otro Huerto (Quillagua)",
        tipo: "Empresa",
        manejo: "Agroecológica",
        fomento: "",
        ubicacion: "El Vínculo, Paine",
        lat: "-33.846294574770894", 
        lon: "-70.80930607600027",
        fecha: "30 Ene 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Papas agroecologicas con prácticas iniciales de agricultura biodinámica. Producción y cosecha familiar utilizada con fines educativos.",
        img: "assets/cosecha.jpg", 
        hitos: [
            { titulo: "Preparación terreno", fecha: "1 Oct 2025", desc: "Realizado por Francisco Toto Hernández, vecino agricultor.", img: "assets/preparacion.jpg" },
            { titulo: "Siembra", fecha: "16 Oct 2025", desc: "Instancia familiar de siembra..", img: "assets/siembra.jpg" },
            { titulo: "Cosecha", fecha: "30 Ene 2026", desc: "Cosecha y recolección manual desde las 8:34 am hasta las 20:00 horas.", img: "assets/cosecha.jpg" }
        ]
    },
    {
        id: "5006",
        nombre: "Poroto Metro (Yarda)",
        productor: "Luis Miranda",
        tipo: "Agricultor",
        manejo: "Agroecológica", 
        fomento: "PRODESAL",
        ubicacion: "Colonia Kennedy, Paine",
        lat: "-33.857142", 
        lon: "-70.730938",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Variedad de poroto para consumo en verde de gran longitud. El cultivo es custodiado por bandas florales de biodiversidad que favorecen el control natural de plagas.",
        img: "assets/porotoyarda.jpg", 
        hitos: [
            { titulo: "Instalación de Banda Floral", fecha: "10 Oct 2025", desc: "Siembra de especies melíferas para atraer polinizadores." },
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
        fomento: "INDAP",
        ubicacion: "El Vínculo, Paine",
        lat: "-33.842301",
        lon: "-70.811054",
        fecha: "12 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Almendras de calibre exportación. Producidas con riego por goteo optimizado. Polinización natural certificada.",
        img: "assets/almendra.jpg", 
        hitos: [
            { titulo: "Floración", fecha: "15 Ago 2025", desc: "Polinización con abejas locales." },
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
        fomento: "INDAP",
        ubicacion: "Mansel, Paine",
        lat: "-33.85199885495518",
        lon: "-70.78121948081238",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Tomate cal-ace producidas sin agroquímicos por un agricultor con historia en la comuna.",
        img: "assets/tomate.jpg", 
        hitos: [
            { titulo: "Siembra", fecha: "10 Oct 2025", desc: "Semillas ancestrales de mi familia." },
            { titulo: "Cosecha", fecha: "13 Feb 2026", desc: "Cosecha manual. Temp: 20°C." }
        ]
    },
    {
        id: "5005",
        nombre: "Zapallo de Guarda Antiguo",
        lote: "Lote #07-2026",
        productor: "Luis Miranda",
        tipo: "Agricultor",
        manejo: "Agroecológica",
        fomento: "", 
        ubicacion: "Colonia Kennedy, Paine",
        lat: "-33.857142", 
        lon: "-70.730938",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Cultivo agroecológico a partir de semilla tradicional, rescatando el sabor y la durabilidad del zapallo de guarda auténtico de la zona.",
        img: "assets/zapalloguarda.jpg",
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
        tipo: "Emprendedor",
        manejo: "Agroecológica",
        fomento: "Patrimonial",
        ubicacion: "Cayumapu, Valdivia",
        lat: "-39.729432",
        lon: "-73.109730",
        fecha: "10 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Sidra elaborada en colaboración con la Sra. María (AFC). Manzanas de quintas patrimoniales recuperadas.",
        img: "assets/puchacay.jpg",
        hitos: [
            { titulo: "Fermentación", fecha: "20 Dic 2025", desc: "Proceso natural sin aditivos." },
            { titulo: "Embotellado", fecha: "08 Feb 2026", desc: "Lote limitado." }
        ]
    },
    {
        id: "5007",
        nombre: "Flor de Jamaica Agroecológica",
        productor: "Luis Miranda",
        tipo: "Agricultor",
        manejo: "Agroecológica",
        fomento: "PRODESAL",
        ubicacion: "Colonia Kennedy, Paine",
        lat: "-33.856950", 
        lon: "-70.730958",
        fecha: "15 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Cosecha de flores de jamaica para deshidratar sus cálices, cultivo agroecológico bajo el protocolo de confianza AndesChain.",
        img: "assets/flordejamaica.jpg", 
        hitos: [
            { titulo: "Cosecha de Cálices", fecha: "15 Feb 2026", desc: "Recolección manual de cálices de Flor de Jamaica." },
            { titulo: "Validación de Origen", fecha: "15 Feb 2026", desc: "Certificación de geolocalización en Colonia Kennedy." }
        ]
    }
];

// --- MOTOR DE GENERACIÓN TERRITORIAL (100 BLOQUES CON FOTOGRAFÍA) ---
const productosPaine = [
    { n: "Sandía de Paine Primor", m: "Tradicional", img: "https://images.unsplash.com/photo-1587049633562-ad78524921ea?w=600&q=80" },
    { n: "Huevos de Gallina Libre", m: "Orgánica", img: "https://images.unsplash.com/photo-1582733315328-84999961730d?w=600&q=80" },
    { n: "Miel de Azahar Nativa", m: "Agroecológica", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80" },
    { n: "Uva de Mesa Thompson", m: "Tradicional", img: "https://images.unsplash.com/photo-1537640538966-79f369b41f8f?w=600&q=80" },
    { n: "Cebolla Morada de Guarda", m: "Tradicional", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80" },
    { n: "Choclo Pastelero", m: "Agroecológica", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80" },
    { n: "Lechuga Hidropónica", m: "Orgánica", img: "https://images.unsplash.com/photo-1622206141842-16709899326e?w=600&q=80" },
    { n: "Nuez Chandler Export", m: "Tradicional", img: "https://images.unsplash.com/photo-1536620942726-595e0ce99c4d?w=600&q=80" },
    { n: "Durazno Conservero", m: "Tradicional", img: "https://images.unsplash.com/photo-1629995614350-8a4991266281?w=600&q=80" },
    { n: "Frutilla Albión de Paine", m: "Agroecológica", img: "https://images.unsplash.com/photo-1543528176-61b2395143a4?w=600&q=80" }
];

const productoresPaine = ["Cooperativa Paine", "Familia Catalán", "Huertos del Maipo", "Agrícola El Sol", "Sra. Elena de Huelquén", "Juan Pérez Silva", "María Soto", "Granja Los Lingues"];
const sectoresPaine = [
    { n: "Pintué", lat: -33.895, lon: -70.885 },
    { n: "Hospital", lat: -33.872, lon: -70.755 },
    { n: "Chada", lat: -33.915, lon: -70.685 },
    { n: "Huelquén", lat: -33.882, lon: -70.645 },
    { n: "Abrantes", lat: -33.825, lon: -70.765 }
];

for (let i = 1; i <= 100; i++) {
    const prodBase = productosPaine[i % productosPaine.length];
    const sector = sectoresPaine[i % sectoresPaine.length];
    const tipo = i % 3 === 0 ? "Empresa" : i % 2 === 0 ? "Emprendedor" : "Agricultor";
    const fomento = i % 4 === 0 ? "INDAP" : i % 5 === 0 ? "PRODESAL" : "";
    
    const randomLat = sector.lat + (Math.random() * 0.04 - 0.02);
    const randomLon = sector.lon + (Math.random() * 0.04 - 0.02);

    seedData.push({
        id: `DEMO-${1000 + i}`,
        nombre: prodBase.n,
        productor: productoresPaine[i % productoresPaine.length],
        tipo: tipo,
        manejo: prodBase.m,
        fomento: fomento,
        ubicacion: `${sector.n}, Paine`,
        lat: randomLat.toFixed(6),
        lon: randomLon.toFixed(6),
        fecha: `${1 + (i % 14)} Feb 2026`,
        estado: "VERIFIED",
        demo: "SI",
        img: prodBase.img,
        historia: `Registro generado automáticamente para demostración de densidad territorial en ${sector.n}.`,
        hitos: [
            { titulo: "Validación Satelital", fecha: "Feb 2026", desc: "Punto georeferenciado verificado.", img: prodBase.img },
            { titulo: "Certificación de Manejo", fecha: "Feb 2026", desc: `Producción bajo estándar ${prodBase.m}.`, img: prodBase.img }
        ]
    });
}

// 2. INICIALIZADOR CON SINCRONIZACIÓN AUTOMÁTICA
(function initAndesChain() {
    let currentDB = JSON.parse(localStorage.getItem('andesDB')) || [];
    let nuevosAgregados = 0;

    seedData.forEach(seedItem => {
        const existe = currentDB.find(dbItem => dbItem.id === seedItem.id);
        if (!existe) {
            currentDB.push(seedItem);
            nuevosAgregados++;
        }
    });

    localStorage.setItem('andesDB', JSON.stringify(currentDB));
    console.log(`✨ Sincronización completa. Registros totales: ${currentDB.length}`);
})();

// 3. MÉTODOS DE ACCESO GLOBALES
window.getProductos = function() {
    return JSON.parse(localStorage.getItem('andesDB')) || [];
};

window.saveProducto = function(nuevoProducto) {
    let db = window.getProductos();
    if (!nuevoProducto.demo) nuevoProducto.demo = "NO"; 
    db.unshift(nuevoProducto);
    localStorage.setItem('andesDB', JSON.stringify(db));
    console.log("💾 Registro guardado en infraestructura local.");
};
