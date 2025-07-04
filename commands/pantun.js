module.exports = {
    name: 'pantun',
    description: 'Memberikan pantun acak.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        const pantunList = [
            "Jalan-jalan ke Kota Paris,\nLihat gedung berbaris-baris.\nBiar capek habis ngerjain tugas,\nLiat senyummu langsung terhapus.",
            "Beli buah di pasar terapung,\nBuahnya segar bikin untung.\nJanganlah kamu suka murung,\nNanti cepat jadi pikun.",
            "Ada katak di dalam tempurung,\nTempurungnya di atas sumur.\nKalau kamu suka berbohong,\nNanti digigit kalajengking.",
            "Pohon kelapa tinggi menjulang,\nNaiknya susah setengah mati.\nKalau cinta sudah bilang,\nJangan biarkan dia pergi.",
            "Makan roti pakai selai,\nMinumnya teh anget-anget.\nNgoding dari pagi sampai selesai,\nDemi bot yang keren banget!"
        ];

        // Ambil satu pantun secara acak
        const randomPantun = pantunList[Math.floor(Math.random() * pantunList.length)];

        console.log(`[Pantun] Mengirim pantun ke ${from}`);
        await sock.sendMessage(from, { text: randomPantun }, { quoted: msg });
    }
};
