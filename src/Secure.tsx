import * as React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

function Secure() {
  return(
     <Authenticator >
       {({ signOut, user }) => (
         <main>
           <div>Welcome, {user?.username}</div>
         </main>
       )}
     </Authenticator>
  )
 }

export { Secure }