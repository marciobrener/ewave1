import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { XMLsUploaderComponent } from './xmls-uploader.component';

describe('XMLsUploaderComponent', () => {
  let component: XMLsUploaderComponent;
  let fixture: ComponentFixture<XMLsUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XMLsUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XMLsUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
