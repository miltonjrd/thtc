import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { INTRO_AUDIO_SECONDS, IntroAudio } from "./intro-audio";

describe("Intro audio playback", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => { cleanup(); vi.restoreAllMocks(); });

  it("waits for user interaction before enabling audio", async () => {
    const { container } = render(<IntroAudio />);
    const audio = container.querySelector("audio");
    expect(audio?.muted).toBe(true);
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Ligar áudio" }));
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1));
    expect(audio?.muted).toBe(false);
  });

  it("turning off audio silences and rewinds it", async () => {
    const { container } = render(<IntroAudio />);
    const audio = container.querySelector("audio");
    if (!audio) throw new Error("Missing audio player");
    fireEvent.click(screen.getByRole("button", { name: "Ligar áudio" }));
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1));
    audio.currentTime = 1.5;
    fireEvent.click(screen.getByRole("button", { name: "Desligar áudio" }));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(audio.muted).toBe(true);
    expect(audio.currentTime).toBe(0);
  });

  it("limits playback to exactly 3 seconds without stopping earlier", () => {
    const { container } = render(<IntroAudio />);
    const audio = container.querySelector("audio");
    if (!audio) throw new Error("Missing audio player");
    expect(INTRO_AUDIO_SECONDS).toBe(3);
    audio.currentTime = 2.99;
    fireEvent.timeUpdate(audio);
    expect(HTMLMediaElement.prototype.pause).not.toHaveBeenCalled();
    audio.currentTime = 3;
    fireEvent.timeUpdate(audio);
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
  });

  it("stops playback when the player unmounts", () => {
    const { unmount } = render(<IntroAudio />);
    fireEvent.click(screen.getByRole("button", { name: "Ligar áudio" }));
    unmount();
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
  });
});