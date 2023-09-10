import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityComponent } from './security.component';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('parseXMLAgentes()', () => {
    let expected = `
    <?xml version="1.0" encoding="UTF-8"?>
    <agentes versao="1.0">
        <agente>
            <codigo>1</codigo>
            <data>2025-03-24T00:00:00-03:00</data>
            <regiao sigla="SE">
                <geracao>
                    <valor>1.77</valor>
                </geracao>
                <compra>
                    <valor>1.62</valor>
                </compra>

            </regiao>
        </agente>
    </agentes>
    `
    expected = expected.replace(/\n/g, "").trim()

    const test = `
    <?xml version="1.0" encoding="UTF-8"?>
    <agentes versao="1.0">
        <agente>
            <codigo>1</codigo>
            <data>2025-03-24T00:00:00-03:00</data>
            <regiao sigla="SE">
                <geracao>
                    <valor>1.77</valor>
                </geracao>
                <compra>
                    <valor>1.62</valor>
                </compra>
                <precoMedio>
                    <valor>1.101</valor>
                    <valor>1.101</valor>
                </precoMedio>
            </regiao>
        </agente>
    </agentes>
    `

    let result = SecurityComponent.parseXMLAgentes(test)
    result = result.replace(/ /g, "").replace(/\n/g, "")
    expected = expected.replace(/ /g, "").replace(/\n/g, "")

    expect(result).toEqual(expected)
  })

  it('ping()', () => {
    SecurityComponent.ping()
    //expect(result).toEqual(expected)
  })
});
