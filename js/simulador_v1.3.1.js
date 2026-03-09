/**
 * ANDESCHAIN - INFRAESTRUCTURA DE TRAZABILIDAD TERRITORIAL
 * Archivo: js/simulador.js
 * Versión: 1.3.1 (Executive & Policy Edition)
 * Descripción: Base de Datos Maestra y Lógica de Sincronización Local.
 * * GUÍA DE ATRIBUTOS (DICCIONARIO DE DATOS):
 * -----------------------------------------
 * @id:          String único (ID correlativo).
 * @tipo:        [Agricultor | Emprendedor | Empresa] -> Define gráfico "Perfil Actorial".
 * @manejo:      [Orgánica | Agroecológica | Tradicional] -> Define gráfico "Matriz de Sostenibilidad".
 * @fomento:     [INDAP | PRODESAL | Patrimonial | Vacío] -> Filtra KPI INDAP (Color Azul).
 * @estado:      [VERIFIED | PENDING] -> Estado de validación en Blockchain.
 * @lat / @lon:  Coordenadas geográficas para el posicionamiento en Mapa Leaflet.
 * @demo:        [SI | NO] -> SI: dato generado aleatoriamente; NO: dato real capturado.
 */

console.log("✅ Sistema AndesChain: Sincronizando Infraestructura v1.3.1 con Datos Reales y Consistencia Territorial...");

// 1. DATOS SEMILLA (Base de Datos Maestra - Datos Reales Capturados)
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
    }
];

// 2. MOTOR DE GENERACIÓN TERRITORIAL CONSISTENTE (Datos Demo)
// Definimos la vocación productiva por comuna para que los datos sean creíbles
const configuracionDemo = {
    "Paine": { lat: -33.81, lon: -70.74, crops: [
        {n: "Sandía Primor", m: "Tradicional", img: "https://images.unsplash.com/photo-1587049633562-ad3822e37c4e?w=600&q=80"},
        {n: "Miel de Quillay", m: "Orgánica", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80"},
        {n: "Nuez Chandler", m: "Tradicional", img: "https://images.unsplash.com/photo-1543208935-86644f777328?w=600&q=80"}
    ]},
    "Buin": { lat: -33.73, lon: -70.74, crops: [
        {n: "Vino Cabernet", m: "Tradicional", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80"},
        {n: "Hortalizas de Hoja", m: "Agroecológica", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"}
    ]},
    "Limache": { lat: -32.99, lon: -71.26, crops: [
        {n: "Tomate Limachino", m: "Agroecológica", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80"},
        {n: "Paltas Hass", m: "Tradicional", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80"}
    ]},
    "Valdivia": { lat: -39.81, lon: -73.24, crops: [
        {n: "Queso Mantecoso", m: "Tradicional", img: "https://images.unsplash.com/photo-1486297678162-ad2a19b0584e?w=600&q=80"},
        {n: "Sidra Artesanal", m: "Agroecológica", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&q=80"},
        {n: "Berries Orgánicos", m: "Orgánica", img: "https://images.unsplash.com/photo-1464960350473-974ead1a3002?w=600&q=80"}
    ]}
};

const tiposActor = ["Agricultor", "Emprendedor", "Empresa"];
const fomentosActor = ["INDAP", "PRODESAL", "Particular", ""];

// Generación de 10-15 registros por cada comuna definida en el dashboard
Object.keys(configuracionDemo).forEach(comuna => {
    const config = configuracionDemo[comuna];
    for (let i = 1; i <= 15; i++) {
        const cultivo = config.crops[i % config.crops.length];
        const latRandom = config.lat + (Math.random() - 0.5) * 0.05;
        const lonRandom = config.lon + (Math.random() - 0.5) * 0.05;

        seedData.push({
            id: `DEMO-${comuna.substring(0,3).toUpperCase()}-${100 + i}`,
            nombre: cultivo.n,
            productor: `Productor Demo ${i}`,
            tipo: tiposActor[i % tiposActor.length],
            manejo: cultivo.m,
            fomento: fomentosActor[i % fomentosActor.length],
            ubicacion: `${comuna}, Chile`,
            lat: latRandom.toFixed(6),
            lon: lonRandom.toFixed(6),
            fecha: "Marzo 2026",
            estado: "VERIFIED",
            demo: "SI",
            img: cultivo.img,
            historia: `Muestra representativa de la producción de ${cultivo.n} en el territorio de ${comuna}.`,
            hitos: [
                { titulo: "Trazabilidad Digital", fecha: "Marzo 2026", desc: "Georeferenciación predial completada bajo protocolo AndesChain." },
                { titulo: "Validación Institucional", fecha: "Marzo 2026", desc: "Certificación de métodos de producción territoriales." }
            ]
        });
    }
});

// 3. INICIALIZADOR CON SINCRONIZACIÓN AUTOMÁTICA
(function initAndesChain() {
    let currentDB = JSON.parse(localStorage.getItem('andesDB')) || [];
    
    // Sincronizar seedData con el almacenamiento local si no existen los IDs
    seedData.forEach(seedItem => {
        const existe = currentDB.find(dbItem => dbItem.id === seedItem.id);
        if (!existe) {
            currentDB.push(seedItem);
        }
    });

    localStorage.setItem('andesDB', JSON.stringify(currentDB));
    console.log(`✨ Sincronización completa. Registros totales en infraestructura: ${currentDB.length}`);
})();

// 4. MÉTODOS DE ACCESO GLOBALES
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
