import Modal from "~sidepanel/Modal/Modal";
import styles from "./HelpPage.module.css";

interface HelpPageProps {
  onClose: CallableFunction
}

const HelpPage = (
  {
    onClose
  }: HelpPageProps
) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.helpPageContainer}>
        <h1>Help / FAQ</h1>
        <div className={styles.detailsContainer}>

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
            <summary>The website is not showing in the sidepanel</summary>
            <div>
              With the sidepanel open try right clicking and opening the website again.
              If that does not work try submitting feedback with the feedback button.
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
          <details name="help">
            <summary>This extension is awesome 🤩</summary>
            <div>
              I agree.
              <a
              href="https://www.yeemux.com"
              target="_blank"
              >                
               Feel free to write a review. 
              </a> 
              <br/>
              Also check out some of my other extensions:
              <ul>
                <li>
                  <a
                  href="https://chromewebstore.google.com/detail/chat-gpt-scroll-map/apekbedjllgmacohbcckgipfhjddehkf"
                  target="_blank"
                  >Chatgpt scroll map</a>: Adds a minimap to chatgpt
                </li>
                <li>
                  <a
                  href="https://chromewebstore.google.com/detail/subway-surfers-screen-rea/jcijfneifjnhbgahlokgkmpcnocgpegd"
                  target="_blank"

                  >Brain rot reader</a>: Screen reader but with integrated subway surfers playing in the background
                </li>
              </ul>

              <a
                href="https://github.com/Aebel-Shajan"
                target="_blank"
              >
                Follow me on github 🐙😺 tooo
              </a>
            </div>
          </details>
          <details name="help">
            <summary>This extension sucks!!! 😠</summary>
            <div>
              I am trying my best 😭. If its broken please press the give feedback button and describe the issue. Thanks 🙏.
              If you have any ideas on how to improve it, I would love to hear them too.
            </div>
          </details>
          <details name="help">
            <summary>Why make this?</summary>
            <div>
              I was having trouble with procrastination 😞. I would spend hours watching youtube shorts/ instagram on my phone ☹️.
              With this extension I can watch tiktok, youtube, instagram all at the same time without having to look at my phone. Problem solved 😀
            </div>
          </details>
        </div>
      </div>
    </Modal>
  );
}

export default HelpPage;