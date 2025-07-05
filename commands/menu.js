module.exports = {
    name: 'menu',
    description: 'Menampilkan daftar menu perintah.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const menuText = `
╔═〘 🤖 *MUZE-CHAN BOT* 🤖 〙═╗

👋 *Halo! Aku siap membantu.*
Berikut daftar perintah yang bisa kamu gunakan:

━━━━━━━━━━━━━━━
🎯 *Info*
━━━━━━━━━━━━━━━
🌙 *.hijriah* 
_Cek tanggal Hijriah hari ini._

💡 *.katakata* 
_Dapatkan kata-kata bijak._

🎭 *.pantun* 
_Pantun acak untukmu._

🌍 *.gempa* 
_Info gempa terbaru._

📚 *.wiki <topik>* 
_Cari info dari Wikipedia._

🔍 *.musimini* 
_Cari info tentang anime yang sedang tayang musim ini._

📖 *.anime <judul>*
_Cari info tentang anime berdasarkan judul._

━━━━━━━━━━━━━━━
🛠️ *Tools Keren*
━━━━━━━━━━━━━━━
🤖 *.ai <pertanyaan>* 
_Tanya apa saja ke Gemini._

🎨 *.stiker* 
_Ubah gambar/video jadi stiker._

🎵 *.tiktok <link>* 
_Download video TikTok._

🎌 *.waifu*
_Mengirim gambar waifu random._

🎌 *.waifuneko*
_Mengirim gambar neko random._

🌐 *.whatanime*
_Cari sumber anime dari screenshot._

━━━━━━━━━━━━━━━
👥 *Fitur Grup*
━━━━━━━━━━━━━━━
📢 *.tagall* 
_Mention semua anggota grup._

━━━━━━━━━━━━━━━
✨ Selamat mencoba!
        `;
        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
    }
};
