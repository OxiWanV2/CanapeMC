const fs = require('fs');
const Jimp = require('jimp');
const png2icons = require('png2icons');

// Chemins des fichiers d'entrée et de sortie
const inputPngPath = './src/assets/test/icon.png';
const outputIcnsPath = './src/assets/images/icon.icns';

async function generateIcns() {
    try {
        // Lire l'image PNG
        const imagePng = await Jimp.read(inputPngPath);
        
        // Vérifier le type de fichier
        if (imagePng.getMIME() !== Jimp.MIME_PNG) {
            throw new Error('Le fichier fourni n\'est pas un fichier PNG valide.');
        }

        // Redimensionner l'image à 256x256
        const pngBuffer = await imagePng.resize(256, 256).getBufferAsync(Jimp.MIME_PNG);

        // Générer le fichier ICNS à partir du PNG
        const icnsBuffer = png2icons.createICNS(pngBuffer, png2icons.BILINEAR, 0);

        // Écrire le fichier ICNS généré
        fs.writeFileSync(outputIcnsPath, icnsBuffer);

        console.log('Fichier ICNS généré avec succès.');
    } catch (error) {
        console.error('Erreur lors de la génération du fichier ICNS:', error.message);
    }
}

generateIcns();