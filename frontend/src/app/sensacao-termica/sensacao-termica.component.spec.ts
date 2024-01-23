import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensacaoTermicaComponent } from './sensacao-termica.component';

describe('SensacaoTermicaComponent', () => {
  let component: SensacaoTermicaComponent;
  let fixture: ComponentFixture<SensacaoTermicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensacaoTermicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensacaoTermicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
