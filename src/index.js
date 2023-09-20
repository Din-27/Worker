const net = require('net');
const crypto = require('crypto');
const { startMining } = require('./worker');

// Konfigurasi pool penambangan
const POOL_HOST = '127.0.0.1'; // Ganti dengan alamat host pool yang sesuai
const POOL_PORT = 8888; // Ganti dengan port pool yang sesuai
const WALLET_ADDRESS = '008267756274f15ca78e7661e52c20f8236b91f76a34fddeb3'; // Ganti dengan alamat dompet Anda
const WORKER_NAME = 'test'; // Ganti dengan nama penambang Anda

// Fungsi untuk menghubungkan ke pool penambangan
function connectToPool() {
    const socket = net.connect(POOL_PORT, POOL_HOST, () => {
        console.log(`Terhubung ke pool penambangan ${POOL_HOST}:${POOL_PORT}`);

        // Mengirim pesan login ke pool
        const loginMessage = {
            id: 1,
            method: 'login',
            params: {
                login: WALLET_ADDRESS,
                pass: WORKER_NAME,
            },
        };
        socket.write(JSON.stringify(loginMessage) + '\n');
    });

    // Event listener saat menerima data dari pool
    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log(`Pesan dari pool: ${message}`);

        // Tanggapi pesan yang diterima dari pool sesuai dengan protokol pool penambangan yang sesuai
        // Anda perlu mengimplementasikan logika penambangan yang sesuai di sini.
    });

    // Event listener saat koneksi ditutup
    socket.on('end', () => {
        console.log('Koneksi ke pool ditutup');
    });
}

// Memulai penambangan dengan menghubungkan ke pool
startMining()
connectToPool();