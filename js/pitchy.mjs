export class PitchDetector {
    constructor(fftSize) {
        this.fftSize = fftSize;
        this.minPitch = 20;
        this.maxPitch = 2000;
        this.minClarity = 0.95;
    }

    static forFloat32Array(fftSize) {
        return new PitchDetector(fftSize);
    }

    findPitch(input, sampleRate) {
        const autoCorr = this._autoCorrelate(input, sampleRate);
        if (autoCorr === -1) {
            return [null, 0];
        }
        const pitch = sampleRate / autoCorr;
        const clarity = this._getClarity(input, autoCorr, sampleRate);
        return [pitch, clarity];
    }

    _autoCorrelate(input, sampleRate) {
        const SIZE = input.length;
        const MAX_SAMPLES = Math.floor(SIZE / 2);
        let bestOffset = -1;
        let bestCorrelation = 0;
        let rms = 0;
        let foundGoodCorrelation = false;

        // Calculate RMS
        for (let i = 0; i < SIZE; i++) {
            const val = input[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);

        // Skip if signal is too quiet
        if (rms < 0.01) return -1;

        let lastCorrelation = 1;
        for (let offset = 0; offset < MAX_SAMPLES; offset++) {
            let correlation = 0;

            for (let i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs((input[i]) - (input[i + offset]));
            }

            correlation = 1 - (correlation / MAX_SAMPLES);
            if (correlation > 0.9 && correlation > lastCorrelation) {
                foundGoodCorrelation = true;
                if (correlation > bestCorrelation) {
                    bestCorrelation = correlation;
                    bestOffset = offset;
                }
            } else if (foundGoodCorrelation) {
                // Short-circuit if we found a good correlation and then it got worse
                return bestOffset;
            }
            lastCorrelation = correlation;
        }

        if (bestCorrelation > 0.01) {
            return bestOffset;
        }
        return -1;
    }

    _getClarity(input, offset, sampleRate) {
        const SIZE = input.length;
        let correlation = 0;
        const MAX_SAMPLES = Math.floor(SIZE / 2);

        for (let i = 0; i < MAX_SAMPLES; i++) {
            correlation += Math.abs((input[i]) - (input[i + offset]));
        }

        correlation = 1 - (correlation / MAX_SAMPLES);
        return correlation;
    }
} 