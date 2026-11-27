import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaCurtidas } from './tela-curtidas';

describe('TelaCurtidas', () => {
  let component: TelaCurtidas;
  let fixture: ComponentFixture<TelaCurtidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCurtidas],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaCurtidas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
