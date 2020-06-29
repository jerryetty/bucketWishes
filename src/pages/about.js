import React from "react"
import { Typography } from "@material-ui/core"
import Header from "components/ui/header"

const About = props => {
  return (
    <>
    <Header {...props} />
      <div className="mt-5">
        <Typography variant="h4" color="secondary" align="left" className="w-5">
          Who we are
        </Typography>
      </div>
      <div className="mt-3">
        <Typography variant="body1" color="primary" align="justify">
          Bucket Wishes is a service provided by Eagle’s Nest Wilderness Ranch
          (ENWR) which is a 501-c- 3 non-profit, privately funded Christian
          ranch providing individual family style homes for children who have
          been orphaned, abused, abandoned, neglected or are homeless. We will
          be located on a working cattle and horse ranch in the beautiful
          mountains in Grand County, CO. <br />
          <br /> There, children who exhibit mild to moderate behavioral issues
          due to past family and environmental circumstances will find
          permanent, loving Christian homes. Every child possesses an inherent
          need to belong and be a part of a family who provides love, guidance
          and protection. Each home will be staffed by a couple who will serve
          as “Houseparents,” providing a stable, long-term family environment as
          opposed to short-term or revolving placement. Children will also have
          the opportunity to learn about compassion and responsibility while
          giving them a sense of purpose as they live on a working cattle and
          horse ranch and assist with ranch operations. Equine-assisted
          therapies, opportunities to participate in sports, recreational
          activities, music, art, 4-H, etc will all be offered providing fun
          experiences while also aiding in the healing process.
          <br />
          <br /> This is a new model of caring for children in Colorado. It is
          one based upon providing permanency with a life-long family and place
          to call home. We will serve as an alternative to Foster care by taking
          in children who will most likely never be able to return home due to
          the parents or guardians being unable to care for their children. This
          will help provide permanency and stability for these children rather
          than having to move them from home to home until they age out of the
          foster care system. It is our plan to raise the children who come to
          live with us to adulthood.
          <br />
          <br /> If you enjoyed your experience with Bucket Wishes, please
          consider going to the Donate Page and making a donation to Eagle’s
          Nest Wilderness Ranch to help us help a child by: Renewing their Hope.
          Rebuilding their Dreams. Restoring their Futures. Impacting future
          Generations…one life at a time.
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="secondary" align="left" className="w-5">
          Story behind Bucket Wishes
        </Typography>
      </div>
      <div className="mt-3 mb-5">
        <Typography variant="body1" color="primary" align="justify">
          It was called the “Best High School Prank Ever!”. A High School Senior
          went to her principle and gave him a five gallon bucket. She asked him
          to stand at a designated spot in the hall way at a specified time
          holding the bucket. The principle was very suspect of being set up for
          a Senior prank, but his curiosity got the best of him and he decided
          to do as she had asked. When the bell rang for changing classes,
          students began filing by and putting slips of paper into his bucket.
          When the next bell rang and the hall was empty, the principle had a
          bucket full of these slips of paper. He took the bucket back to his
          office and dumped the pieces of paper on his desk. He began reading
          the slips and read comments such as these: “Thank you for being there
          when my Dad passed away.” “Thank you for making our school a safe
          place.” “Thank you for encouraging me I was struggling with life
          issues.” ETC. The principle was so overwhelmed by the outpouring of
          support that he sat down and cried. He said that now he knows why he
          does the job that he does in working with young people in the school
          setting.
          <br />
          <br /> As a result of this story, God gave us the idea of providing
          this opportunity for others to “create buckets” for their family,
          friends and those in other parts of the country and world that they’d
          like to encourage by letting them know how much they’re thought of,
          cared for and loved. We have provided ideas for buckets that you might
          like to create, but we’ve also given you the opportunity to create a
          “custom bucket” for things that may not fit into these categories. So
          we encourage you to “think outside of the bucket” and have FUN finding
          ways to encourage those around you!
        </Typography>
      </div>
    </>
  )
}

export default About
