from flask import Flask, request, jsonify, send_file, render_template
import yt_dlp
import os

app = Flask(__name__)

# Ensure the "downloads" directory exists
os.makedirs("downloads", exist_ok=True)

# Route to serve the frontend (index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch available formats
@app.route('/formats', methods=['POST'])
def get_formats():
    url = request.json.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            formats = info.get('formats', [])
            available_formats = []

            for f in formats:
                if f.get('vcodec') != 'none':  # Only include video formats
                    available_formats.append({
                        'format_id': f['format_id'],
                        'resolution': f.get('format_note', 'Unknown'),
                        'ext': f['ext'],
                    })

            return jsonify({"formats": available_formats})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to handle video downloads
@app.route('/download', methods=['POST'])
def download_video():
    url = request.json.get('url')
    format_id = request.json.get('format_id')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    # Platform detection
    if 'facebook.com' in url or 'fb.watch' in url:
        # For Facebook, use the best available format
        format_id = 'bestvideo+bestaudio/best'
    elif not format_id:
        return jsonify({"error": "Format ID is required for non-Facebook URLs"}), 400

    ydl_opts = {
    'format': 'bestvideo+bestaudio/best',
    'outtmpl': 'downloads/%(title)s.%(ext)s',
    'merge_output_format': 'mp4',
    'cookiefile': 'cookies.txt',  # Path to your cookies file
    'verbose': True,  # Enable verbose logging
}

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            file_path = ydl.prepare_filename(info)
            return send_file(file_path, as_attachment=True)
    except yt_dlp.utils.DownloadError as e:
        return jsonify({"error": f"Failed to download video: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
if __name__ == '__main__':
    app.run(debug=True)