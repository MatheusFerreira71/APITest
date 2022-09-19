import Appointment from "../entities/Appointment";

export default interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>;
}