import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AgendaMedicaComponent } from "./agenda-medica.component";

describe("AgendaMedicaComponent", () => {
  let component: AgendaMedicaComponent;
  let fixture: ComponentFixture<AgendaMedicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaMedicaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
