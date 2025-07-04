// =================================================================
// KODE FINAL SUPER SIMPEL (HANYA STIKER DARI GAMBAR/VIDEO)
// Dibuat: 4 Juli 2025
// Fitur: .stiker (dari gambar/video)
// =================================================================

const {
    default: makeWASocket,
    useMultiFileAuthState,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    DisconnectReason
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

/**
 * Fungsi untuk membuat stiker dari GAMBAR/VIDEO
 * @param {Buffer} media Buffer dari gambar/video
 * @param {boolean} isVideo Apakah media adalah video
 * @returns {Promise<Buffer>} Buffer dari stiker webp
 */
async function createSticker(media, isVideo = false) {
    return new Promise((resolve, reject) => {
        const tempFileIn = path.join(__dirname, `temp_in_${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`);
        const tempFileOut = path.join(__dirname, `temp_out_${Date.now()}.webp`);
        fs.writeFileSync(tempFileIn, media);

        ffmpeg(tempFileIn)
            .on('error', (err) => {
                console.error('Error ffmpeg (image sticker):', err);
                if (fs.existsSync(tempFileIn)) fs.unlinkSync(tempFileIn);
                reject(err);
            })
            .on('end', () => {
                const sticker = fs.readFileSync(tempFileOut);
                fs.unlinkSync(tempFileIn);
                fs.unlinkSync(tempFileOut);
                resolve(sticker);
            })
            .toFormat('webp')
            .addOutputOptions([
                '-vcodec', 'libwebp',
                '-vf', `scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=512:512:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
            ])
            .duration(isVideo ? 5 : 999)
            .save(tempFileOut);
    });
}

/**
 * Fungsi utama untuk menjalankan bot
 */
async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state,
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.log('Pindai QR code ini dengan WhatsApp di HP-mu:');
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;
            console.log('Koneksi terputus karena:', lastDisconnect.error, ', mencoba menghubungkan kembali:', shouldReconnect);
            if (shouldReconnect) connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('Koneksi berhasil, bot siap digunakan!');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const fullMessage = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || '';
        if (!fullMessage) return;
        
        const commandSticker = '.stiker';

        try {
            if (fullMessage.toLowerCase().startsWith(commandSticker)) {
                const messageType = Object.keys(msg.message)[0];
                const isMedia = (messageType === 'imageMessage' || messageType === 'videoMessage');
                const isQuotedMedia = msg.message.extendedTextMessage?.contextInfo?.quotedMessage && (msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage);

                if (!isMedia && !isQuotedMedia) {
                     await sock.sendMessage(from, { text: `Perintah .stiker harus dikirim bareng gambar/video, atau balas gambar/video yang sudah ada.` }, { quoted: msg });
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
                
                console.log(`[Image Sticker] Perintah diterima dari ${from}`);
                await sock.sendMessage(from, { text: 'Sabar ya, stiker lagi dibikin...' }, { quoted: msg });
                
                const stream = await downloadContentFromMessage(mediaMsg, mediaType.replace('Message', ''));
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                
                const sticker = await createSticker(buffer, mediaType === 'videoMessage');
                await sock.sendMessage(from, { sticker: sticker }, { quoted: msg });
            }
        } catch (error) {
            console.error('Gagal memproses permintaan stiker:', error);
            await sock.sendMessage(from, { text: `Waduh, gagal bikin stikernya. Error: ${error.message}` }, { quoted: msg });
        }
    });
}

connectToWhatsApp();
