import HomePage from "./HomePage";
import NavbarPage from './NavbarPage';
import OrganizationFormPage from "./OrganizationFormPage";

export default class MovieEditPage extends NavbarPage {
  public static FIELD_INTERNATIONAL_TITLE = 'internationalTitle' // @todo remove
  public static FIELD_DIRECTORS = 'directors';
  public static FIELD_PRODUCTION_YEAR = 'productionYear';

  public static OPTION_TYPES = 'types';
  public static OPTION_GENRES = 'genres';
  public static OPTION_ORIGIN_COUNTRIES = 'originCountries';
  public static OPTION_PRODUCER_COUNTRY = 'coProducerCountries';
  public static OPTION_LANGUAGES = 'languages';
  public static OPTION_STATUS = 'status';

  constructor() {
    super();
    cy.get('[page-id=movie-edit]');
  }

  public clickHome() {
    cy.get('button[testId=home]').click({force: true});
    return new HomePage();
  }

  public clickSaveMovie() {
    cy.get('button[testId=saveMovie]').click({force: true});
  }

  public assertMovieTitleExists(movieName: string) {
    cy.get('[page-id=movie-form-main] input[test-id=movie-add]').should(input => {
      expect(input.val()).to.contain(movieName);
    });
  }

  public assertInputAndViewValueExists(opts : any) {
    if(!opts.type) { opts.type = 'input' }
    cy.get('mat-card').contains(opts.value);
    if(opts.arrayName && opts.groupName && opts.groupName) {
      cy.get(`[formArrayName=${opts.arrayName}] [ng-reflect-name=${opts.groupName}] ${opts.type}[formControlName=${opts.controlName}]`).should(input => {
        expect(input.val()).to.contain(opts.value);
      })
    } else if(opts.arrayName && opts.groupName && !opts.groupName) {
      cy.get(`[formArrayName=${opts.arrayName}] ${opts.type}[formControlName=${opts.controlName}]`).should(input => {
        expect(input.val()).to.contain(opts.value);
      })
    } else if(opts.groupName) {
      cy.get(`[formGroupName=${opts.groupName}] ${opts.type}[formControlName=${opts.controlName}]`).should(input => {
        expect(input.val()).to.contain(opts.value);
      })
    } else {
      cy.get(`${opts.type}[formControlName=${opts.controlName}]`).should(input => {
        expect(input.val()).to.contain(opts.value);
      })
    }
  }

  public fillInputValue(opts : any) {
    if(!opts.type) { opts.type = 'input' }
    if(opts.arrayName && opts.groupName && opts.groupName) {
      cy.get(`[formArrayName=${opts.arrayName}] [ng-reflect-name=${opts.groupName}] ${opts.type}[formControlName=${opts.controlName}]`).type(opts.value);
    } else if(opts.arrayName && opts.groupName && !opts.groupName) {
      cy.get(`[formArrayName=${opts.arrayName}] ${opts.type}[formControlName=${opts.controlName}]`).type(opts.value);
    } else if(opts.groupName) {
      cy.get(`[formGroupName=${opts.groupName}] ${opts.type}[formControlName=${opts.controlName}]`).type(opts.value);
    } else {
      cy.get(`${opts.type}[formControlName=${opts.controlName}]`).type(opts.value);
    }
  }

  public selectOptions(controlName: string, values: string[]) {
    cy.get(`mat-select[formControlName=${controlName}]`).click();
    values.forEach(value => cy.get(`mat-option[ng-reflect-value=${value}]`).scrollIntoView().click({force: true}));
    // click elsewere to remove select
    // @todo tester
    cy.get(`html`).click();
  }

  public assertOptionsExist(values: string[]) {
    values.forEach(value => {
      value = value[0].toLocaleUpperCase() + value.substring(1);
      cy.get('mat-card').contains(value);
    });
  }

  public clickOnOrganization() {
    return new OrganizationFormPage();
  }
}
