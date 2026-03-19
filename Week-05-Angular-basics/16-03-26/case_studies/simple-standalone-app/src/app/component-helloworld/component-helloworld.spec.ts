import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHelloworld } from './component-helloworld';

describe('ComponentHelloworld', () => {
  let component: ComponentHelloworld;
  let fixture: ComponentFixture<ComponentHelloworld>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentHelloworld],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentHelloworld);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
