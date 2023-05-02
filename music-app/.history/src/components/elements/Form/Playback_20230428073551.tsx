import VolumeBar from "./Volumebar";

const Playback = () => {
  const [volume, setVolume] = useState(0.3);
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
