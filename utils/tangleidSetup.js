import TangleID from './tangleid/TangleID';
import LocalExtension from './LocalExtension';

const tangleid = new TangleID({
  provider: process.env.SWARM_HOST,
});

tangleid.use(new LocalExtension({
  provider: process.env.API_HOST,
}));

export default tangleid;
