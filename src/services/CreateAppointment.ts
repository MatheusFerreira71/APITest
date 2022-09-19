import Appointment, { AppointmentProps } from "../entities/Appointment";
import AppointmentRepository from "../repositories/appointmentsRepository";

type CreateAppointmentRequest = AppointmentProps;

type CreateAppointmentResponse = Appointment;

export default class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endsAt);

    if(overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates');
    }
    
    const appointment = new Appointment({
      customer,
      endsAt,
      startsAt
    });

    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}