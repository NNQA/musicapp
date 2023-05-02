import VolumeBar from "./Volumebar";

const Playback = () => {
  return (
    <div className="px-[36px]">
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};
export default Playback;
