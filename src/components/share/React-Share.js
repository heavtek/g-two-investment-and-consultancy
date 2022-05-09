import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";

const ReactShare = ({repoID})=>{
    const iconSize = 45;
    const tobeSharedPage = window.location.href;
    return <div className="row text-center mb-2 mt-2">
      <div >
          <TelegramShareButton className=" social-share-icon mb-1" url={tobeSharedPage}
            title="Share on telegram.."
             >
            <TelegramIcon size={iconSize}/>
          </TelegramShareButton>
          <LinkedinShareButton
          className="  social-share-icon mb-1"
           url={tobeSharedPage}

           title={"Shrare  on Linkedin."}
            >
          <LinkedinIcon  size={iconSize}/>
          </LinkedinShareButton>
          <EmailShareButton title={"Shrare  using Email."}  className="social-share-icon mb-1" url={tobeSharedPage}>
            <EmailIcon size={iconSize}/>
          </EmailShareButton>
          <TwitterShareButton title={"Shrare  on Twiter."}  className=" social-share-icon mb-1" url={tobeSharedPage}>
                <TwitterIcon size={iconSize}/>
          </TwitterShareButton>
          <FacebookShareButton title={"Shrare  on Facebook."} className=" social-share-icon mb-1" url={tobeSharedPage}>
                <FacebookIcon size={iconSize}/>
          </FacebookShareButton>
        
      </div>
    </div>
}

export default ReactShare;