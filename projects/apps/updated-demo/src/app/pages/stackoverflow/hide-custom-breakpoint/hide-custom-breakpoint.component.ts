import { Component, Directive } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  BREAKPOINT,
  FlexDirective,
  FlexFillDirective,
  LayoutDirective,
  ShowHideDirective,
} from '@ngbracket/ngx-layout';

const YBA_BREAKPOINT = {
  alias: 'yba',
  suffix: 'Yba',
  mediaQuery: 'screen and (max-height: 600px)',
  overlapping: false,
};

export const YBA_BREAKPOINT_PROVIDER = {
  provide: BREAKPOINT,
  useValue: [YBA_BREAKPOINT],
  multi: true,
};

const inputs = ['fxHide', 'fxHide.yba'];
const selector = `[fxHide], [fxHide.yba]`;

@Directive({ selector, inputs })
export class CustomHideDirective extends ShowHideDirective {
  protected override inputs = inputs;
}

@Component({
  selector: 'app-hide-custom-breakpoint',
  imports: [MatCardModule, FlexDirective, LayoutDirective, FlexFillDirective],
  template: ` <mat-card class="card-demo">
    <mat-card-title
      ><a href="http://bit.ly/2D2dAxM" target="_blank"
        >StackBlitz</a
      ></mat-card-title
    >
    <mat-card-subtitle
      >Hide when height < 800px using custom breakpoint
      <span style="font-weight: bold; color: #7a7af7;">fxHide.yba</span>
    </mat-card-subtitle>
    <mat-card-content>
      <div
        class="content"
        fxHide.yba
        fxLayout="row"
        fxLayout.md="column"
        fxFlexFill
      >
        <div fxFlex="15" fxFlex.md="55" class="sec1" fxFlex.xs="55">
          first-section
        </div>
        <div fxFlex="30" fxFlex.md="15" class="sec2">second-section</div>
        <div fxFlex="55" fxFlex.md="30" class="sec3" fxFlex.xs="15">
          third-section
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer class="bottomPad">
      <div class="hint">
        &lt;div fxLayout="row" fxLayout.xs="column" fxFlexFill fxHide.yba &gt;
      </div>
    </mat-card-footer>
  </mat-card>`,
  styles: [
    `
      .bounds {
        background-color: #ddd;
        height: 800px;
      }

      .sec1 {
        background: red;
        color: white;
        text-transform: uppercase;
        padding: 20px;
      }

      .sec2 {
        background: yellow;
        color: blue;
        padding: 20px;
      }

      .sec3 {
        background: blue;
        color: white;
        text-transform: uppercase;
        padding: 20px;
      }

      .sec1,
      .sec2,
      .sec3 {
        padding-top: 20px;
        text-align: center;
      }

      .content {
        min-width: 300px;
      }
    `,
  ],
})
export class HideCustomBreakpointComponent {}
