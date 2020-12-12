import { injectGlobal } from 'styled-components';

injectGlobal`
html, body {
  height: 100%;
}

body, h1, h2, h3, h4, h5, h6, p, ul, ol, li, a {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#root {
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

ul, ol, li {
  list-style: none;
}
`;