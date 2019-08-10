import { ChampionService } from './champion-service';

declare global {
  interface Window { services: Services }
}

type Services = {
  championService: ChampionService;
}

const initializeServices = (): Services => {
  return window.services = {
    championService: new ChampionService()
  }
}

export default window.services || initializeServices();
