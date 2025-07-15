const axios = require('axios');

async function downloadTikTok(url) {
    try {
        const response = await axios.post('https://lovetik.com/api/ajax/search', new URLSearchParams({ query: url }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
            }
        });
        const result = response.data;
        if (result.status !== 'ok' || !result.links || result.links.length === 0) {
            throw new Error(result.mess || 'Tidak dapat menemukan link download. Mungkin videonya privat atau link salah.');
        }
        const downloadLink = result.links[0].a;
        if (!downloadLink) throw new Error('Gagal parsing link download dari API.');
        
        console.log(`[TikTok] Ditemukan link download via lovetik: ${downloadLink}`);
        const videoResponse = await axios.get(downloadLink, { responseType: 'arraybuffer' });
        return Buffer.from(videoResponse.data, 'binary');
    } catch (error) {
        console.error('[TikTok] Gagal mendownload video:', error.message);
        throw new Error(`Gagal mendownload video TikTok. Coba lagi dengan link lain atau beberapa saat lagi. (${error.message})`);
    }
}

module.exports = {
    name: 'tt',
    description: 'Download video TikTok tanpa watermark.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            await sock.sendMessage(from, { text: 'Link TikTok-nya mana? Contoh: .tt https://vt.tiktok.com/xxxxx/' }, { quoted: msg });
            return;
        }

<<<<<<< HEAD
        console.log(`[TikTok] Perintah .tt diterima dari ${from} dengan URL: ${url}`);
        await sock.sendMessage(from, { text: 'Oke, lagi download video TikTok... Sabar ya. 🚀' }, { quoted: msg });
=======
        console.log(`[TikTok] Perintah diterima dari ${from} dengan URL: ${url}`);
        await sock.sendMessage(from, { text: 'Wait...' }, { quoted: msg });
>>>>>>> 16f8d3a7d166854bc4b06033476f80d064b17ca1
        
        const videoBuffer = await downloadTikTok(url);
        await sock.sendMessage(from, { 
            video: videoBuffer,
            caption: 'Nih videonya, Muna-kun! ✨'
        }, { quoted: msg });
    }
};
