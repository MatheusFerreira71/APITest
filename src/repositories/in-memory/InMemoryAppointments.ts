import { areIntervalsOverlapping } from "date-fns";
import Appointment from "../../entities/Appointment";
import AppointmentRepository from "../appointmentsRepository";

export default class InMemoryAppointmentsRepository implements AppointmentRepository {
  public items: Appointment[] = [];

  public async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  public async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt
        },
        {
          start: appointment.startsAt,
          end: appointment.endsAt
        },
        {
          inclusive: true
        }
      )
    })

    if(!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }
}