import TangleID from './tangleid/TangleID';

const tangleid = new TangleID({
  provider_local: process.env.API_HOST,
  provider_swarm: process.env.SWARM_HOST,
});

export default tangleid;
