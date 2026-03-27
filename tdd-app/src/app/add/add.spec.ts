import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Add } from './add';
import { By } from '@angular/platform-browser';

describe('Add', () => {
  let component: Add;
  let fixture: ComponentFixture<Add>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Add],
    }).compileComponents();

    fixture = TestBed.createComponent(Add);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should calculate the sum of two numbers",()=>{
      //Arrange  
      const inputElements =fixture.debugElement.queryAll(By.css('input'))
      const buttonElement =fixture.debugElement.query(By.css('button'))
      const resultElement =fixture.debugElement.query(By.css('p'))

      //Act
      inputElements[0].nativeElement.value = "2"
      inputElements[0].nativeElement.dispatchEvent(new Event('input'))

      inputElements[1].nativeElement.value = "1"
      inputElements[1].nativeElement.dispatchEvent(new Event('input'))

      buttonElement.nativeElement.click()
      
      fixture.detectChanges()
      
      //Assert
      expect(resultElement.nativeElement.textContent).toContain("3")

      



  });
});
