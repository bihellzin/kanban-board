import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { appServiceMock } from './app.service.spec';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AppService, useValue: appServiceMock }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
