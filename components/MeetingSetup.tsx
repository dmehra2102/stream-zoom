"use client";

import React, { useEffect, useState } from "react";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

interface Props {
  setIsSetupComplete: (val: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: Props) => {
  const call = useCall();
  const [isMicCamToggled, setIsMicCamToggled] = useState<boolean>(false);

  if (!call) {
    throw new Error("useCall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.microphone, call.camera]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input type="checkbox" checked={isMicCamToggled} onChange={(e) => setIsMicCamToggled(e.target.checked)} />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
