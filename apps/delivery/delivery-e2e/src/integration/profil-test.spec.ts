/// <reference types="cypress" />

import { User } from "../support/utils/type";
import { LandingPage, LoginPage, HomePage, ViewProfilePage, EditProfilePage } from "../support/pages";


const USER: Partial<User> = {
  email: 'pouetbis7@pouet.fr',
  password: 'pouetbis7',
  name: 'Clélia',
  surname: 'Mussy',
};

const PHONE = "0102030405";
const POSITION = "Web Developper";

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/auth');
});

describe('Test profil', () => {
  it('should login, navigate to profil, change several information', () => {
    const p1: LandingPage = new LandingPage;
    const p2: LoginPage = p1.clickCallToAction();
    p2.fillSignin(USER);
    const p3: HomePage = p2.clickSigninWithMovies();
    p3.openProfileMenu();
    const p4: ViewProfilePage = p3.clickProfile();
    const p5: EditProfilePage = p4.clickEdit();
    p5.fillName(USER.name);
    p5.fillSurname(USER.surname);
    p5.fillPhoneNumber(PHONE);
    p5.fillPosition(POSITION);
    p5.clickSave();
    p5.clickClose();
  });
});