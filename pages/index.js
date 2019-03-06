import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Features</h1>
    <ul>
      {props.featureKeys.map((key, index) => (
        <li key={key}>
            {key} is {props.features[key]}
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function({req}) {

    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()
    let features= {};
    let featureKeys = [];
    if( req ){
        features = req.features;
        for (let p in features) {
            if(  features.hasOwnProperty(p) ) {
                featureKeys.push(p);
            }
        }
    }else{
        const res = await fetch('/api/features')
        features = await res.json()
        for (let p in features) {
            if(  features.hasOwnProperty(p) ) {
                featureKeys.push(p);
            }
        }
    }

    console.log(`Evaluated features ${features}`)
    console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data,
    features: features,
    featureKeys: featureKeys
  }
};



export default Index
