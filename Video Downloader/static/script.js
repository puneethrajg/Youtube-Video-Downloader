let selectedFormatId = '';

function isFacebookUrl(url) {
    return url.includes('facebook.com') || url.includes('fb.watch');
}

async function fetchFormats() {
    const url = document.getElementById('url').value;
    const status = document.getElementById('status');
    const formatSelection = document.getElementById('format-selection');
    const facebookNotice = document.getElementById('facebook-notice');
    const formatDropdown = document.getElementById('format');

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    if (isFacebookUrl(url)) {
        // For Facebook, skip fetching formats
        formatSelection.style.display = 'none';
        facebookNotice.style.display = 'block';
        status.textContent = 'Click Download to fetch the highest quality.';
        return;
    }

    status.textContent = 'Fetching available formats...';

    try {
        const response = await fetch('/formats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch formats');
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        // Populate the format dropdown
        formatDropdown.innerHTML = '';
        data.formats.forEach(format => {
            const option = document.createElement('option');
            option.value = format.format_id;
            option.text = `${format.resolution} (${format.ext})`;
            formatDropdown.appendChild(option);
        });

        // Show the format selection section
        formatSelection.style.display = 'block';
        facebookNotice.style.display = 'none';
        status.textContent = 'Select a quality and click Download.';
    } catch (error) {
        status.textContent = 'Error: ' + error.message;
    }
}

async function downloadVideo() {
    const url = document.getElementById('url').value;
    const formatId = isFacebookUrl(url) ? 'bestvideo+bestaudio/best' : document.getElementById('format').value;
    const downloadBtn = document.getElementById('download-btn');
    const progressBar = document.getElementById('progress-bar');
    const status = document.getElementById('status');

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    // Disable the button during download
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Downloading...';
    progressBar.style.width = '0';
    status.textContent = '';

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, format_id: formatId }),
        });

        if (!response.ok) {
            throw new Error('Failed to download video');
        }

        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length');
        let receivedLength = 0;
        let chunks = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            receivedLength += value.length;

            // Update progress bar
            const progress = (receivedLength / contentLength) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Combine chunks into a single Blob
        const blob = new Blob(chunks);
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        status.textContent = 'Download complete!';
    } catch (error) {
        status.textContent = 'Error: ' + error.message;
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download';
    }
}