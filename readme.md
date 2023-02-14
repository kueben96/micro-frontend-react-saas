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