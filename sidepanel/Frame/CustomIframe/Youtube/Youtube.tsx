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

  let embedUrl = `https://www.youtube.com/embed/${videoId}?mute=${mute ? "1" : "0"}&enablejsapi=1`

  if (videoUrl.includes("&list=")) {
    const playlistId = getTextAfterSearchString(videoUrl, "&list=")
    embedUrl = `https://www.youtube.com/embed/?listType=playlist&autoplay=1&loop=1&list=${playlistId}`
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
          src={embedUrl}
        />
      </div>
    </div>

  );
}


function getTextAfterSearchString(text, searchString) {
  // Find the position of the search string
  const index = text.indexOf(searchString);
  
  // If the search string is not found, return an empty string or handle accordingly
  if (index === -1) {
      return ""; // or throw an error, depending on your use case
  }
  
  // Extract the text after the search string
  return text.substring(index + searchString.length);
}

export default forwardRef(Youtube);