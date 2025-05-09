const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

function mergeAdjacentNotes(events, freqTolerance = 5, gapTolerance = 0.1) {
    if (events.length === 0) return [];
    const merged = [events[0]];
    for (let i = 1; i < events.length; i++) {
        const prev = merged[merged.length - 1];
        const curr = events[i];
        if (
            curr.note === prev.note &&
            Math.abs(curr.frequency - prev.frequency) < freqTolerance &&
            (curr.startTime - prev.endTime) < gapTolerance
        ) {
            // Merge: extend previous note
            prev.endTime = curr.endTime;
            prev.duration = prev.endTime - prev.startTime;
        } else {
            merged.push(curr);
        }
    }
    return merged;
}