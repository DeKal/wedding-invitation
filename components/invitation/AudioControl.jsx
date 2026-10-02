// Music toggle control (top-corner spinning disc). Its behaviour — autoplay,
// resume on first interaction, play/pause toggle — is wired in
// useInvitationBehaviour by querying this markup.
export default function AudioControl() {
  return (
    <>
      <div id="audio-control-wrapper" className="jsx-3522513885 cursor-pointer">
        <div className="jsx-3522513885 audio-toggle ">
          <img src="/assets/images/decor/audio-1.png" alt="music icon" className="jsx-3522513885 music-icon" />
          <div className="jsx-3522513885 icon-cancel">
            <div className="jsx-3522513885 icon-line"></div>
          </div>
        </div>
      </div>
      <audio src="/assets/images/audio/d525d3a7-334b-4bef-847f-23a0c5abbac6.mp3" loop preload="auto" />
    </>
  );
}
