import NavbarPage from "./NavbarPage";
import AddMovieModal from "./AddMovieModal";

export default class MovieCreatePage extends NavbarPage {
  constructor() {
    super();
    cy.get('[page-id=movie-create]')
  }

  public clickAddMovie() {
    cy.get('button[test-id=movieAdd]').should('contain', 'Add a movie').click();
    return new AddMovieModal();
  }

}