import { useEffect, useRef } from "react";

function CanvasComponent({ mediaStream }: any) {

    const canvasRef = useRef<any>(null);
    const AnalyserRef = useRef<any>(null);
    const VolumeHistoryRef = useRef<number[]>([]);
    const AnimationRef = useRef<any>(null);

    useEffect(() => {
        if (mediaStream) {

            const MAX_BARS = 62;
            const BAR_RADIUS = 3;
            const BAR_GAP = 2;

            const audioContext: any = new window.AudioContext();
            const source: any = audioContext.createMediaStreamSource(mediaStream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 128;
            const bufferLength: any = analyser.frequencyBinCount;
            const dataArray: any = new Uint8Array(bufferLength);
            AnalyserRef.current = analyser;
            source.connect(analyser);

            const canvas: any = canvasRef.current;
            const ctx: any = canvas.getContext("2d");
            const canvasWidth: any = canvas.width;
            const canvasHeight: any = canvas.height;
            const barWidth: number = (canvasWidth - (MAX_BARS - 1) * BAR_GAP) / MAX_BARS;

            const DrawRoundRect = (x: number, y: number, width: number, height: number, radius: number) => {
                if (width < (2 * radius)) radius = width / 2;
                if (height < (2 * radius)) radius = height / 2;
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.arcTo(x + width, y, x + width, y + height, radius);
                ctx.arcTo(x + width, y + height, x, y + height, radius);
                ctx.arcTo(x, y + height, x, y, radius);
                ctx.arcTo(x, y, x + width, y, radius);
                ctx.closePath();
                ctx.fill();
            }

            let lastUpdateTime: number = 0;
            let Interval: number = 20;
            let newBarAdded: boolean = false;

            const draw = (timeStamps: any) => {
                if (AnimationRef.current) cancelAnimationFrame(AnimationRef.current);

                AnimationRef.current = requestAnimationFrame(draw);
                const deltaTime: number = timeStamps - lastUpdateTime;
                newBarAdded = false;

                if (deltaTime >= Interval) {
                    lastUpdateTime = timeStamps;
                    AnalyserRef.current.getByteFrequencyData(dataArray);
                    let sumOfSquares: number = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        sumOfSquares += dataArray[i] * dataArray[i];
                    }
                    const rms = Math.sqrt(sumOfSquares / bufferLength);
                    const normalizedVolume: number = rms / 250;
                    VolumeHistoryRef.current.push(normalizedVolume);
                    if (VolumeHistoryRef.current.length > MAX_BARS) {
                        VolumeHistoryRef.current.shift();
                    }
                    newBarAdded = true;
                }
                if (newBarAdded || VolumeHistoryRef.current.length > 0) {
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    ctx.fillStyle = "black";
                    for (let i = 0; i < VolumeHistoryRef.current.length; i++) {
                        const volume: any = VolumeHistoryRef.current[i];
                        const barHeight: any = volume * canvasHeight;
                        const finalBarHeight: any = Math.max(barHeight, 1);
                        const y: any = (canvasHeight - finalBarHeight) / 2;
                        DrawRoundRect(
                            i * (barWidth + BAR_GAP),
                            y,
                            barWidth,
                            finalBarHeight,
                            BAR_RADIUS
                        );
                    }
                }
            }
            AnimationRef.current = requestAnimationFrame(draw);

            return () => {
                cancelAnimationFrame(AnimationRef.current);
                source.disconnect();
                analyser.disconnect();
                audioContext.close();
            }

        }
    }, [mediaStream]);

    return (
        <canvas ref={canvasRef} className="w-full  h-[40px]">
        </canvas>
    )
}

export default CanvasComponent