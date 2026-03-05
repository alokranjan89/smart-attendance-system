import React, { useRef, useEffect } from "react";

const CameraPreview = () => {

  const videoRef = useRef(null);

  useEffect(() => {

    async function startCamera() {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (err) {
        console.error("Camera access denied", err);
      }

    }

    startCamera();

  }, []);

  return (

    <div>

      <p className="text-sm text-gray-500 mb-2">
        Face recognition camera
      </p>

      <div className="relative bg-black rounded-xl overflow-hidden shadow w-full max-w-[320px]">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full aspect-square object-cover"
        />

        <div className="absolute border-4 border-green-400 w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg"></div>

      </div>

    </div>

  );

};

export default CameraPreview;