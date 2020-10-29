import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() pesquisa: boolean;

  @Input() set recebePaciente(paciente) {
    let pacientes =[];
        pacientes.push(paciente);
        this.dataSource = new MatTableDataSource<Paciente>(pacientes);
  };

  pacienteForm: FormGroup;
  displayedColumns = ['cpf', 'nome'];
  dataSource = new MatTableDataSource<Paciente>();
  mostrar: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private pacienteServcice:  PacienteService
  ) { }

  ngOnInit(): void {
    this.pacienteForm = this.formBuilder.group({
      nome:['', Validators.required],
      cpf: ['', Validators.required]
    })

    if (this.pesquisa) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }

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
