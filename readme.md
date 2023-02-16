This application is developed based on the instructions of the Udemy Tutorial "Microfrontends with React: A Complete Developer's Guide" by  Stephen Grider

Setup Info:
- NVM node version 16.18.1
- install vs code drawio extension
- no use of create-react-app or vue CLI because webpack version has no module federation plugin
### Application Overview

1. Marketing App: React
- Home Page
- Pricing Page

2. Authentication App: React
- Sign In Page
- Sign Up Page

3. Dashboard App: Vue
- Dashboard Page

4. Container App: React
- Goal: Providing generic interface point so the the sub applications' framework choice is independent

### Requirements

1. Zero coupling between child projects
- No importing of functions/objects/classes/etc
- No shared state (No redux stores, reducers etc.)
- Shared libraries between MF is ok  (performance reasons, module federation)

2. Near-zero coupling between container and child applications
- Container shouldn't assume that a child is using a particular framework
- Any necessary communication done with callbacks or simple events

3. CSS from one project shouldn't affect another

4. Vesion control (monorepo vs separate) shouldn't have any impact on the overall project
- some people want to use monorepos
- some people want to keep everything in a separate repo

5. Container should be able to decide to always use the latest version of a micro-frontend or a specific version of a micro-frontend
- Container will always use the latest version of a child app (doesn't require a redeploy of container)
- Container can specify exactly what version of a child it wants to use (requires a dedeploy to change) 


### Theory:

- **mount function ** : simple function, that takes in a reference to an html component, generic function to assure zero coupling between container and child projects
- useRef: to create a reference to an html element. Provide the refrence to the mount function

### Deployment

- want to deploy each micro FE independently (including the container)
- location of child app remoteEntry.js files must be known at build time
- Many front-end deployment solutions assume you're deploying a single project - we need something that candle multiple different ones
- probably need a CI/CD pipeline of some sort
- At present, the remoteEntry.js file name is fixed! Need to think about caching issues

#### Workflow for Deploying Container
- Whenever code is pushed to master/main branch and this commit contains a change to the 'container' folder- These commands will be executed in a VM hosted by Github
1. Change into container folder
2. Install dependencies
3. Create a production build using webpack
4. Upload the result to AWS S3

 #### AWS S3 bucket creation

 - create new s3 bucket in console
 - name must be unique
 - leave default settings
 - select the new creeated instance
 - go to properties tab, enable static website hosting
 - go to permissions tab, disable "block public acess"
 - policy generator: enables multiple aws services to talk to each other
 - Policy Type: S3 Bucket Policy
 - Pricipal: *
 - Actions: GetObject
 - Amazon Resource Name: Copy ARN of bucket like ${arn:aws:s3:::saa...}/*
 - Copy generated JSON of policy back to the editor

#### AWS Cloudfront Distribution

In the upcoming lecture, we will be creating our CloudFront distribution. The UI for this service has changed slightly, so, here are some notes to try and avoid confusion:

1. In the video there are two choices, Web and RTMP. Since the RTMP method has been removed, you no longer have to explicitly select Web as it is the default and only delivery method.

2. Distribution settings have been renamed to Settings.

3. The SSL certificate fields look different and no longer show that the default CloudFront certificate is selected. This is ok, the default certificate is still being used and nothing needs to be done or changed.

All other AWS settings and configurations should track what is shown in the videos through sections 7 and 8.

There is an AWS cheatsheet with all steps to create an S3 bucket, CloudFront distribution, and IAM user that will be regularly updated here:

https://www.udemy.com/course/microfrontend-course/learn/lecture/33274448#questions

#### S3 Bucket Creation and Configuration
- Go to AWS Management Console and use the search bar to find S3
  
- Click Create Bucket

- Specify an AWS Region
  
Provide unique Bucket Name and click Create Bucket
  
- Click the new Bucket you have created from the Bucket list.
  
- Select Properties

- Scroll down to Static website hosting and click Edit

- Change to Enable

- Enter index.html in the Index document field

- Click Save changes

- Select Permissions

- Click Edit in Block all public access

- Untick the Block all public access box.

- Click Save changes

- Type confirm in the field and click Confirm

- Find the Bucket Policy and click Edit

- Click Policy generator

- Change Policy type to S3 Bucket Policy

- Set Principle to *

- Set Action to Get Object

- Copy the S3 bucket ARN to add to the ARN field and add /* to the end.
eg: arn:aws:s3:::mfe-dashboard/*

- Click Add Statement

- Click Generate Policy

- Copy paste the generated policy text to the Policy editor

- Click Save changes


#### CloudFront setup
- Go to AWS Management Console and use the search bar to find CloudFront

- Click Create distribution

- Set Origin domain to your S3 bucket

- Find the Default cache behavior section and change Viewer protocol policy to Redirect HTTP to HTTPS

- Scroll down and click Create Distribution

- After Distribution creation has finalized click the Distribution from the list, find its Settings and click Edit

- Scroll down to find the Default root object field and enter /container/latest/index.html

- Click Save changes

- Click Error pages

- Click Create custom error response

- Change HTTP error code to 403: Forbidden

- Change Customize error response to Yes

- Set Response page path to /container/latest/index.html

- Set HTTP Response Code to 200: OK


####  Create IAM user
- Go to AWS Management Console and use the search bar to find IAM

- In IAM dashboard, click Users in the left sidebar

- Click Add Users

- Enter a unique name in the User name field

- In Select AWS credential type tick Access Key - Programmatic access

- Click Next: Permissions

- Select Attach existing policies directly

- Use search bar to find and tick AmazonS3FullAccess and CloudFrontFullAccess

- Click Next: Tags

- Click Next: Review

- Click Create user

#### Add Secrets to Github
- AWS_ACCESS_KEY_ID
- AWS_DISTRIBUTION_ID
- AWS_S3_BUCKET_NAME
- AWS_SECRET_ACCESS_KEY
- PRODUCTION_DOMAIN

### Microfrontend-Specific AWS Config
- Cloudfront doesn't automatically take a look at the changed files in S3 i the files don't have a unique identifier like index.html. The JS files are hashed uniquely, so cloudfront recognizes the change
- **Manual Cache invalidations: **Use latest version of index.html file
- Add Invalidation to Cloudfront Distribution: /container/latest/index.html
- Automatic Cache Invalidation: Add aws command to container.yml