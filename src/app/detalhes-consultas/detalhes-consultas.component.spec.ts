import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesConsultasComponent } from './detalhes-consultas.component';

describe('DetalhesConsultasComponent', () => {
  let component: DetalhesConsultasComponent;
  let fixture: ComponentFixture<DetalhesConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
