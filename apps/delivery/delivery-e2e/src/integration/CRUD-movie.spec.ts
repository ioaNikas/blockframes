/// <reference types="cypress" />

import { LoginPage, AddMovieModal, MovieEditPage, LandingPage, MovieCreatePage, HomePage } from "../support/pages";
import { User } from "../support/utils/type";

// CONSTS
const INPUTS_FORM = {
  main: [
    { value: '123456', controlName: 'internalRef' },
    { value: 'ISAN 0000-0001-8947-0000-8-0000-0000-D', controlName: 'isan' },
    { value: 'The terminator', controlName: 'international', groupName: 'title' },
    { value: '1998', controlName: 'productionYear' },
    { value: 'Kung foo foo', controlName: 'shortSynopsis', type: 'textarea' },
    { value: '90', controlName: 'length' }
  ]
};

const OPTIONS_FORM = {
  main: [
    { controlName: 'genres', value: ['science-fiction', 'documentary'], label: ['Science Fiction', 'Documentary'] },
    { controlName: 'originCountries', value: ['united-states'], label: ['United States'] },
    { controlName: 'languages', value: ['french'], label: ['French'] },
    { controlName: 'status', value: ['finished'], label: ['Finished']}
  ]
};

/**
 *  [MovieEditPage.OPTION_TYPES]: ['],
  [MovieEditPage.OPTION_GENRES]: ['thriller', 'horror'],
  [MovieEditPage.OPTION_ORIGIN_COUNTRIES]: ['france'],
  [MovieEditPage.OPTION_PRODUCER_COUNTRY]: ['france'],
  [MovieEditPage.OPTION_LANGUAGES]: ['french'],
  [MovieEditPage.OPTION_STATUS]: ['shooting']
 */

const LOGIN_CREDENTIALS: Partial<User> = {
  email: 'cypressCRUDMOVIE@blockframes.com',
  password: 'blockframes'
}

const MOVIES_CYTEST = ['Terminator', 'Kung Fury'];

// TESTS

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/auth');
  cy.viewport('ipad-2', 'landscape');
  const p1: LandingPage = new LandingPage();
  const p2: LoginPage = p1.clickCallToAction();
  p2.fillSignin(LOGIN_CREDENTIALS);
});

describe('User create a movie', () => {
  it('should login, open the movie title form, and add a movie', () => {
    const p1 = new LoginPage();
    const p2: MovieCreatePage = p1.clickSigninWithNoMovies();

    // Create a movie
    const p4: AddMovieModal = p2.clickAddMovie();
    p4.fillMovieName(MOVIES_CYTEST[0]);
    const p5: MovieEditPage = p4.clickCreate();
    p5.assertMovieTitleExists(MOVIES_CYTEST[0]);
  });
});

