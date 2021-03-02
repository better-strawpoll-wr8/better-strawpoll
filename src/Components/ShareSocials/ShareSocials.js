import React, {userState, useEffect, useState} from 'react'
//Share Button Imports
import {EmailShareButton, EmailIcon, RedditShareButton,RedditIcon, TwitterShareButton, TwitterCount, WorkplaceShareButton, WorkplaceIcon, FacebookShareButton, FacebookIcon} from 'react-share'
import './ShareSocials.scss'


const ShareSocials = (props) => {
    const shareUrl = props.shareUrl
    const title = props.shareUrl

    return(
        <div className='share-socials'>
            <EmailShareButton className='share-buttons' url={shareUrl} subject='Hey! Check this poll out!'>
                <EmailIcon size={32} round />
            </EmailShareButton>
            <RedditShareButton  className='share-buttons' url={shareUrl} subject='Hey! Check this poll out!'>
                <RedditIcon size={32} round />
            </RedditShareButton>
            <WorkplaceShareButton className='share-buttons'  url={shareUrl} subject='Hey! Check this poll out!'>
                <WorkplaceIcon size={32} round />
            </WorkplaceShareButton>
            <FacebookShareButton className='share-buttons'  url={shareUrl} subject='Hey! Check this poll out!'>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
        </div>
    )
}

export default ShareSocials