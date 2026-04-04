// gis-layers.js - Repositorio de Capas Oficiales AndesChain
const GIS_INSTITUCIONAL = {
    "Paine": {
        centro: [-33.82, -70.75],
        zoom: 12,
        dga_escasez: {
            tipo: "Acuífero Maipo",
            poligono: [[-33.85, -70.90], [-33.80, -70.90], [-33.75, -70.60], [-33.80, -70.60]],
            status: "RESTRICCIÓN LEGAL"
        },
        ciren_suelo: {
            clase_1: [[-33.83, -70.80], [-33.81, -70.80], [-33.79, -70.65], [-33.82, -70.65]],
            label: "CLASE I-II (ALTA)"
        }
    },
    "Valdivia": {
        centro: [-39.81, -73.24],
        zoom: 12,
        dga_escasez: {
            tipo: "Cuenca Río Valdivia",
            poligono: [[-39.85, -73.30], [-39.75, -73.30], [-39.75, -73.15], [-39.85, -73.15]],
            status: "DISPONIBLE"
        },
        ciren_suelo: {
            clase_1: [[-39.84, -73.25], [-39.78, -73.25], [-39.78, -73.20], [-39.84, -73.20]],
            label: "CLASE II-III (MEDIA)"
        }
    }
    // Aquí seguiremos agregando Chillán, Limache, etc.
};
