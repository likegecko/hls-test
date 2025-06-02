"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hlsInstance, setHlsInstance] = useState<any>(null);

  const hlsUrl =
    "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_adv_example_hevc/master.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initializeHLS = async () => {
      try {
        const Hls = (await import("hls.js")).default;

        if (Hls.isSupported()) {
          const hls = new Hls({
            debug: true,
            enableWorker: true,
          });

          hls.loadSource(hlsUrl);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("HLS 매니페스트 로드 완료");
            setIsLoading(false);
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS 에러:", data);
            setError(`HLS 에러: ${data.details}`);
            setIsLoading(false);
          });

          setHlsInstance(hls);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = hlsUrl;
          setIsLoading(false);
        } else {
          setError("이 브라우저는 HLS를 지원하지 않습니다.");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("HLS 초기화 실패:", err);
        setError("HLS 라이브러리 로드 실패");
        setIsLoading(false);
      }
    };

    initializeHLS();

    // 클린업
    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  return (
    <main className="flex flex-col items-center gap-8 pt-6">
      <section className="flex flex-col w-full">
        <h1 className="text-3xl font-bold text-center mb-2">
          HLS 스트리밍 테스트
        </h1>
        <p className="text-gray-400 text-center">Apple 샘플 스트림</p>
      </section>

      <section className="w-full">
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="text-white">스트림 로딩 중...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-75 z-10">
              <div className="text-center p-4">
                <p className="text-red-200 mb-2">⚠️ 에러 발생</p>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            controls
            className="w-full aspect-video"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='24'%3EHLS 스트림%3C/text%3E%3C/svg%3E"
          >
            HLS를 지원하지 않는 브라우저입니다.
          </video>
        </div>

        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            스트림 정보
          </h3>
          <p className="text-xs text-gray-400 break-all">{hlsUrl}</p>
        </div>
      </section>
    </main>
  );
}
