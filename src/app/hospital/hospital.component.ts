import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Hospital } from '../_models/hospital';
import { HospitalService } from '../_services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  @Output() enviarHospital = new EventEmitter();

  hospitalForm: FormGroup;
  displayedColumns = ['endereco', 'nomeFantasia'];
  dataSource = new MatTableDataSource<Hospital>();

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.hospitalForm = this.formBuilder.group({
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      nomeFantasia: ['', Validators.required]
    });
    this.hospitalForm.valueChanges.subscribe(() => { if (this.hospitalForm.valid) this.enviarHospital.emit(this.hospitalForm.value) })
  }

  get f() { return this.hospitalForm.controls; }


  buscar() {
    this.hospitalService.get(this.hospitalForm.get('cep').value).subscribe(data => {
      if (data) {
        let hospitais = [];
        hospitais.push(data[0]);
        this.dataSource = new MatTableDataSource<Hospital>(hospitais);
        this.enviarHospital.emit(data[0]);
      }
    });
  }
}
