import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from '../_models/paciente';
import { PacienteService } from '../_services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent implements OnInit {

  @Output() enviarPaciente = new EventEmitter();

  pacienteForm: FormGroup;
  displayedColumns = ['cpf', 'nome'];
  dataSource = new MatTableDataSource<Paciente>();

  constructor(
    private formBuilder: FormBuilder,
    private pacienteServcice:  PacienteService
  ) { }

  ngOnInit(): void {
    this.pacienteForm = this.formBuilder.group({
      nome:['', Validators.required],
      cpf: ['', Validators.required]
    })
  }
  
  get f() { return this.pacienteForm.controls; }

  buscar(){
    this.pacienteServcice.get(this.pacienteForm.get('cpf').value).subscribe( data => {
      if(data && data.cpf){
        let pacientes =[];
        pacientes.push(data);
        this.dataSource = new MatTableDataSource<Paciente>(pacientes);
        this.enviarPaciente.emit(data)
      }
    });
  }
}
