/**
 * ANDESCHAIN - INFRAESTRUCTURA DE TRAZABILIDAD TERRITORIAL
 * Archivo: js/simulador.js
 * Versión: 1.3.2 (Executive & Policy Edition)
 * Descripción: Base de Datos Maestra y Lógica de Sincronización Local.
 * * GUÍA DE ATRIBUTOS (DICCIONARIO DE DATOS):
 * -----------------------------------------
 * @id:          String único (ID correlativo o prefijo DEMO).
 * @nombre:      Nombre del producto o cultivo principal.
 * @productor:   Nombre de la persona natural o jurídica.
 * @tipo:        [Agricultor | Emprendedor | Empresa] -> Alimenta gráfico "Perfil Actorial".
 * @manejo:      [Orgánica | Agroecológica | Tradicional] -> Alimenta gráfico "Matriz de Sostenibilidad".
 * @fomento:     [INDAP | PRODESAL | Patrimonial | Particular] -> Filtra KPI INDAP (Color Azul).
 * @ubicacion:   Sector y Comuna de origen.
 * @lat / @lon:  Coordenadas geográficas para posicionamiento en Mapa Leaflet.
 * @demo:        [SI | NO] -> SI: generado por motor; NO: dato real capturado en terreno.
 * @img:         Ruta local o URL de evidencia visual consistente.
 */

console.log("✅ Sistema AndesChain: Sincronizando Infraestructura v1.3.2 con Datos Reales y Cobertura Territorial Total...");

