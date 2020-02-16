import React from "react"

const Learn = () => {
  return ( 
    <div className='midway container--m mxa outer p1'>
      <h1>Welcome to 🍻 Midway</h1>
      <p>This Repo houses a Sanity Studio, Gatsby starter, and a Shopify Theme.liquid. Please follow the instructions below for the best expeirence, this is not a vanilla starter, it has some opinions with how you should get startered. If you're struggling of it's not for you, try to steal some of the studio/functions etc and repurpose things your way.</p>
      <div className="callout p1">
        <p className="p0 m0"><span className="bold">Before you start: </span> Please note that the Gatsby theme does not have a working index file, it's named <span className="inline-block pre m0 p0">__index.tsx</span> if you are not going the sanity route for page management please rename the file so you can quickly start the Gatsby instace. I've also commented the env file in favor of running <span className="inline-block pre m0 p0">netlify dev</span> again if this is not your jam please make note of that.</p>
      </div>
    </div>
    )
  }

export default Learn
