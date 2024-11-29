import { forwardRef, useState } from "react";
import styles from "./Youtube.module.css";
import getVideoId from 'get-video-id';

interface YoutubeProps {
  videoUrl: string,
  mute: boolean,
  fitVideo: boolean
}

const Youtube = (
  {
    videoUrl,
    mute,
    fitVideo
  }: YoutubeProps, ref: React.ForwardedRef<HTMLIFrameElement>) => {
  const videoId: string | undefined = getVideoId(videoUrl).id
  const [mouseOver, setMouseOver] = useState(false);
  if (!videoId) {
    return <div>video id not found</div>
  }

  return (
    <div
      className={styles.iframeContainerContainer}>
      <div
        className={styles.iframeContainer}>

        <iframe
              onMouseEnter={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
          className={!fitVideo || mouseOver?  styles.iframe : styles.iframeContained }
          ref={ref}
          id="video"
          src={`https://www.youtube.com/embed/${videoId}?mute=${mute ? "1" : "0"}&enablejsapi=1`}
        />
      </div>
    </div>

  );
}

export default forwardRef(Youtube);