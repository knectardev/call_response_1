# Pitch Detection Demo

A web application that performs real-time pitch detection using your microphone input. The app can detect musical notes and their frequencies, and provides a visual representation of the audio input.

## Features

- Real-time pitch detection
- Musical note identification
- Audio visualization
- Adjustable sensitivity settings
- Recording and playback functionality
- Timeline view of recorded notes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:8080`

## Usage

1. Click "Start Recording" to begin pitch detection
2. Sing or play a musical note
3. The app will display the detected frequency and nearest musical note
4. Adjust the sensitivity settings as needed:
   - Microphone Quality: Choose between Low, Medium, or High quality presets
   - Min volume (dB): Minimum volume threshold for detection
   - Min clarity (%): Minimum clarity threshold for pitch detection
   - Min/Max pitch (Hz): Range of frequencies to detect

## Requirements

- Modern web browser with microphone support
- Node.js and npm installed 