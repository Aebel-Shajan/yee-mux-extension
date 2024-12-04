import Youtube from "./Youtube/Youtube";
import { useEffect, useRef } from "react";
import styles from "./CustomIframe.module.css"
import getVideoId from "get-video-id";
import InfoPage from "./InfoPage/InfoPage";

interface CustomIframeProps {
  src: string,
  refreshIframe: boolean,
  setRefreshIframe: CallableFunction,
  fitVideo: boolean
}

const CustomIframe = ({
  src,
  refreshIframe,
  setRefreshIframe,
  fitVideo
}: CustomIframeProps,
) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)


  useEffect(() => {
    if (refreshIframe) {
      const iframe = iframeRef.current
      if (!iframe) return
      iframe.src = ""
      iframe.src = src
      setRefreshIframe(false)
    }
  }, [refreshIframe, setRefreshIframe])

  if (src === "") {
    return (
      <InfoPage />
    )
  }

  if (!isValidUrl(src)) {
    return (
      <div>
        Enter a valid url!
      </div>
    )
  }

  if (
    (src.includes("youtube.com/watch?v=") ||
    src.includes("youtu.be")) &&
    getVideoId(src).id
  ) {
    return <Youtube videoUrl={src} fitVideo={fitVideo} mute={false} />
  }

  return (
    <>
    <iframe
      allow="nested-history 'none'"
      ref={iframeRef}
      className={styles.iframe}
      src={src} />
    </>
  )
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}


export default CustomIframe;