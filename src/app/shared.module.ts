import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SpinnerOverlayModule } from 'src/utils/spinner/overlay/spinner-overlay.module';
import { SpinnerModule } from 'src/utils/spinner/spinner.module';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerModule,
    SpinnerOverlayModule,
    FlexLayoutModule,
    TranslateModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTableModule
  ],
  exports: [
    RouterModule,
    SpinnerModule,
    SpinnerOverlayModule,
    FlexLayoutModule,
    TranslateModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTableModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [TranslateService]
})
export class SharedModule {}
