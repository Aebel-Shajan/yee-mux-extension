import Youtube from "./Youtube/Youtube";
import { useEffect, useRef } from "react";
import styles from "./CustomIframe.module.css"
import getVideoId from "get-video-id";
import InfoPage from "./InfoPage/InfoPage";

interface CustomIframeProps {
  src: string,
  refreshIframe: boolean,
  setRefreshIframe: CallableFunction,
  fitVideo: boolean,
  changeUrl: CallableFunction
}

const CustomIframe = ({
  src,
  refreshIframe,
  setRefreshIframe,
  fitVideo,
  changeUrl
}: CustomIframeProps,
) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)


  useEffect(() => {
      const iframe = iframeRef.current
      if (!iframe) return
      open(src, iframe)
  }, [src])

  if (src === "") {
    return (
      <InfoPage changeUrl={changeUrl}/>
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
      ref={iframeRef}
      className={styles.iframe}
      />
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


const open = async (currenturl: string, iframe: HTMLIFrameElement) => {
  console.log("yoo")
  const DNR_MODIFY_HEADERS = 'modifyHeaders' as chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS;
  const DNR_REMOVE = 'remove' as chrome.declarativeNetRequest.HeaderOperation.REMOVE;
  chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: DNR_MODIFY_HEADERS,
          responseHeaders:
            [
              {
                header: 'x-frame-options',
                operation: DNR_REMOVE,
              },
              {
                header: 'content-security-policy',
                operation: DNR_REMOVE,
              },
            ],
        }, condition: {
          urlFilter: '*',
          resourceTypes: [
            'main_frame' as chrome.declarativeNetRequest.ResourceType,
            'sub_frame' as chrome.declarativeNetRequest.ResourceType,
            'xmlhttprequest' as chrome.declarativeNetRequest.ResourceType,
            'websocket' as chrome.declarativeNetRequest.ResourceType,
          ],
        },
      },
    ],
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error updating rules:', chrome.runtime.lastError.message,);
    } else {
      console.log('Rules updated successfully');
      if (iframe) {
        iframe.src = currenturl;
      }
    }
  },
  );
};