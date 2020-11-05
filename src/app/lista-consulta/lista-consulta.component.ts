import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from '../_models/consulta';
import { ConsultaService } from '../_services/consulta.service';

@Component({
  selector: 'app-lista-consulta',
  templateUrl: './lista-consulta.component.html',
  styleUrls: ['./lista-consulta.component.css']
})
export class ListaConsultaComponent implements OnInit {
  displayedColumns = ['paciente', 'medico', 'hospital','data', 'star'];
  dataSource = new MatTableDataSource<Consulta>();
  consultaForm: FormGroup;
  mostrar: boolean;
  esconder: boolean;
  constructor(
    private consultaService: ConsultaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.consultaForm = this.formBuilder.group({
      cpf: ['', Validators.required],
    });
    this.mostrar = false
    this.esconder = false
    this.route.queryParams.subscribe( parametros => {
      if (parametros['cpf']) {
        this.consultaForm.get('cpf').setValue(parametros['cpf']);
        this.buscarPorMedico();
        this.esconder = true;
      }
    });

  }

    
  buscar(){
    this.consultaService.getConsultaByPaciente(this.consultaForm.get('cpf').value).subscribe(data =>{
      if(data){
      this.dataSource = new MatTableDataSource<Consulta>(data);
      this.mostrar = true;
      }
    });
  }

  buscarPorMedico(){
    this.consultaService.getConsultaByMedico(this.consultaForm.get('cpf').value).subscribe(data =>{
      if(data){
      this.dataSource = new MatTableDataSource<Consulta>(data);
      this.mostrar = true;
      }
    });
  }

  selecionarConsulta(consulta: Consulta){
    let params = {'id': consulta.id};
    this.router.navigate(['detalhesConsulta'], {queryParams: params});
  }
}
