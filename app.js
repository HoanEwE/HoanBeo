async function downloadMusic() {
    const input = document.getElementById('linkInput').value;
    const status = document.getElementById('status');

    if (!input) {
        status.textContent = "Vui lòng nhập link!";
        return;
    }

    status.textContent = "Đang xử lý...";

    try {
        const response = await fetch('https://tiktok-scraper7.p.rapidapi.com/music/posts', {
            method: 'GET',
            headers: {
                'X-Rapidapi-Key': '2b10a67b8amsh7ad2cdd8ef9beeap1d7deajsn793fc2e953d2',
                'X-Rapidapi-Host': 'tiktok-scraper7.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            throw new Error("Không thể tải liên kết.");
        }

        const data = await response.json();
        const downloadUrl = data?.music_url; // Thay `music_url` bằng tên chính xác nếu khác

        if (downloadUrl) {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'music.mp3'; // Tên file tải về
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            status.textContent = "Tải xuống thành công!";
        } else {
            throw new Error("Không tìm thấy liên kết nhạc.");
        }
    } catch (error) {
        status.textContent = error.message;
    }
}