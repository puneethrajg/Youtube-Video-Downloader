# Youtube-Video-Downloader

A web application that allows users to download videos from YouTube, Facebook, and Instagram by pasting the video URL. Built with Flask (Python) for the backend and HTML/CSS/JavaScript for the frontend.

---

## Features

- **Multi-Platform Support**: Download videos from YouTube, Facebook, and Instagram.
- **Video Quality Selection**: Choose from available video resolutions (YouTube and Instagram only).
- **Progress Bar**: Real-time progress bar for video downloads.
- **Modern UI**: Clean and user-friendly interface.
- **Error Handling**: Graceful error handling and user-friendly messages.

---

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Libraries**:
  - `yt-dlp`: For downloading videos from YouTube, Facebook, and Instagram.
  - `requests`: For handling HTTP requests (if using third-party APIs).
- **Dependencies**:
  - FFmpeg: For merging video and audio streams.

---

## Installation

### Prerequisites

1. **Python 3.8+**: Ensure Python is installed on your system.
2. **FFmpeg**: Required for merging video and audio streams.
   - Install FFmpeg:
     - **Windows**: Download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html).
     - **macOS**: `brew install ffmpeg`
     - **Linux**: `sudo apt install ffmpeg`

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/video-downloader.git
   cd video-downloader
2. **Set Up a Virtual Environment**:
   ```bash
   python -m venv venv
   venv\Scripts\activate
4. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
6. **Run the Application:**
   ```bash
    python app.py
8. **Access the Application:**
   Open your browser and navigate to **http://127.0.0.1:5000**.


---
**Usage**

1. Paste the Video URL:
    Enter the URL of the video you want to download (YouTube, Facebook, or Instagram).

2. Fetch Available Formats (YouTube and Instagram only):
    Click the "Fetch Formats" button to see available video resolutions.

3. Select Quality:
    Choose the desired video quality from the dropdown menu.

4. Download the Video:
    Click the "Download" button to start the download. The video will be saved to your device.

---
**Notes**
*Facebook Videos:*
  Facebook videos may require cookies for authentication. Export your Facebook cookies using a browser extension like Get      cookies.txt and place the cookies.txt file in the project root.
  
  If yt-dlp fails to download Facebook videos, consider using a third-party API or service.

*Audio Issues:*
  Ensure FFmpeg is installed to merge video and audio streams properly.

---

**Contributing**
Contributions are welcome! If you'd like to contribute, please follow these steps:
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature/YourFeatureName).
  3. Commit your changes (git commit -m 'Add some feature').
  4. Push to the branch (git push origin feature/YourFeatureName).
  5. Open a pull request.

---

**License**
  This project is licensed under the MIT License. See the LICENSE file for details.

---

**Contact**
  For questions or feedback, feel free to reach out:

  **Name:** Puneeth Raj Gorigam

  **Email:** puneethraj400@gmail.com

  **GitHub:** puneethrajg
