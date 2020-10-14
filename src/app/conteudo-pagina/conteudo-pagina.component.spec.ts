import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoPaginaComponent } from './conteudo-pagina.component';

describe('ConteudoPaginaComponent', () => {
  let component: ConteudoPaginaComponent;
  let fixture: ComponentFixture<ConteudoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteudoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteudoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
