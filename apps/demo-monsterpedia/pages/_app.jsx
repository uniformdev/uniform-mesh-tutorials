import '../styles/globals.css'

import { UniformContext } from "@uniformdev/context-react";
import { Context } from "@uniformdev/context";

//
//Adding UniformContext is a work-around for a bug in v15.0.0
//that requires the context be available in order for Canvas
//to run, even if no Uniform Context functionality is used.
const context = new Context({
  manifest: { 
    project: {
      id: process.env.NEXT_PUBLIC_UNIFORM_PROJECT_ID,
    }
  }
});

function MyApp({ Component, pageProps }) {
  //
  //Adding UniformContext is a work-around for a bug in v15.0.0
  //that requires the context be available in order for Canvas
  //to run, even if no Uniform Context functionality is used.
  return (
    <UniformContext context={context}>
      <Component {...pageProps} />
    </UniformContext>
  );
}

export default MyApp;