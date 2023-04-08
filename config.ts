import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const cdnSrc = ["stackpath.bootstrapcdn.com", "cdnjs.cloudflare.com"];
const app = APP.express;

/* JSON Bodyparse */; app.use(APP._express.json());
/* Encode URL parse */; app.use(bodyParser.urlencoded({ extended: true }));
/* CORS trust Frontend */; app.use(cors({ origin: `${APP.ipAddress}${APP.portFE != 80 && ':' + APP.portFE}` /* GlobalApp url */, credentials: true }));
/* Helmet */; app.use(helmet());
/* CSP */; app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["*"], scriptSrc: ["'self'", (req: any, res: any) => `'nonce-${res.locals.cspNonce}'`].concat(cdnSrc) } }));