describe('User create and update another movie', () => {
  it('should login, open the movie title form, add movie, then update it', () => {
    const p1 = new LoginPage();
    const p2: HomePage = p1.clickSigninWithMovies();

    // Assert movie from previous test exists
    p2.assertMovieExists(MOVIES_CYTEST[0])

    // Create a movie
    const p3: AddMovieModal = p2.clickAddMovie();
    p3.fillMovieName(MOVIES_CYTEST[1]);
    const p4: MovieEditPage = p3.clickCreate();
    p4.assertMovieTitleExists(MOVIES_CYTEST[1]);

    ////////////
    /// MAIN SECTION
    ////////////

    // Add a director
    cy.get('button[testId=addDirector]').click({ force: true });
    p4.fillInputValue({ value: 'Luc', controlName: 'firstName', groupName: '0', arrayName: 'directors' });
    p4.assertInputAndViewValueExists({ value: 'Luc', controlName: 'firstName', groupName: '0', arrayName: 'directors' });
    p4.fillInputValue({ value: 'Besson', controlName: 'lastName', groupName: '0', arrayName: 'directors' });
    p4.assertInputAndViewValueExists({ value: 'Besson', controlName: 'lastName', groupName: '0', arrayName: 'directors' });

    // Poster
    const dropEvent = {
      force: true,
      dataTransfer: {
        files: [
        ],
      },
    };
    cy.fixture('Legend_14-widebody-300x199.jpg').then((picture) => { // @todo how to put image in dist fixtures
      return Cypress.Blob.base64StringToBlob(picture, 'image/jpeg').then((blob) => {
        dropEvent.dataTransfer.files.push(blob);
      });
    });
    cy.get('[testId=upload-file]').trigger('drop', dropEvent);

    // Fill standard form inputs
    INPUTS_FORM.main.forEach(input => {
      p4.fillInputValue(input);
      p4.assertInputAndViewValueExists(input);
    });

    // Fill select inputes
    OPTIONS_FORM.main.forEach(input => {
      p4.selectOptions(input.controlName, input.value);
      p4.assertOptionsExist( input.label);
    });

    // Add a production company
    cy.get('button[testId=addProductionCompany]').click({ force: true });
    p4.fillInputValue({ value: 'Universal City Studios', controlName: 'firstName', groupName: '0', arrayName: 'productionCompanies' });
    p4.assertInputAndViewValueExists({ value: 'Universal City Studios', controlName: 'firstName', groupName: '0', arrayName: 'productionCompanies' });


    ////////////
    /// PROMOTIONAL ELEMENTS SECTION
    ////////////
    cy.get('.mat-tab-label-content').contains('Promotional Elements').click({ force: true });
    
    // @todo images

    // Add other promotional elements
    cy.get('button[testId=addPromotionalElement]').click({ force: true });
    p4.fillInputValue({ value: 'This is a label', controlName: 'label', groupName: '0', arrayName: 'promotionalElements' });
    p4.assertInputAndViewValueExists({ value: 'Luc', controlName: 'label', groupName: '0', arrayName: 'promotionalElements' });
    p4.fillInputValue({ value: 'https://www.test.fr/', controlName: 'url', groupName: '0', arrayName: 'promotionalElements' });
    p4.assertInputAndViewValueExists({ value: 'Besson', controlName: 'url', groupName: '0', arrayName: 'promotionalElements' });

    ////////////
    /// PROMOTIONAL DESCRIPTION SECTION
    ////////////
    cy.get('.mat-tab-label-content').contains('Promotional Description').click({ force: true });

    // @todo update PR imdb pr keywords separator

    // Add key assets
    cy.get('button[testId=addKeyAsset]').click({ force: true });
    p4.fillInputValue({ value: 'This is a label', controlName: '0', arrayName: 'keyAssets', type: 'textarea' });
    p4.assertInputAndViewValueExists({ value: 'Luc', controlName: '0', arrayName: 'keyAssets', type: 'textarea'  });
    

    // Save form
    p4.clickSaveMovie();

    // @todo remove
    cy.wait(10000);

    

    // Go back and check in list for movie info // or edit ?
  });

});

describe('User delete two movies', () => {
  it('should login, delete two movies, then assert that they are deleted', () => {
    const p1 = new LoginPage();
    const p2: HomePage = p1.clickSigninWithMovies();

    // Assert movies from previous test exist, delete them,
    // then assert movies don't exist anymore
    MOVIES_CYTEST.forEach(movie => {
      p2.assertMovieExists(movie);
      p2.displayMovieMenu(movie);
      p2.clickDelete();
      p2.assertMovieNotExists(movie);
    });
  });
});




    // // Add informations and verify the entry
    // p5.assertMovieTitleExists(MOVIE_CYTEST);
    // Object.entries(INPUTS_FORM).forEach(input => {
    //   p5.fillInputValue(input[0], input[1]);
    //   p5.assertInputAndViewValueExists(input[0], input[1]);
    // });
    // Object.entries(OPTIONS_FORM).forEach(option => {
    //   p5.selectOptions(option[0], option[1]);
    //   p5.assertOptionsExist(option[1]);
    // });
    // p5.clickSaveMovie();

    // // Go to home page and comeback to verify saved informations
    // const p6: HomePage = p5.clickHome();
    // p6.displayMovieMenu(MOVIE_CYTEST);
    // const p7: MovieEditPage = p6.clickEdit();
    // Object.entries(INPUTS_FORM).forEach(input => {
    //   p7.assertInputAndViewValueExists(input[0], input[1]);
    // });
    // Object.entries(OPTIONS_FORM).forEach(option => {
    //   p7.assertOptionsExist(option[1]);
    // });

    // // Go to home page and delete the movie
    // const p8: HomePage = p7.clickHome();
    // p8.displayMovieMenu(MOVIE_CYTEST);
    // p8.clickDelete();
    // p8.assertMovieNotExists(MOVIE_CYTEST);
