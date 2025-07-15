const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { Sticker, StickerTypes } = require('wa-sticker-formatter'); // <-- IMPORT INI
const fs = require('fs');
const path = require('path');

<<<<<<< HEAD
async function createSticker(media, isVideo = false) {
    return new Promise((resolve, reject) => {
        const tempFileIn = path.join(__dirname, `../temp_in_${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`);
        const tempFileOut = path.join(__dirname, `../temp_out_${Date.now()}.webp`);
        fs.writeFileSync(tempFileIn, media);
=======
>>>>>>> 16f8d3a7d166854bc4b06033476f80d064b17ca1



// HAPUS FUNGSI createSticker LAMA, GANTI DENGAN INI
async function createSticker(media, type, author, pack) {
    const sticker = new Sticker(media, {
        pack: pack,         // Nama pack stiker
        author: author,     // Nama author
        type: type,         // Tipe stiker (default, crop, full)
        quality: 50         // Kualitas stiker (opsional)
    });

    return await sticker.toBuffer(); // Langsung jadi buffer, siap kirim
}

module.exports = {
    name: 's',
    description: 'Mengubah gambar/video menjadi stiker.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        
        // ... (kode untuk cek media & quoted media, tidak perlu diubah)
        const messageType = Object.keys(msg.message)[0];
        const isMedia = (messageType === 'imageMessage' || messageType === 'videoMessage');
        const isQuotedMedia = msg.message.extendedTextMessage?.contextInfo?.quotedMessage && (msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage);

        if (!isMedia && !isQuotedMedia) {
<<<<<<< HEAD
             await sock.sendMessage(from, { text: `Perintah .s harus dikirim bareng gambar/video, atau balas media yang sudah ada.` }, { quoted: msg });
=======
            await sock.sendMessage(from, { text: `Perintah .stiker harus dikirim bareng gambar/video, atau balas gambar/video yang sudah ada.` }, { quoted: msg });
>>>>>>> 16f8d3a7d166854bc4b06033476f80d064b17ca1
            return;
        }

        let mediaMsg;
        let mediaType;
        if (isMedia) {
            mediaMsg = msg.message[messageType];
            mediaType = messageType;
        } else {
            mediaMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage[Object.keys(msg.message.extendedTextMessage.contextInfo.quotedMessage)[0]];
            mediaType = Object.keys(msg.message.extendedTextMessage.contextInfo.quotedMessage)[0];
        }
        
<<<<<<< HEAD
        console.log(`[Sticker] Perintah .s diterima dari ${from}`);
        await sock.sendMessage(from, { text: 'Sabar ya, stiker lagi dibikin...' }, { quoted: msg });
=======
        console.log(`[Sticker] Perintah diterima dari ${from}`);
        await sock.sendMessage(from, { text: 'Wait...' }, { quoted: msg });
>>>>>>> 16f8d3a7d166854bc4b06033476f80d064b17ca1
        
        const stream = await downloadContentFromMessage(mediaMsg, mediaType.replace('Message', ''));
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        
        // --- INI BAGIAN YANG DIPERBARUI ---
        try {
            // Panggil fungsi createSticker yang baru dengan info author dan pack
            const stickerBuffer = await createSticker(
                buffer, 
                StickerTypes.DEFAULT, // Atau StickerTypes.CROPPED, StickerTypes.FULL
                'Bot Keren',          // <- INI AUTHORNYA
                'Sticker Anjay'       // <- INI NAMA PACKNYA
            );
    
            // Kirim stiker
            await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: msg });

        } catch (error) {
            console.error('Error saat membuat stiker:', error);
            await sock.sendMessage(from, { text: 'Gagal membuat stiker, coba lagi ya.' }, { quoted: msg });
        }
    }
};