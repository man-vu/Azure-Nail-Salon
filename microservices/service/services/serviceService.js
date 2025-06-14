import { getAllServices, getDesignersForService } from '../models/serviceModel.js';

export function listServices() {
  return getAllServices();
}

export function listDesignersForService(id) {
  return getDesignersForService(id);
}
