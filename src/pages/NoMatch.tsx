import * as React from "react";
import Link from '@mui/material/Link';

export default function NoMatch() {
  return (
    <div>
      <span>Page not found</span>
      <p>
        <Link href="/">Return to home</Link>
      </p>
    </div>
  );
}