import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { subMovieFinancingRoutes } from './app-routing-module';

// Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule, MatChipsModule, MatExpansionModule, MatCardModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { FinancingExplorerHomeComponent } from './explorer/home/home.component';
import { FinancingExplorerDetailsComponent } from './explorer/details/details.component';
import { FinancingExplorerSearchComponent } from './explorer/search/search.component';
import { FinancingMovieCardComponent } from './explorer/movie-card/movie-card.component';
import { FinancingExplorerFooterComponent } from './explorer/footer/footer.component';
import { FinancingExplorerHeaderComponent } from './explorer/header/header.component';
import { FinancingExplorerNavbarComponent } from './explorer/navbar/navbar.component';
import { FinancingExplorerFinancingDetailsComponent } from './explorer/financing-details/financing-details.component';
import { FinancingExplorerMovieHomeComponent } from './explorer/movie-home/movie-home.component';
import { FinancingExplorerProfileComponent } from './explorer/profile/profile.component';
import { FinancingMovieCardHorizontalComponent } from './explorer/movie-card-horizontal/movie-card-horizontal.component';
import { FinancingExplorerCompareComponent } from './explorer/compare/compare.component';
import { FinancingRangeSliderModule } from './explorer/ui/range-slider/range-slider.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    FinancingExplorerHomeComponent,
    FinancingExplorerDetailsComponent,
    FinancingExplorerSearchComponent,
    FinancingMovieCardComponent,
    FinancingMovieCardHorizontalComponent,
    FinancingExplorerFooterComponent,
    FinancingExplorerHeaderComponent,
    FinancingExplorerFinancingDetailsComponent,
    FinancingExplorerNavbarComponent,
    FinancingExplorerMovieHomeComponent,
    FinancingExplorerProfileComponent,
    FinancingExplorerCompareComponent
  ],
  imports: [
    CommonModule,
    FinancingRangeSliderModule,

    // Material
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatChipsModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatToolbarModule,

    RouterModule.forChild(subMovieFinancingRoutes)],
  providers: []
})
export class MovieFinancingSubModule {}
