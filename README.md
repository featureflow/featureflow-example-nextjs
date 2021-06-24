This is a simple example of using featureflow in a nextJs Application

It is based on the starter template from [Learn Next.js](https://nextjs.org/learn).

To run the example 

```shell
npm install
npm run dev
```

First we need to override the default app.js - create a file called `_app.js`

Here we wrap our application with the featureflow provider. Featurelflow takes care of creating the client for us.

```javascript
import { withFeatureflowProvider } from 'react-featureflow-client';

const FF_KEY = 'js-env-MY_CLIENT_KEY';

const user = {
    attributes: {
        tier: 'gold',
        country: 'australia',
        roles: ['role1', 'role2']
    }
};

function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}
export default withFeatureflowProvider({
    apiKey: FF_KEY,
    config: {
        offline: false,
        streaming: true,
    },
    user
})(App);
```

Once we have created our featureflow provider instance we can use the featureflow hooks in our application.

We can use the featureflow client evaluate methods, or iterate the evaluated map of features:

There are some examples of using featureflow and the features map in `index.js`:

```javascript
//...
import { useFeatures, useFeatureflow } from 'react-featureflow-client';

const Home = () => {
  const featureflow = useFeatureflow();
  const features = useFeatures();
  //...
  return (
      //...
        <div>
            {feature} value is {featureflow.evaluate(feature).value()}
            {featureflow.evaluate(feature).isOn() && [
                <p key="1">{feature} is on</p>,
            ]}
            {featureflow.evaluate(feature).isOff() && [
                <p key="1">{feature} is off</p>,
            ]}
            <hr></hr>
            {Object.keys(features).map(key => <p key={key}>{key} : {features[key]}</p>)}
        </div>
        //...
```

