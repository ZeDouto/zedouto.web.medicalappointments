import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  
  @Input() pesquisa: boolean;

  @Input() set recebeMedico(medico) {
    let medicos =[];
    medicos.push(medico);
    this.dataSource = new MatTableDataSource<Medico>(medicos);
  };

  medicoForm: FormGroup;
  displayedColumns = ['cpf', 'nome', 'especialidade', 'crm'];
  dataSource = new MatTableDataSource<Medico>();
  mostrar:boolean;

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

    if(this.pesquisa){
      this.mostrar = false;
    }else{
      this.mostrar = true;
    }
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
