import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { of } from 'rxjs';
import { PacienteComponent } from '../paciente/paciente.component';
import { Consulta } from '../_models/consulta';
import { Hospital } from '../_models/hospital';
import { Medico } from '../_models/medico';
import { Paciente } from '../_models/paciente';
import { ConsultaService } from '../_services/consulta.service';
import { HospitalService } from '../_services/hospital.service';

@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.component.html',
  styleUrls: ['./cadastro-consulta.component.css'],
  providers: [DatePipe]
})
export class CadastroConsultaComponent implements OnInit {

  cadastroForm: FormGroup;
  paciente: Paciente;
  medico: Medico;
  hospital: Hospital;
  receita: string;
  consulta: Consulta;

  constructor(
    private formBuilder: FormBuilder,
    private consultaService: ConsultaService,
    private router: Router,

  ) {
    this.consulta = new Consulta();
    this.paciente = new Paciente();
    this.hospital = new Hospital();
  }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      sintomasApresentados: ['', Validators.required],
      examesRealizados: ['', Validators.required]
    })
  }

  onSubmit() {

    this.consulta.paciente = this.paciente;
    this.consulta.medico = this.medico;
    this.consulta.hospital = this.hospital;
    this.consulta.sintomasApresentados = this.cadastroForm.get('sintomasApresentados').value
    this.consulta.examesRealizados = this.cadastroForm.get('examesRealizados').value
    this.consulta.data = formatDate(new Date(), 'yyyy-MM-dd 00:00:00', 'en');
    this.consulta.receita = this.receita;
    console.log(this.consulta);

    this.salvarConsulta(this.consulta);
  }

  recebePaciente(paciente) {
    this.paciente = paciente;
  }

  recebeMedico(medico) {
    this.medico = medico;
  }

  recebeHospital(hospital) {
    this.hospital = hospital;
  }

  recebeReceita(receita){
    console.log('chegou a receita');
    console.log(receita);
    this.receita = receita;
  }

  salvarConsulta(consulta: Consulta) {

    this.consultaService.register(consulta).subscribe(res => {
      if (res) {
        this.router.navigate(['/']);
      }

    });
  }
}
