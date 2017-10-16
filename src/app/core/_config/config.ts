// URL should be parameter initialized
import * as CONFIG_PATHS from '../../../assets/json_files/config/configPaths.json';

function getEnvironment(env) {
  switch (env) {
    case 'development': {
      return CONFIG_PATHS.SERVERS.development;
    }
    case 'testing': {
      return CONFIG_PATHS.SERVERS.testing;
    }
    case 'staging': {
      return CONFIG_PATHS.SERVERS.staging;
    }
    case 'production': {
      return CONFIG_PATHS.SERVERS.production;
    }
    default: {
      return CONFIG_PATHS.SERVERS.default;
    }
  }
}
const hostURL = getEnvironment(ENV);
function findAndReplace(object, value, replacevalue) {
  for (let x in object) {
    if (object[x]) {
      object[x] = object[x].replace('##HOST##', hostURL);
    }
  }
  return { urls: object };
}
export const CONFIG = findAndReplace(CONFIG_PATHS.URLS, '##HOST##/', hostURL);
