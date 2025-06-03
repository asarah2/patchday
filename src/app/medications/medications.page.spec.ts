import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { MedicationsPage } from './medications.page';

describe('MedicationsPage', () => {
  let component: MedicationsPage;
  let fixture: ComponentFixture<MedicationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicationsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
