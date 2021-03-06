import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCard, MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
// import {MatSort} from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatAccordionHarness } from '@angular/material/expansion/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
// import { MatExpansionModule } from '@angular/material/expansion';
const MaterialComponents = [
  // MatAccordionHarness,
  MatDividerModule,
  MatCheckboxModule,
  CdkAccordionModule,
  MatButtonModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  FlexLayoutModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatInputModule,
  MatTabsModule,
  MatExpansionModule,
  MatSortModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  TextFieldModule,
  MatTreeModule,
  MatAutocompleteModule,
  MatTooltipModule,
  // MatTableDataSource
  // MatSort
  // MatTableDataSource
];
@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
