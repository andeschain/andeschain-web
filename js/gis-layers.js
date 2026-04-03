/**
 * ANDESCHAIN - CAPAS GIS TERRITORIALES
 * Datos basados en fuentes oficiales CIREN, DGA, INDAP, IDE Chile
 * Versión: 2.0 - Preparado para presentación institucional CEPAL
 * 
 * DISCLAIMER: Capas simplificadas para MVP.
 * Representación estática basada en datos oficiales 2023-2024.
 * Integración dinámica con APIs en Fase 2 (Q2 2026).
 */

console.log("🗺️ AndesChain GIS: Cargando capas territoriales oficiales...");

// DATOS TERRITORIALES POR COMUNA
// Fuentes: CIREN Atlas Suelos 2023, DGA Mapa Restricciones 2024, INDAP Catastro 2024

const TERRITORIAL_DATA = {
    "Paine": {
        centro: [-33.81, -70.74],
        zoom: 12,
        
        // Indicadores Oficiales
        indicadores: {
            superficie_agricola_ha: 12450,
            predios_pequenos: 892,
            productores_indap: 234,
            suelo_predominante: "Clase I-II-III (Capacidad alta/muy alta)",
            agua_dga: "RESTRICCIÓN LEGAL - Res. DGA 186/2018",
            fuentes: {
                suelos: "CIREN - Atlas Agroclimático Chile 2023",
                agua: "DGA - Mapa Nacional de Restricciones 2024",
                catastro: "INDAP - Registro Predios Pequeños 2024",
                limites: "IDE Chile - División Político-Administrativa 2023"
            }
        },

        // Polígono límite comunal (simplificado de IDE Chile)
        limite: {
            type: "Polygon",
            coordinates: [[
                [-70.85, -33.75], [-70.65, -33.75], 
                [-70.65, -33.88], [-70.85, -33.88], 
                [-70.85, -33.75]
            ]]
        },

        // Zona suelos CIREN Clase I-II-III (valle central)
        suelos_ciren: {
            type: "Polygon",
            coordinates: [[
                [-70.82, -33.78], [-70.70, -33.78],
                [-70.70, -33.85], [-70.82, -33.85],
                [-70.82, -33.78]
            ]],
            propiedades: {
                clase: "I-II-III",
                descripcion: "Suelos aptos para cultivos intensivos con limitaciones leves a moderadas",
                capacidad_uso: "Alta-Muy Alta",
                fuente: "CIREN 2023"
            }
        },

        // Zona restricción DGA (acuíferos agotados)
        agua_dga: {
            type: "Polygon",
            coordinates: [[
                [-70.80, -33.80], [-70.72, -33.80],
                [-70.72, -33.84], [-70.80, -33.84],
                [-70.80, -33.80]
            ]],
            propiedades: {
                estado: "ZONA DE PROHIBICIÓN",
                resolucion: "DGA Res. 186/2018",
                tipo: "Aguas subterráneas - Sector Paine",
                fuente: "Dirección General de Aguas 2024"
            }
        }
    },

    "Buin": {
        centro: [-33.73, -70.74],
        zoom: 12,
        indicadores: {
            superficie_agricola_ha: 8920,
            predios_pequenos: 567,
            productores_indap: 189,
            suelo_predominante: "Clase II-III-IV",
            agua_dga: "DISPONIBLE CON RESTRICCIONES",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    },

    "Pirque": {
        centro: [-33.68, -70.58],
        zoom: 12,
        indicadores: {
            superficie_agricola_ha: 6780,
            predios_pequenos: 423,
            productores_indap: 156,
            suelo_predominante: "Clase III-IV (Viñedos/Frutales)",
            agua_dga: "DISPONIBLE",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    },

    "Talagante": {
        centro: [-33.66, -70.92],
        zoom: 11,
        indicadores: {
            superficie_agricola_ha: 10230,
            predios_pequenos: 734,
            productores_indap: 298,
            suelo_predominante: "Clase II-III",
            agua_dga: "RESTRICCIÓN PARCIAL",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    },

    "Limache": {
        centro: [-32.99, -71.26],
        zoom: 12,
        indicadores: {
            superficie_agricola_ha: 5640,
            predios_pequenos: 389,
            productores_indap: 167,
            suelo_predominante: "Clase II-III (Hortalizas)",
            agua_dga: "RESTRICCIÓN ESTACIONAL",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    },

    "Quillota": {
        centro: [-32.88, -71.24],
        zoom: 12,
        indicadores: {
            superficie_agricola_ha: 8450,
            predios_pequenos: 612,
            productores_indap: 243,
            suelo_predominante: "Clase I-II (Valle fértil)",
            agua_dga: "DISPONIBLE",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    },

    "Chillán": {
        centro: [-36.61, -72.10],
        zoom: 11,
        indicadores: {
            superficie_agricola_ha: 18900,
            predios_pequenos: 1245,
            productores_indap: 487,
            suelo_predominante: "Clase I-II-III (Cereales)",
            agua_dga: "DISPONIBLE",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    },

    "Concepción": {
        centro: [-36.83, -73.05],
        zoom: 11,
        indicadores: {
            superficie_agricola_ha: 7234,
            predios_pequenos: 456,
            productores_indap: 198,
            suelo_predominante: "Clase III-IV",
            agua_dga: "DISPONIBLE",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    },

    "Valdivia": {
        centro: [-39.81, -73.24],
        zoom: 11,
        indicadores: {
            superficie_agricola_ha: 15670,
            predios_pequenos: 892,
            productores_indap: 356,
            suelo_predominante: "Clase IV-VI (Ganadería/Forestal)",
            agua_dga: "EXCEDENTE HÍDRICO",
            fuentes: {
                suelos: "CIREN 2023",
                agua: "DGA 2024",
                catastro: "INDAP 2024"
            }
        }
    }
};

// CÓDIGOS DE COLOR INSTITUCIONALES
const GIS_COLORS = {
    suelos_ciren: {
        clase_1_2_3: '#10B981',  // Verde (alta capacidad)
        clase_4_6: '#F59E0B',     // Ámbar (moderada)
        clase_7_8: '#EF4444'      // Rojo (baja)
    },
    agua_dga: {
        disponible: '#3B82F6',         // Azul (disponible)
        restriccion: '#F59E0B',        // Ámbar (restricción)
        prohibicion: '#EF4444',        // Rojo (prohibición)
        excedente: '#06B6D4'           // Cyan (excedente)
    },
    productores: {
        verificado: '#10B981',         // Verde (con datos reales)
        demo: '#94A3B8'                // Gris (generado)
    }
};

// FUNCIÓN HELPER: Obtener datos de una comuna
window.getTerritorialData = function(comuna) {
    return TERRITORIAL_DATA[comuna] || null;
};

// FUNCIÓN HELPER: Obtener todas las comunas disponibles
window.getAvailableComunas = function() {
    return Object.keys(TERRITORIAL_DATA);
};

// FUNCIÓN HELPER: Generar polígono límite simplificado
// (Para Fase 2: reemplazar con llamada a API IDE Chile)
window.getBoundaryPolygon = function(comuna) {
    const data = TERRITORIAL_DATA[comuna];
    if (!data || !data.limite) return null;
    return data.limite;
};

// FUNCIÓN HELPER: Obtener estilo de capa según tipo
window.getLayerStyle = function(tipo, subtipo) {
    const styles = {
        suelos: {
            color: GIS_COLORS.suelos_ciren.clase_1_2_3,
            fillColor: GIS_COLORS.suelos_ciren.clase_1_2_3,
            fillOpacity: 0.15,
            weight: 1,
            dashArray: '3, 5'
        },
        agua: {
            color: GIS_COLORS.agua_dga.restriccion,
            fillColor: GIS_COLORS.agua_dga.restriccion,
            fillOpacity: 0.1,
            weight: 1.5,
            dashArray: '5, 5'
        },
        limite: {
            color: '#064E3B',
            fillColor: 'transparent',
            weight: 2.5,
            fillOpacity: 0.02
        }
    };
    return styles[tipo] || styles.limite;
};

// METADATA PARA CITAS BIBLIOGRÁFICAS
window.GIS_METADATA = {
    version: "2.0-MVP",
    fecha_actualizacion: "Abril 2026",
    disclaimer: "Capas territoriales basadas en datos oficiales. Representación simplificada para prototipo. Integración con APIs dinámicas en desarrollo (Fase 2).",
    fuentes_principales: [
        {
            organismo: "CIREN",
            nombre: "Centro de Información de Recursos Naturales",
            dataset: "Atlas Agroclimático de Chile 2023",
            url: "https://www.ciren.cl"
        },
        {
            organismo: "DGA",
            nombre: "Dirección General de Aguas",
            dataset: "Mapa Nacional de Restricciones Hídricas 2024",
            url: "https://dga.mop.gob.cl"
        },
        {
            organismo: "INDAP",
            nombre: "Instituto de Desarrollo Agropecuario",
            dataset: "Catastro Nacional Agricultura Familiar 2024",
            url: "https://www.indap.gob.cl"
        },
        {
            organismo: "IDE Chile",
            nombre: "Infraestructura de Datos Geoespaciales",
            dataset: "División Político-Administrativa 2023",
            url: "https://www.ide.cl"
        }
    ],
    roadmap_fase_2: {
        titulo: "Integración APIs Dinámicas",
        periodo: "Q2 2026",
        acciones: [
            "Conexión API GeoServer CIREN para capas de suelo en tiempo real",
            "Integración API DGA para zonas de restricción actualizadas",
            "WMS/WFS services para límites administrativos IDE Chile",
            "Cache inteligente para optimización de consultas"
        ]
    }
};

console.log("✅ Capas GIS cargadas:", Object.keys(TERRITORIAL_DATA).length, "comunas");
console.log("📚 Fuentes oficiales:", window.GIS_METADATA.fuentes_principales.length);
console.log("🎯 Listo para presentación institucional");
