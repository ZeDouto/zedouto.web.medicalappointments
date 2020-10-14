import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from '../_models/medico';
import { MedicoService } from '../_services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  @Output() enviarMedico = new EventEmitter();
  
  medicoForm: FormGroup;
  displayedColumns = ['cpf', 'nome', 'especialidade', 'crm'];
  dataSource = new MatTableDataSource<Medico>();

  constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.medicoForm = this.formBuilder.group({
      nome:['', Validators.required],
      cpf: ['', Validators.required],
      especialidade:['', Validators.required],
      crm: ['', Validators.required]
    })
  }

  get f() { return this.medicoForm.controls; }


  buscar(){
    this.medicoService.get(this.medicoForm.get('cpf').value).subscribe( data => {
      if(data && data.cpf){
        let medicos =[];
        medicos.push(data);
        this.dataSource = new MatTableDataSource<Medico>(medicos);
        this.enviarMedico.emit(data)
      }
    });
  }
}
