// exif-extractor.js - Extracción de metadatos EXIF de imágenes
// Usa la librería exif-js para leer todos los datos de la foto

class EXIFExtractor {
    constructor() {
        this.exifData = null;
    }
    
    /**
     * Extrae todos los datos EXIF de una imagen
     * @param {File} file - Archivo de imagen
     * @returns {Promise<Object>} - Datos EXIF completos
     */
    async extractFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                
                img.onload = () => {
                    EXIF.getData(img, () => {
                        const allTags = EXIF.getAllTags(img);
                        const processed = this.processEXIFData(allTags);
                        resolve(processed);
                    });
                };
                
                img.onerror = () => reject(new Error('Error al cargar la imagen'));
            };
            
            reader.onerror = () => reject(new Error('Error al leer el archivo'));
            reader.readAsDataURL(file);
        });
    }
    
    /**
     * Procesa y estructura los datos EXIF
     */
    processEXIFData(exifTags) {
        const data = {
            // Ubicación GPS
            gps: this.extractGPS(exifTags),
            
            // Fecha y hora
            datetime: this.extractDateTime(exifTags),
            
            // Información del dispositivo
            device: this.extractDeviceInfo(exifTags),
            
            // Condiciones de captura
            capture: this.extractCaptureConditions(exifTags),
            
            // Metadata ambiental (si disponible)
            environment: this.extractEnvironmentalData(exifTags),
            
            // Datos raw completos
            raw: exifTags
        };
        
        return data;
    }
    
    /**
     * Extrae coordenadas GPS
     */
    extractGPS(tags) {
        if (!tags.GPSLatitude || !tags.GPSLongitude) {
            return null;
        }
        
        const lat = this.convertDMSToDD(
            tags.GPSLatitude,
            tags.GPSLatitudeRef
        );
        
        const lng = this.convertDMSToDD(
            tags.GPSLongitude,
            tags.GPSLongitudeRef
        );
        
        return {
            latitude: lat,
            longitude: lng,
            altitude: tags.GPSAltitude || null,
            timestamp: tags.GPSTimeStamp || null,
            precision: tags.GPSHPositioningError || null
        };
    }
    
    /**
     * Convierte coordenadas DMS a Decimal Degrees
     */
    convertDMSToDD(dms, ref) {
        if (!dms || dms.length !== 3) return null;
        
        const degrees = dms[0];
        const minutes = dms[1];
        const seconds = dms[2];
        
        let dd = degrees + minutes / 60 + seconds / 3600;
        
        if (ref === 'S' || ref === 'W') {
            dd = dd * -1;
        }
        
        return dd;
    }
    
    /**
     * Extrae información de fecha y hora
     */
    extractDateTime(tags) {
        return {
            original: tags.DateTimeOriginal || null,
            digitized: tags.DateTimeDigitized || null,
            modified: tags.DateTime || null,
            timezone: tags.OffsetTime || null
        };
    }
    
    /**
     * Extrae información del dispositivo
     */
    extractDeviceInfo(tags) {
        return {
            make: tags.Make || null,
            model: tags.Model || null,
            software: tags.Software || null,
            lens: tags.LensModel || null,
            orientation: tags.Orientation || null
        };
    }
    
    /**
     * Extrae condiciones de captura
     */
    extractCaptureConditions(tags) {
        return {
            iso: tags.ISOSpeedRatings || null,
            exposureTime: tags.ExposureTime || null,
            fNumber: tags.FNumber || null,
            flash: tags.Flash || null,
            focalLength: tags.FocalLength || null,
            whiteBalance: tags.WhiteBalance || null,
            meteringMode: tags.MeteringMode || null,
            exposureMode: tags.ExposureMode || null
        };
    }
    
    /**
     * Extrae datos ambientales (temperatura, humedad, presión)
     * Nota: Pocos dispositivos incluyen estos sensores
     */
    extractEnvironmentalData(tags) {
        const env = {
            temperature: null,
            humidity: null,
            pressure: null,
            weather: null
        };
        
        // Algunos smartphones modernos incluyen estos datos
        // en tags personalizados del fabricante
        if (tags.Temperature) env.temperature = tags.Temperature;
        if (tags.Humidity) env.humidity = tags.Humidity;
        if (tags.Pressure) env.pressure = tags.Pressure;
        
        // Buscar en MakerNote (datos del fabricante)
        if (tags.MakerNote) {
            // Aquí se podría parsear MakerNote según el fabricante
            // Por ahora dejamos null
        }
        
        return env;
    }
    
    /**
     * Genera un hash único de la imagen para verificación
     */
    async generateImageHash(file) {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    /**
     * Genera metadata completa lista para blockchain
     */
    async prepareForBlockchain(file, additionalData = {}) {
        const exifData = await this.extractFromFile(file);
        const imageHash = await this.generateImageHash(file);
        
        return {
            imageHash: imageHash,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            capturedAt: exifData.datetime.original || new Date().toISOString(),
            ...exifData,
            ...additionalData,
            verificationTimestamp: new Date().toISOString()
        };
    }
}

// Instancia global
const exifExtractor = new EXIFExtractor();