// 1. DATOS SEMILLA (Base de Datos Maestra - Datos Reales Capturados en Terreno)
const seedData = [
    {
        id: "1001",
        nombre: "Papa Astrid",
        productor: "El Otro Huerto (Quillagua)",
        tipo: "Empresa",
        manejo: "Agroecológica",
        fomento: "",
        ubicacion: "El Vínculo, Paine",
        lat: "-33.846294", 
        lon: "-70.809306",
        fecha: "30 Ene 2026",
        estado: "VERIFIED",
        demo: "NO",
        img: "assets/cosecha.jpg", 
        historia: "Papas agroecológicas con prácticas iniciales de agricultura biodinámica. Producción familiar utilizada con fines educativos.",
        hitos: [
            { titulo: "Preparación terreno", fecha: "1 Oct 2025", desc: "Realizado por Francisco Toto Hernández, vecino agricultor.", img: "assets/preparacion.jpg" },
            { titulo: "Siembra", fecha: "16 Oct 2025", desc: "Instancia familiar de siembra.", img: "assets/siembra.jpg" },
            { titulo: "Cosecha", fecha: "30 Ene 2026", desc: "Cosecha y recolección manual.", img: "assets/cosecha.jpg" }
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
        historia: "Variedad de poroto para consumo en verde de gran longitud. Custodiado por bandas florales para control natural de plagas.",
        img: "assets/porotoyarda.jpg", 
        hitos: [
            { titulo: "Instalación Banda Floral", fecha: "10 Oct 2025", desc: "Siembra de especies melíferas para polinizadores." },
            { titulo: "Validación Origen Digital", fecha: "13 Feb 2026", desc: "Certificación de geolocalización en Paine." }
        ]
    },
    {
        id: "3003",
        nombre: "Almendra Nonpareil",
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
        historia: "Almendras de calibre exportación. Producidas con riego por goteo optimizado.",
        img: "assets/almendra.jpg", 
        hitos: [
            { titulo: "Floración", fecha: "15 Ago 2025", desc: "Polinización con abejas locales." },
            { titulo: "Cosecha", fecha: "10 Feb 2026", desc: "Recolección mecánica." }
        ]
    },
    {
        id: "4004",
        nombre: "Tomate Cal-Ace",
        productor: "Familia Alburquenque",
        tipo: "Agricultor",
        manejo: "Tradicional",
        fomento: "INDAP",
        ubicacion: "Mansel, Paine",
        lat: "-33.851998",
        lon: "-70.781219",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        historia: "Tomates producidos sin agroquímicos por agricultor con trayectoria histórica en la zona.",
        img: "assets/tomate.jpg", 
        hitos: [
            { titulo: "Siembra", fecha: "10 Oct 2025", desc: "Uso de semillas seleccionadas." },
            { titulo: "Cosecha", fecha: "13 Feb 2026", desc: "Cosecha manual selectiva." }
        ]
    },
    {
        id: "5005",
        nombre: "Zapallo de Guarda Antiguo",
        productor: "Luis Miranda",
        tipo: "Agricultor",
        manejo: "Agroecológica",
        fomento: "PRODESAL", 
        ubicacion: "Colonia Kennedy, Paine",
        lat: "-33.857200", 
        lon: "-70.731000",
        fecha: "13 Feb 2026",
        estado: "VERIFIED",
        demo: "NO",
        img: "assets/zapalloguarda.jpg",
        hitos: [
            { titulo: "Siembra Tradicional", fecha: "15 Sep 2025", desc: "Rescate de semilla ancestral." }
        ]
    },
    {
        id: "2002",
        nombre: "Sidra Patrimonial",
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
        img: "assets/puchacay.jpg",
        hitos: [
            { titulo: "Fermentación", fecha: "20 Dic 2025", desc: "Proceso natural en frío." }
        ]
    },
    {
        id: "5007",
        nombre: "Flor de Jamaica",
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
        img: "assets/flordejamaica.jpg", 
        hitos: [
            { titulo: "Cosecha de Cálices", fecha: "15 Feb 2026", desc: "Recolección manual de cálices deshidratados." }
        ]
    }
];

// 2. CONFIGURACIÓN DE MOTOR TERRITORIAL (Cobertura de las 15 Comunas del Selector)
const configTerritorial = {
    "Paine": { lat: -33.81, lon: -70.74, crops: [{n:"Sandía Primor", img:"https://images.unsplash.com/photo-1587049633562-ad3822e37c4e?w=600"}]},
    "Buin": { lat: -33.73, lon: -70.74, crops: [{n:"Vino Cabernet", img:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600"}]},
    "Pirque": { lat: -33.68, lon: -70.58, crops: [{n:"Aceite de Oliva Extra", img:"https://images.unsplash.com/photo-1474979266404-7eaacbad8a0f?w=600"}]},
    "Calera de Tango": { lat: -33.63, lon: -70.78, crops: [{n:"Duraznos Conserveros", img:"https://images.unsplash.com/photo-1629995614350-8a4991266281?w=600"}]},
    "Isla de Maipo": { lat: -33.75, lon: -70.90, crops: [{n:"Choclo Pastelero", img:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600"}]},
    "Talagante": { lat: -33.66, lon: -70.92, crops: [{n:"Nueces Chandler", img:"https://images.unsplash.com/photo-1543208935-86644f777328?w=600"}]},
    "Melipilla": { lat: -33.68, lon: -71.21, crops: [{n:"Papas Yukon", img:"https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=600"}]},
    "Limache": { lat: -32.99, lon: -71.26, crops: [{n:"Tomate Limachino", img:"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600"}]},
    "Olmue": { lat: -33.00, lon: -71.18, crops: [{n:"Miel de Palma", img:"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600"}]},
    "Quillota": { lat: -32.88, lon: -71.24, crops: [{n:"Chirimoyas", img:"https://images.unsplash.com/photo-1601039641847-7857b99af652?w=600"}]},
    "Villa Alemana": { lat: -33.04, lon: -71.37, crops: [{n:"Hortalizas Hidropónicas", img:"https://images.unsplash.com/photo-1622206141842-16709899326e?w=600"}]},
    "Quilpue": { lat: -33.05, lon: -71.44, crops: [{n:"Flores de Corte", img:"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600"}]},
    "La Calera": { lat: -32.78, lon: -71.20, crops: [{n:"Paltas Hass", img:"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600"}]},
    "Nogales": { lat: -32.73, lon: -71.21, crops: [{n:"Cítricos Export", img:"https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600"}]},
    "Valdivia": { lat: -39.81, lon: -73.24, crops: [{n:"Berries Orgánicos", img:"https://images.unsplash.com/photo-1464960350473-974ead1a3002?w=600"}]}
};

// 3. MOTOR DE GENERACIÓN DE DENSIDAD TERRITORIAL (10 registros por comuna)
Object.keys(configTerritorial).forEach(comuna => {
    const config = configTerritorial[comuna];
    for (let i = 1; i <= 10; i++) {
        const crop = config.crops[i % config.crops.length];
        seedData.push({
            id: `DEMO-${comuna.substring(0,3).toUpperCase()}-${100 + i}`,
            nombre: crop.n,
            productor: `Actor Territorial ${i}`,
            tipo: i % 3 === 0 ? "Empresa" : i % 2 === 0 ? "Emprendedor" : "Agricultor",
            manejo: i % 3 === 0 ? "Tradicional" : i % 2 === 0 ? "Agroecológica" : "Orgánica",
            fomento: i % 4 === 0 ? "INDAP" : "Particular",
            ubicacion: `${comuna}, Región de origen`,
            lat: (config.lat + (Math.random() - 0.5) * 0.05).toFixed(6),
            lon: (config.lon + (Math.random() - 0.5) * 0.05).toFixed(6),
            fecha: "Marzo 2026",
            estado: "VERIFIED",
            demo: "SI",
            img: crop.img,
            historia: `Registro generado para demostración de trazabilidad en el territorio de ${comuna}.`,
            hitos: [{ titulo: "Validación Satelital", fecha: "Marzo 2026", desc: "Punto georeferenciado verificado." }]
        });
    }
});

// 4. INICIALIZADOR CON PERSISTENCIA LOCAL (Local Storage)
(function initAndesChain() {
    let currentDB = JSON.parse(localStorage.getItem('andesDB')) || [];
    
    // Inyección de seedData protegiendo datos existentes
    seedData.forEach(seedItem => {
        const existe = currentDB.find(dbItem => dbItem.id === seedItem.id);
        if (!existe) {
            currentDB.push(seedItem);
        }
    });

    localStorage.setItem('andesDB', JSON.stringify(currentDB));
    console.log(`✨ Sincronización completa. Registros en infraestructura: ${currentDB.length}`);
})();

// 5. MÉTODOS DE ACCESO GLOBALES
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
