import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';

@Component({
  selector: 'app-show-hide',
  imports: [MatCardModule, FlexLayoutModule, MediaQueryStatusComponent],
  template: `<mat-card class="card-demo">
    <mat-card-title>Show & Hide Directives</mat-card-title>
    <mat-card-subtitle
      >Use the show hide APIs to responsively show or hide elements:
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div fxLayout="row" class="coloredContainerX box">
          <div fxFlex fxHide="false" fxHide.gt-sm>
            Shown on small device size.<br />
            Hidden on gt-sm devices.
          </div>
          <div fxFlex fxHide="false" fxHide.gt-md>
            Shown on small and medium size devices.<br />
            Hidden on gt-md devices.
          </div>
          <div fxFlex fxShow="false" fxShow.gt-sm>
            Only show on gt-sm devices.
          </div>
          <div fxFlex fxShow="false" fxShow.md>
            Shown on medium size devices only.
          </div>
          <div fxFlex fxShow="false" fxShow.gt-lg>
            Shown on devices larger than 1200px wide only.
          </div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer style="width:95%">
      <app-media-query-status></app-media-query-status>
    </mat-card-footer>
  </mat-card> `,
  styles: [],
})
export class ShowHideComponent {}
