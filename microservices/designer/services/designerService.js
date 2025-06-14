import { getAllDesigners, getServicesForDesigner, getAvailableAppointmentsForDesigner } from '../models/designerModel.js';

export function listDesigners() {
  return getAllDesigners();
}

export function listDesignerServices(id) {
  return getServicesForDesigner(id);
}

export function listDesignerSlots(id) {
  return getAvailableAppointmentsForDesigner(id);
}
