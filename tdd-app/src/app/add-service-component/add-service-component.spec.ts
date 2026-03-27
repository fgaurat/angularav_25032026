import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceComponent } from './add-service-component';
import { SumService } from '../sum-service';

describe('AddServiceComponent', () => {
  let component: AddServiceComponent;
  let fixture: ComponentFixture<AddServiceComponent>;
  let mockSumService: { add: ReturnType<typeof vi.fn> }

  beforeEach(async () => {
    mockSumService = { add: vi.fn() }


    await TestBed.configureTestingModule({
      imports: [AddServiceComponent],
      providers: [{ provide: SumService, useValue: mockSumService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddServiceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store the result returned by the service',()=>{
    mockSumService.add.mockReturnValue(42)
    component.val1 = 20
    component.val2 = 22
    component.sum()
    expect(component.result).toBe(42)
    expect(mockSumService.add).toHaveBeenCalled()
  })

  
});
