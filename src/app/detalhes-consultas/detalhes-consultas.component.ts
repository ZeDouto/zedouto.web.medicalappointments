import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from '../_models/consulta';
import { Hospital } from '../_models/hospital';
import { Medico } from '../_models/medico';
import { Paciente } from '../_models/paciente';
import { ConsultaService } from '../_services/consulta.service';

@Component({
  selector: 'app-detalhes-consultas',
  templateUrl: './detalhes-consultas.component.html',
  styleUrls: ['./detalhes-consultas.component.css']
})
export class DetalhesConsultasComponent implements OnInit {

  detalhesForm: FormGroup;
  paciente: Paciente;
  medico: Medico;
  hospital: Hospital;
  consulta: Consulta;
  id:string;
  receita;

  constructor(    private formBuilder: FormBuilder,
    private consultaService: ConsultaService,
    private router: Router,
    private route: ActivatedRoute) { 

      this.consulta = new Consulta();
      this.paciente = new Paciente();
      this.hospital = new Hospital();
      this.medico = new Medico();
    }

  ngOnInit(): void {
    this.detalhesForm = this.formBuilder.group({
      sintomasApresentados: ['', Validators.required],
      examesRealizados: ['', Validators.required],
    })

    this.route.queryParams.subscribe( parametros => {
      if (parametros['id']) {
        this.recebeConsulta(parametros['id']);
      }
    });
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

  recebeConsulta(id){
  this.consultaService.getId(id).subscribe(data => {
    if(data && data.id){
       this.consulta = data;
      this.paciente = this.consulta.paciente;
      this.medico = this.consulta.medico;
      this.hospital = this.consulta.hospital;
      this.detalhesForm.get('sintomasApresentados').setValue(this.consulta.sintomasApresentados);
      this.detalhesForm.get('examesRealizados').setValue(this.consulta.examesRealizados);
      if(this.consulta.receita) this.receita = this.consulta.receita;
    }
  })
  
  }

  verReceita(){
    window.open(this.receita);
  }

}
