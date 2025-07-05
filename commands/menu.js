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
🎯 *Hiburan & Info*
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

━━━━━━━━━━━━━━━
🛠️ *Tools Keren*
━━━━━━━━━━━━━━━
🤖 *.ai <pertanyaan>* 
_Tanya apa saja ke Gemini._

🎨 *.stiker* 
_Ubah gambar/video jadi stiker._

🎵 *.tiktok <link>* 
_Download video TikTok._

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
