# Demask

A real-time deepfake detection browser extension powered by AI.

## Project Overview

Demask is a browser extension that detects deepfake videos in real-time while you browse the web. Using advanced deep learning techniques, Demask analyzes video frames to identify manipulated content and alerts users when deepfakes are detected.

## Architecture

The project consists of three main components:

1. **Browser Extension** - A Chrome/Firefox extension that captures video frames and integrates with web pages
2. **Backend Server** - FastAPI-based server that processes frames and runs the deepfake detection model
3. **Website** - Frontend web application for user dashboard and statistics

## Features

- Real-time deepfake detection while browsing
- Visual overlay warnings on detected deepfake videos
- WebSocket-based communication for low-latency detection
- MesoNet architecture for deepfake classification
- Support for multiple video platforms

## Technical Details

### ML Model

The project uses the MesoNet architecture, which is specifically designed for deepfake detection:

- Meso4 CNN architecture with multiple convolutional layers
- Pre-trained on deepfake datasets
- Optimized for browser-based real-time detection

### Browser Extension

The extension monitors video elements on web pages, captures frames at regular intervals, and sends them to the backend for processing. It provides visual feedback to users when deepfakes are detected.

- Built with React and Vite
- Uses content scripts to interact with web page videos
- WebSocket communication with backend

### Backend

The backend runs the deepfake detection model and processes video frames sent by the extension.

- FastAPI framework for API endpoints
- MesoNet neural network architecture for deepfake detection
- WebSocket server for real-time communication
- TensorFlow/Keras for the ML model implementation

## Setup and Installation

### Backend

1. Navigate to the `backend` directory
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the server:
   ```
   python main.py
   ```

### Extension

1. Navigate to the `extension` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. Load the extension from the `dist` directory in your browser's extension manager

### Website

1. Navigate to the `website` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Future Improvements

- Improve detection accuracy by implementing additional models
- Add support for more browsers
- Implement user feedback mechanism for false positives/negatives
- Add analytics dashboard for detection statistics

## License


## Contributors

parshav92, KetanKumavat, siro844, milinD537