/**
 * ANDESCHAIN - INFRAESTRUCTURA DE TRAZABILIDAD TERRITORIAL
 * Archivo: js/simulador.js
 * Descripción: Base de Datos Maestra y Lógica de Sincronización Local.
 * Versión: 4.0 - Inteligencia Territorial Multi-Comuna
 */

console.log("✅ Sistema AndesChain: Sincronizando Infraestructura Multi-Comunal...");

// 1. DATOS SEMILLA (Registros Reales con Inteligencia Territorial)
const seedData = [
    {
        id: "1001",
        nombre: "Papa Astrid",
        lote: "Lote #04-2026",
        productor: "El Otro Huerto (Quillagua)",
        tipo: "Agricultor",
        manejo: "Agroecológica",
        fomento: "INDAP",
        ubicacion: "El Vínculo, Paine",
        lat: "-33.846294", 
        lon: "-70.809306",
        fecha: "30 Ene 2026",
        estado: "VERIFIED",
        demo: "NO",
        intel: {
            suelo: "Clase I",
            agua: "Escasez Hídrica",
            co2: "0.85kg"
        },
        historia: "Papas agroecologicas con prácticas iniciales de agricultura biodinámica. Producción y cosecha familiar utilizada con fines educativos.",
        img: "assets/cosecha.jpg", 
        hitos: [
            { titulo: "Preparación terreno", fecha: "1 Oct 2025", desc: "Suelo Clase I preparado con abonos orgánicos.", img: "assets/preparacion.jpg" },
            { titulo: "Siembra", fecha: "16 Oct 2025", desc: "Siembra manual de semilla certificada.", img: "assets/siembra.jpg" },
            { titulo: "Cosecha", fecha: "30 Ene 2026", desc: "Cosecha manual y selección en origen.", img: "assets/cosecha.jpg" }
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
        intel: {
            suelo: "Clase II",
            agua: "Riego por Goteo",
            co2: "0.40kg"
        },
        historia: "Variedad de poroto para consumo en verde de gran longitud. El cultivo es custodiado por bandas florales.",
        img: "assets/porotoyarda.jpg", 
        hitos: [
            { titulo: "Instalación de Banda Floral", fecha: "10 Oct 2025", desc: "Siembra de flores para biodiversidad." },
            { titulo: "Validación Digital", fecha: "13 Feb 2026", desc: "Certificación de geolocalización." }
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
        intel: {
            suelo: "Clase IV",
            agua: "Pluvial",
            co2: "0.12kg"
        },
        historia: "Sidra elaborada con manzanas de quintas patrimoniales recuperadas en la selva valdiviana.",
        img: "assets/puchacay.jpg",
        hitos: [
            { titulo: "Fermentación", fecha: "20 Dic 2025", desc: "Proceso natural en barricas." },
            { titulo: "Embotellado", fecha: "08 Feb 2026", desc: "Lote de origen controlado." }
        ]
    }
];

// --- MOTOR DE GENERACIÓN TERRITORIAL (Nuevas Comunas) ---
const configuracionComunas = [
    { n: "Buin", lat: -33.73, lon: -70.74, productos: ["Cerezas", "Uva de Mesa"] },
    { n: "Isla de Maipo", lat: -33.75, lon: -70.90, productos: ["Vino Orgánico", "Choclo"] },
    { n: "Limache", lat: -33.01, lon: -71.26, productos: ["Tomate Limachino", "Paltas"] },
    { n: "Quillota", lat: -32.88, lon: -71.24, productos: ["Chirimoyas", "Flores"] },
    { n: "Nogales", lat: -32.73, lon: -71.20, productos: ["Nueces", "Aceitunas"] },
    { n: "Valdivia", lat: -39.81, lon: -73.24, productos: ["Cerveza Artesanal", "Quesos"] }
];

const tiposManejo = ["Tradicional", "Orgánica", "Agroecológica"];
const tiposProductor = ["Agricultor", "Emprendedor", "Empresa"];

for (let i = 1; i <= 80; i++) {
    const conf = configuracionComunas[i % configuracionComunas.length];
    const nombreProd = conf.productos[i % conf.productos.length];
    const manejo = tiposManejo[i % 3];
    const tipo = tiposProductor[i % 3];
    
    const randomLat = conf.lat + (Math.random() * 0.04 - 0.02);
    const randomLon = conf.lon + (Math.random() * 0.04 - 0.02);

    seedData.push({
        id: `DEMO-${2000 + i}`,
        nombre: `${nombreProd} de ${conf.n}`,
        productor: "Productor en Red",
        tipo: tipo,
        manejo: manejo,
        fomento: i % 3 === 0 ? "INDAP" : (i % 5 === 0 ? "PRODESAL" : ""),
        ubicacion: `${conf.n}, Chile`,
        lat: randomLat.toFixed(6),
        lon: randomLon.toFixed(6),
        fecha: "Marzo 2026",
        estado: "VERIFIED",
        demo: "SI",
        intel: {
            suelo: i % 2 === 0 ? "Clase I" : "Clase III",
            agua: i % 3 === 0 ? "Zona Crítica" : "Sustentable",
            co2: (Math.random() * 0.5).toFixed(2) + "kg"
        },
        img: `https://loremflickr.com/640/480/agriculture,${nombreProd.split(' ')[0]}?lock=${i}`,
        historia: `Registro de trazabilidad para ${nombreProd} producido en la zona de ${conf.n}.`,
        hitos: [
            { titulo: "Registro de Siembra", fecha: "Nov 2025", desc: "Inicio de ciclo controlado." },
            { titulo: "Control de Calidad", fecha: "Ene 2026", desc: "Inspección técnica de terreno." }
        ]
    });
}

// 2. LÓGICA DE INICIALIZACIÓN
window.initAndesChain = function() {
    localStorage.setItem('andesDB', JSON.stringify(seedData));
};

// Autoejecución si no hay datos
if (!localStorage.getItem('andesDB')) {
    window.initAndesChain();
}

// 3. MÉTODOS DE ACCESO GLOBALES
window.getProductos = function() {
    return JSON.parse(localStorage.getItem('andesDB')) || [];
};

window.saveProducto = function(nuevoProducto) {
    let db = window.getProductos();
    if (!nuevoProducto.demo) nuevoProducto.demo = "NO"; 
    db.unshift(nuevoProducto);
    localStorage.setItem('andesDB', JSON.stringify(db));
    console.log("💾 Registro guardado.");
};
