import styles from "./InfoPage.module.css"

const InfoPage = () => {
  return (
    <div
      className={styles.messageContainer}
    >
      <div
        className={styles.message}
      >
            <details name="help">
          <summary>List of iframe friendly sites:</summary>
          Right click {">"} "open in sidepanel"
          <ul>
            <li>
              <a
                href="https://notepad-online.com/en/"
                target="_blank">
                Notes
              </a>
            </li>
            <li>
              <a
                href="https://discovertube.xyz"
                target="_blank">
                Discover tube (for yt vids)
              </a>
            </li>
            <li>
              <a
                href="https://www.wikipedia.org/"
                target="_blank">
                Wikipedia
              </a>
            </li>
            <li>
              <a
              href="https://www.clockfaceonline.com/clocks/digital/"
              target="_blank">
                Clock
              </a>
            </li>
            <li>
              <a
              href="https://www.worldweatheronline.com/country.aspx"
              target="_blank">
                Weather
              </a>
            </li>
          </ul>
        </details>
        <details name="help">
          <summary>How do I use this extension?</summary>
          <div>
            Through context menu:
            <ol>
              <li>Go to any website, or hover over a link.</li>
              <li>Right click to open the context menu.</li>
              <li>Press "Open website/link in sidepanel".</li>
              <li>The sidepanel should open and the website should be loaded in a panel.</li>
            </ol>
            or
            <ol>
              <li>Enter the url of the website at the top of a panel</li>
              <li>Press enter</li>
            </ol>
          </div>
        </details>

        <details name="help">
          <summary>I can't open websites like reddit, youtube or google in the panels.</summary>
          <div>
            Due to how iframe and cors work, this is disabled by default. There is a way
            to enable these websites through an extension called -
            <a
              href="https://chromewebstore.google.com/detail/hiframe-the-hyper-iframe/joibipdfkleencgfgbbncoheaekffdfn"
              target="_blank"
            >
              HiFrame.
            </a>
          </div>
        </details>
      </div>
    </div>
  );
}

export default InfoPage;