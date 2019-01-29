import { async, TestBed } from '@angular/core/testing';
import { ScriptModule } from './script.module';

describe('ScriptModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ScriptModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ScriptModule).toBeDefined();
  });
});
