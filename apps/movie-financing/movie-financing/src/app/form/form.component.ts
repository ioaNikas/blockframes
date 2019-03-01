import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'movie-financing-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  movieForm = this.fb.group({
    title: [null, Validators.required],
    productionCompany: [null, Validators.required],
    internationalSalesCompany: [null, Validators.required],
    director: [null, Validators.required],
    writer: [null, Validators.required],
    cast: [null, Validators.required],
    genre: [null, Validators.required],
    status: [null, Validators.required],
    logline: [null, Validators.compose([
      Validators.required, Validators.maxLength(180)])
    ],
    budget: [null, Validators.required],
    image: [null, Validators.required],
    ask: [null, Validators.required],
    minimumInvestment: [null, Validators.required],
  });

  genres = ['Comedy', 'Drama', 'Horror', 'Fantasy', 'Science fiction'];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

}
