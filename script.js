// Ganti dengan API key Anda dari numverify.com
const API_KEY = 'YOUR_NUMVERIFY_API_KEY'; // API key dari NumVerify

document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    if (!phoneNumber) {
        alert('Masukkan nomor telepon!');
        return;
    }

    // Hapus karakter non-digit kecuali +
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');

    fetch(`https://apilayer.net/api/validate?access_key=${API_KEY}&number=${cleanNumber}&format=1`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.valid) {
                resultDiv.innerHTML = `
                    <h2>Informasi Nomor Telepon</h2>
                    <p><strong>Nomor:</strong> ${data.international_format}</p>
                    <p><strong>Negara:</strong> ${data.country_name} (${data.country_code})</p>
                    <p><strong>Lokasi:</strong> ${data.location || 'Tidak tersedia'}</p>
                    <p><strong>Operator:</strong> ${data.carrier || 'Tidak tersedia'}</p>
                    <p><strong>Tipe:</strong> ${data.line_type || 'Tidak tersedia'}</p>
                `;
            } else {
                resultDiv.innerHTML = '<p>Nomor telepon tidak valid atau tidak ditemukan.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = '<p>Terjadi kesalahan saat mengambil data. Periksa koneksi internet atau API key.</p>';
        });
});
