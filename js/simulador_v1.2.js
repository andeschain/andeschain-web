// Simulador de Datos AndesChain v1.2
const PRODUCTOS_DB = [
    // --- PILOTO PAINE ---
    {
        id: "1001",
        nombre: "Sandía de Paine (Primor)",
        productor: "Juan González",
        tipo: "Agricultor",
        manejo: "Tradicional",
        ubicacion: "Sector Aculeo, Paine",
        lat: "-33.824500",
        lon: "-70.751200",
        fomento: "INDAP",
        fecha: "15 Oct 2025",
        estado: "VERIFIED",
        img: "assets/sandia_paine.jpg",
        historia: "Cultivo ancestral con riego tecnificado financiado por INDAP. 100% origen Paine.",
        demo: "NO",
        hitos: [
            { titulo: "Preparación Suelo", fecha: "01 Ago 2025", desc: "Abonado orgánico y arado", img: "assets/suelo.jpg" },
            { titulo: "Siembra", fecha: "15 Ago 2025", desc: "Semilla certificada", img: "assets/siembra.jpg" },
            { titulo: "Cosecha", fecha: "15 Oct 2025", desc: "Cosecha manual selección premium", img: "assets/cosecha.jpg" }
        ]
    },
    // --- ESCALABILIDAD: QUILLOTA ---
    {
        id: "2001",
        nombre: "Paltas Hass de Exportación",
        productor: "AgroQuillota Ltda.",
        tipo: "Empresa",
        manejo: "Orgánica",
        ubicacion: "Valle del Aconcagua, Quillota",
        lat: "-32.880000",
        lon: "-71.250000",
        fomento: "CORFO",
        fecha: "02 Nov 2025",
        estado: "VERIFIED",
        img: "assets/palta_hass.jpg",
        historia: "Producción con huella hídrica neutral certificada para mercado europeo.",
        demo: "NO",
        hitos: [
            { titulo: "Floración", fecha: "10 Sep 2025", desc: "Monitoreo de abejas", img: "assets/flor.jpg" },
            { titulo: "Control Plagas", fecha: "05 Oct 2025", desc: "Control biológico", img: "assets/control.jpg" }
        ]
    },
    // --- ESCALABILIDAD: ANTOFAGASTA ---
    {
        id: "3001",
        nombre: "Lechugas Hidropónicas del Desierto",
        productor: "Cooperativa Altos de Antofagasta",
        tipo: "Emprendedor",
        manejo: "Agroecológica",
        ubicacion: "La Chimba, Antofagasta",
        lat: "-23.640000",
        lon: "-70.400000",
        fomento: "INDAP",
        fecha: "10 Nov 2025",
        estado: "VERIFIED",
        img: "assets/lechuga.jpg",
        historia: "Cultivo en pleno desierto utilizando agua de desalinización. Máxima eficiencia.",
        demo: "SI",
        hitos: [
            { titulo: "Instalación", fecha: "01 Oct 2025", desc: "Nuevas camas hidropónicas", img: "assets/hidro.jpg" }
        ]
    }
];

window.getProductos = () => {
    const local = localStorage.getItem('andesDB_v1.2');
    return local ? JSON.parse(local) : PRODUCTOS_DB;
};

if (!localStorage.getItem('andesDB_v1.2')) {
    localStorage.setItem('andesDB_v1.2', JSON.stringify(PRODUCTOS_DB));
}
