import { Hospital } from './hospital';
import { Medico } from './medico';
import { Paciente } from './paciente';

export class Consulta {
    paciente: Paciente;
    medico: Medico;
    hospital: Hospital;
    data: string;
    sintomasApresentados: string;
    examesRealizados: string;
    
}