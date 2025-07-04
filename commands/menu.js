module.exports = {
    name: 'menu',
    description: 'Menampilkan daftar menu perintah.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const menuText = `
🤖 *BOT MUNA-KUN* 🤖

Halo! Ini daftar perintah yang bisa kamu pakai:

*Hiburan & Info*
› *.pantun* - _Dapet pantun acak._
› *.gempa* - _Info gempa terkini._
› *.wiki <topik>* - _Cari info di Wikipedia._

*Tools Keren*
› *.ai <pertanyaan>* - _Tanya apa aja ke Gemini._
› *.stiker* - _Ubah gambar/video jadi stiker._
› *.tiktok <link>* - _Download video TikTok._

*Fitur Grup*
› *.tagall* - _Mention semua anggota._

Selamat mencoba! ✨
        `;
        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
    }
};
