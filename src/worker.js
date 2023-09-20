const crypto = require('crypto');

// Konfigurasi blockchain
const targetDifficulty = 4; // Jumlah nol yang diperlukan di awal hasil hash
const reward = 10; // Hadiah penambangan
const rewardAddress = '008267756274f15ca78e7661e52c20f8236b91f76a34fddeb3';

// Fungsi untuk melakukan proof of work
function mineBlock(data, targetDifficulty) {
    let nonce = 0;
    let timestamp = Date.now();
    let hash = '';

    while (hash.substring(0, targetDifficulty) !== '0'.repeat(targetDifficulty)) {
        nonce++;
        timestamp = Date.now();
        const input = `${data}${nonce}${timestamp}`;
        hash = crypto.createHash('sha256').update(input).digest('hex');
    }

    return { nonce, timestamp, hash };
}

// Fungsi untuk mengirim hadiah ke alamat dompet
function sendReward(address, amount) {
    console.log(`Mengirim ${amount} koin ke alamat dompet ${address}`);
    // Di dunia nyata, ini akan melibatkan transaksi yang sesungguhnya ke alamat dompet
}

// Fungsi untuk penambangan berulang-ulang
function startMining() {
    console.log('Memulai penambangan...');
    const blockData = 'Data transaksi';

    setInterval(() => {
        const minedBlock = mineBlock(blockData, targetDifficulty);
        console.log('Hasil Penambangan:');
        console.log('Nonce:', minedBlock.nonce);
        console.log('Waktu yang Dibutuhkan (ms):', minedBlock.timestamp - Date.now());
        console.log('Hash:', minedBlock.hash);

        // Setelah berhasil menambang, kita mengirim hadiah ke alamat dompet
        sendReward(rewardAddress, reward);
    }, 10000); // Penambangan setiap 10 detik (sesuaikan sesuai kebutuhan)
}

// Memulai penambangan
module.exports = { startMining }

