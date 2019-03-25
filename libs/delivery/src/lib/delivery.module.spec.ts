import { async, TestBed } from '@angular/core/testing';
import { DeliveryModule } from './delivery.module';

describe('DeliveryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DeliveryModule).toBeDefined();
  });
});
