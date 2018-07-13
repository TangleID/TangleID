import TangleID from './tangleid/TangleID';

const tangleid = new TangleID({
  provider: process.env.API_HOST,
});

export default tangleid;
