import championService, { ChampionService } from './champion-service';

declare global {
  interface Window { services: Services }
}

/**
 * Only add stateful services here!
 * Stateless services can be imported directly.
 */
type Services = {
  championService: ChampionService;
}

const initializeServices = (): Services => {
  return window.services = {
    championService: championService
  }
}

export default window.services || initializeServices();
