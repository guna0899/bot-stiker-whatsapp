module.exports = {
    name: 'menu',
    description: 'Menampilkan daftar menu perintah.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const menuText = `
┌─「 🤖  *BOT MUNA-KUN* 🤖 」
│
├─「 𝗧𝗼𝗼𝗹𝘀 」
│
│  ›  *.s*
│     └─ _Ubah gambar/video jadi stiker._
│
│  ›  *.tt <link>*
│     └─ _Download video TikTok._
│
│  ›  *.ai <pertanyaan>*
│     └─ _Tanya apa saja ke Gemini._
│
├─「 𝗚𝗿𝘂𝗽 」
│
│  ›  *.tagall*
│     └─ _Mention semua anggota._
│
└─「 ✨ Selamat Mencoba! ✨ 」
        `;
        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
    }
};
