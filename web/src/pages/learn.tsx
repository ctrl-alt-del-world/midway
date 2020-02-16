import React from "react"
import cx from 'classnames'


const Learn = ({ transitionStatus }) => {
  return ( 
    <div className={cx('midway container--m animate__page mxa outer p1', transitionStatus)}>
      <h1>Welcome to 🍻 Midway</h1>
      <p>This Repo houses a Sanity Studio, Gatsby starter, and a Shopify Theme.liquid. Please follow the instructions below for the best expeirence, this is not a vanilla starter, it has some opinions with how you should get startered. If you're struggling of it's not for you, try to steal some of the studio/functions etc and repurpose things your way.</p>
      <div className="callout p1 mb1">
        <p className="p0 m0"><span className="bold">Before you start: </span> Please note that the Gatsby theme does not have a working index file, it's named <span className="inline-block pre m0 p0">__index.tsx</span> if you are not going the sanity route for page management please rename the file so you can quickly start the Gatsby instace. I've also commented the env file in favor of running <span className="inline-block pre m0 p0">netlify dev</span> again if this is not your jam please make note of that.</p>
      </div>
      <hr />
      <h2>
        Start with Sanity!
      </h2>
      <p className="bold">For the best experinece, let's start with Sanity:</p>
      <ol>
        <li>In the <span className="pre">studio</span> folder run <span className="pre">sanity init</span> and create a new project.</li>
        <li>Update <span className="pre">studio/sanity.json</span> and update the Project ID.</li>
        <li>Update the studio name in <span className="pre">studio/package.json</span>.</li>
        <li>Edit schemas, add different content types, find out more here: <a href="https://www.sanity.io/docs/sanity-studio">Sanity Docs</a></li>
        <li>Include these schemas in the <span className="pre">deskStructure.js</span> export (include a fun icon!)</li>
      </ol>
      <p>From here, you're going to want to create some content. You will notice you have the ability to create <span className="pre">Pages</span> but not <span className="pre warning">Products</span>. My convention is that for <span className="pre">Products</span>  those should always be managed by Shopify. Not everyone agrees with that, but that is the system I follow. The clicent can create/edit/manage initial Products in Shopify. Then using the Sync which we will explain in a bit, that information is saved into Shopify. But we don't need to worry about that just yet.</p>
      <h3>Create a Home page that will serve as your Index file</h3>
      <p>In the <span className="pre">gatsby-node.js</span> file you'll notice in my pageCreate I check for a slug of <span className="pre">home</span>. This creates a root file in our Gatsby build process. In order to get the Gatsby index running correctly I suggest you create a new page and give it a slug of <span className="pre">home</span> or whatever you'd like just make sure you udpate it in the <span className="pre">gatsby-node.js</span> file before running the dev process for Gatsby.</p> 
    </div>
    )
  }

export default Learn
