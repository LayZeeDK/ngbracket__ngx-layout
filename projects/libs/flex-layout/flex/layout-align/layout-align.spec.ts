/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { extendObject } from '@ngbracket/ngx-layout/_private-utils';
import {
  customMatchers,
  expectNativeEl,
  makeCreateTestComponent,
} from '@ngbracket/ngx-layout/_private-utils/testing';
import {
  ɵMatchMedia as MatchMedia,
  ɵMockMatchMedia as MockMatchMedia,
  ɵMockMatchMediaProvider as MockMatchMediaProvider,
  SERVER_TOKEN,
  StyleBuilder,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';
import {
  FlexModule,
  LayoutAlignStyleBuilder,
} from '@ngbracket/ngx-layout/flex';

describe('layout-align directive', () => {
  let fixture: ComponentFixture<any>;
  let mediaController: MockMatchMedia;
  let platform: Platform;
  let styler: StyleUtils;
  let createTestComponent = (template: string) => {
    fixture = makeCreateTestComponent(() => TestLayoutAlignComponent)(template);

    inject(
      [MatchMedia, Platform, StyleUtils],
      (
        _matchMedia: MockMatchMedia,
        _platform: Platform,
        _styler: StyleUtils,
      ) => {
        mediaController = _matchMedia;
        platform = _platform;
        styler = _styler;
      },
    )();
  };

  beforeEach(() => {
    jasmine.addMatchers(customMatchers);

    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      imports: [CommonModule, FlexLayoutModule],
      declarations: [TestLayoutAlignComponent],
      providers: [
        MockMatchMediaProvider,
        { provide: SERVER_TOKEN, useValue: true },
      ],
    });
  });

  describe('with static features', () => {
    it('should add work without a peer `fxLayout` directive', () => {
      createTestComponent(`<div fxLayoutAlign></div>`);
      expectNativeEl(fixture).toHaveStyle(
        {
          display: 'flex',
          'flex-direction': 'row',
          'box-sizing': 'border-box',
        },
        styler,
      );
    });
    it('should add correct styles for default `fxLayoutAlign` usage', () => {
      createTestComponent(`<div fxLayoutAlign></div>`);
      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'flex-start',
          'align-items': 'stretch',
          'align-content': 'stretch',
        },
        styler,
      );
    });
    it('should add preserve fxLayout', () => {
      createTestComponent(`<div fxLayout='column' fxLayoutAlign></div>`);
      expectNativeEl(fixture).toHaveStyle(
        {
          display: 'flex',
          'flex-direction': 'column',
          'box-sizing': 'border-box',
          'justify-content': 'flex-start',
          'align-items': 'stretch',
          'align-content': 'stretch',
        },
        styler,
      );
    });
    it('should add preserve fxLayout in inline mode', () => {
      createTestComponent(`<div fxLayout='column inline' fxLayoutAlign></div>`);
      expectNativeEl(fixture).toHaveStyle(
        {
          display: 'inline-flex',
          'flex-direction': 'column',
          'box-sizing': 'border-box',
          'justify-content': 'flex-start',
          'align-items': 'stretch',
          'align-content': 'stretch',
        },
        styler,
      );
    });

    describe('for "main-axis" testing', () => {
      it('should add correct styles for `fxLayoutAlign="start"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='start'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject({ 'justify-content': 'flex-start' }, CROSSAXIS_DEFAULTS),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="flex-start"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='flex-start'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject({ 'justify-content': 'flex-start' }, CROSSAXIS_DEFAULTS),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="center"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='center'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject({ 'justify-content': 'center' }, CROSSAXIS_DEFAULTS),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="space-around"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='space-around'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(
            { 'justify-content': 'space-around' },
            CROSSAXIS_DEFAULTS,
          ),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="space-evenly"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='space-evenly'></div>`);

        // Safari does not appear to support this property
        if (platform.SAFARI) {
          expectNativeEl(fixture).toHaveStyle(
            extendObject(
              { 'justify-content': 'space-evenly' },
              CROSSAXIS_DEFAULTS,
            ),
            styler,
          );
        }
      });
      it('should add correct styles for `fxLayoutAlign="space-between"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='space-between'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(
            { 'justify-content': 'space-between' },
            CROSSAXIS_DEFAULTS,
          ),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="end"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='end'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject({ 'justify-content': 'flex-end' }, CROSSAXIS_DEFAULTS),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="flex-end"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='flex-end'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject({ 'justify-content': 'flex-end' }, CROSSAXIS_DEFAULTS),
          styler,
        );
      });
      it('should add ignore invalid main-axis values', () => {
        createTestComponent(`<div fxLayoutAlign='invalid'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject({ 'justify-content': 'flex-start' }, CROSSAXIS_DEFAULTS),
          styler,
        );
      });
    });

    describe('for "cross-axis" testing', () => {
      it('should add correct styles for `fxLayoutAlign="start start"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='start start'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(MAINAXIS_DEFAULTS, {
            'align-items': 'flex-start',
            'align-content': 'flex-start',
          }),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="start center"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='start center'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(MAINAXIS_DEFAULTS, {
            'align-items': 'center',
            'align-content': 'center',
          }),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="start end"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='start end'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(MAINAXIS_DEFAULTS, {
            'align-items': 'flex-end',
            'align-content': 'flex-end',
          }),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="start space-between"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='start space-between'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(MAINAXIS_DEFAULTS, {
            'align-items': 'stretch',
            'align-content': 'space-between',
          }),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="start space-around"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='start space-around'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(MAINAXIS_DEFAULTS, {
            'align-items': 'stretch',
            'align-content': 'space-around',
          }),
          styler,
        );
      });
      it('should add correct styles for `fxLayoutAlign="start baseline"` usage', () => {
        createTestComponent(`<div fxLayoutAlign='start baseline'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          {
            'justify-content': 'flex-start',
            'align-items': 'baseline',
            'align-content': 'stretch',
          },
          styler,
        );
      });
      it('should add ignore invalid cross-axis values', () => {
        createTestComponent(`<div fxLayoutAlign='start invalid'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          extendObject(MAINAXIS_DEFAULTS, {
            'align-items': 'stretch',
            'align-content': 'stretch',
          }),
          styler,
        );
      });
      it('should add special styles for cross-axis `stretch`', () => {
        createTestComponent(`<div fxLayoutAlign='start stretch'></div>`);
        expectNativeEl(fixture).toHaveStyle(
          {
            'max-height': '100%',
          },
          styler,
        );
      });
      it('should not add special styles when the cross-axis is not `stretch`', () => {
        createTestComponent(`
          <div fxLayout
               fxLayoutAlign='center center'>
          </div>
        `);

        expectNativeEl(fixture).not.toHaveStyle(
          {
            'max-height': '100%',
          },
          styler,
        );
      });
      it('should add special styles for cross-axis `stretch` when layout is `column`', () => {
        createTestComponent(
          `<div fxLayout="column" fxLayoutAlign='end stretch'></div>`,
        );
        expectNativeEl(fixture).toHaveStyle(
          {
            'max-width': '100%',
          },
          styler,
        );
      });
    });

    describe('for dynamic inputs', () => {
      it('should add correct styles and ignore invalid axes values', () => {
        createTestComponent(`<div [fxLayoutAlign]='alignBy'></div>`);

        fixture.componentInstance.alignBy = 'center end';
        expectNativeEl(fixture).toHaveStyle(
          {
            'justify-content': 'center',
            'align-items': 'flex-end',
            'align-content': 'flex-end',
          },
          styler,
        );

        fixture.componentInstance.alignBy = 'invalid invalid';
        expectNativeEl(fixture).toHaveStyle(DEFAULT_ALIGNS, styler);

        fixture.componentInstance.alignBy = '';
        expectNativeEl(fixture).toHaveStyle(DEFAULT_ALIGNS, styler);
      });
    });
  });

  describe('with responsive features', () => {
    it('should ignore responsive changes when not configured', () => {
      createTestComponent(`<div fxLayoutAlign='center center'></div>`);

      mediaController.activate('md');

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'center',
          'align-items': 'center',
          'align-content': 'center',
        },
        styler,
      );
    });

    it('should add responsive styles when configured', () => {
      createTestComponent(`
        <div fxLayoutAlign='center center' fxLayoutAlign.md='end'></div>
      `);

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'center',
          'align-items': 'center',
          'align-content': 'center',
        },
        styler,
      );

      mediaController.activate('md');

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'flex-end',
          'align-items': 'stretch',
          'align-content': 'stretch',
        },
        styler,
      );
    });

    it('should add responsive styles with fxFlex', () => {
      createTestComponent(`
        <div fxFlex.gt-sm="25%" fxFlex.lt-md="100%" fxLayoutAlign="center end"></div>
      `);

      expectNativeEl(fixture).not.toHaveStyle(
        {
          'max-width': '25%',
        },
        styler,
      );

      mediaController.activate('md', true);

      expectNativeEl(fixture).toHaveStyle(
        {
          'max-width': '25%',
        },
        styler,
      );

      mediaController.activate('sm', true);

      expectNativeEl(fixture).not.toHaveStyle(
        {
          'max-width': '25%',
        },
        styler,
      );
    });

    it('should update responsive styles when the layout direction changes', () => {
      createTestComponent(`
        <div fxLayout
             [fxLayout.md]='direction'
             fxLayoutAlign='center stretch'
             fxLayoutAlign.md='end stretch'>
        </div>
      `);

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'center',
          'max-height': '100%',
        },
        styler,
      );

      mediaController.activate('md');

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'flex-end',
          'max-width': '100%',
        },
        styler,
      );
    });

    it('should undo special styles when cross-axis changes from `stretch` to anything else', () => {
      createTestComponent(`
        <div fxLayout
             fxLayoutAlign='center stretch'
             fxLayoutAlign.md='center center'>
        </div>
      `);

      expectNativeEl(fixture).toHaveStyle(
        {
          'max-height': '100%',
        },
        styler,
      );

      mediaController.activate('md');

      expectNativeEl(fixture).not.toHaveStyle(
        {
          'max-height': '100%',
        },
        styler,
      );
    });

    it('should fallback to default styles when the active mediaQuery change is not configured', () => {
      // tslint:disable-line:max-line-length
      createTestComponent(`
         <div fxLayout
              [fxLayout.md]='direction'
              fxLayoutAlign='center stretch'
              fxLayoutAlign.md='end stretch'>
         </div>
       `);

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'center',
          'max-height': '100%',
        },
        styler,
      );

      mediaController.activate('md');

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'flex-end',
          'max-width': '100%',
        },
        styler,
      );

      mediaController.activate('xs');

      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'center',
          'max-height': '100%',
        },
        styler,
      );
    });

    it('should not fallback to value not registered with fxLayout', () => {
      createTestComponent(`
         <section fxLayout="row"
                  fxLayoutAlign.lt-md="center center">
         </section>
      `);

      mediaController.activate('lt-md');
      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'center',
          'align-items': 'center',
          'align-content': 'center',
        },
        styler,
      );

      mediaController.activate('md');
      expectNativeEl(fixture).not.toHaveStyle(
        {
          'justify-content': 'center',
          'align-items': 'center',
          'align-content': 'center',
        },
        styler,
      );

      mediaController.activate('lt-md');
      expectNativeEl(fixture).toHaveStyle(
        {
          'justify-content': 'center',
          'align-items': 'center',
          'align-content': 'center',
        },
        styler,
      );
    });

    it('should fallback to closest overlapping value when the active mediaQuery change is not configured', () => {
      // tslint:disable-line:max-line-length
      createTestComponent(`
          <div  fxLayout
                fxLayout.md='column'
                fxLayoutAlign='start'
                fxLayoutAlign.gt-xs='end'
                fxLayoutAlign.md='center'>
          </div>
      `);

      mediaController.useOverlaps = true;

      expectNativeEl(fixture).toHaveStyle(
        {
          'flex-direction': 'row',
          'justify-content': 'flex-start',
        },
        styler,
      );

      mediaController.activate('md');
      expectNativeEl(fixture).toHaveStyle(
        {
          'flex-direction': 'column',
          'justify-content': 'center',
        },
        styler,
      );

      mediaController.activate('xs');
      expectNativeEl(fixture).toHaveStyle(
        {
          'flex-direction': 'row',
          'justify-content': 'flex-start',
        },
        styler,
      );

      // Should fallback to value for 'gt-xs' or default
      mediaController.activate('lg', true);
      expectNativeEl(fixture).toHaveStyle(
        {
          'flex-direction': 'row',
          'justify-content': 'flex-end',
        },
        styler,
      );

      mediaController.activate('xs');
      expectNativeEl(fixture).toHaveStyle(
        {
          'flex-direction': 'row',
          'justify-content': 'flex-start',
        },
        styler,
      );

      // Should fallback to value for 'gt-xs' or default
      mediaController.activate('xl', true);
      expectNativeEl(fixture).toHaveStyle(
        {
          'flex-direction': 'row',
          'justify-content': 'flex-end',
        },
        styler,
      );
    });
  });

  describe('with custom builder', () => {
    beforeEach(() => {
      jasmine.addMatchers(customMatchers);

      // Configure testbed to prepare services
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FlexLayoutModule.withConfig({
            useColumnBasisZero: false,
            serverLoaded: true,
          }),
        ],
        declarations: [],
        providers: [
          MockMatchMediaProvider,
          {
            provide: LayoutAlignStyleBuilder,
            useClass: MockLayoutAlignStyleBuilder,
          },
        ],
      });
    });

    it('should set flex offset not to input', () => {
      createTestComponent(`
        <div fxLayoutAlign='start start'>
          <div fxFlexOffset="25"></div>
        </div>
      `);
      expectNativeEl(fixture).toHaveStyle(
        { 'justify-content': 'flex-end' },
        styler,
      );
    });
  });
});

@Injectable({ providedIn: FlexModule })
export class MockLayoutAlignStyleBuilder extends StyleBuilder {
  override shouldCache = false;

  buildStyles(_input: string) {
    return { 'justify-content': 'flex-end' };
  }
}

// *****************************************************************
// Template Component
// *****************************************************************

@Component({
  selector: 'test-layout',
  template: `<span>PlaceHolder Template HTML</span>`,
  standalone: false,
})
class TestLayoutAlignComponent implements OnInit {
  direction = 'column';
  mainAxis = 'start';
  crossAxis = 'end';

  set alignBy(style) {
    let vals = style.split(' ');
    this.mainAxis = vals[0];
    this.crossAxis = vals.length > 1 ? vals[1] : '';
  }

  get alignBy() {
    return `${this.mainAxis} ${this.crossAxis}`;
  }

  constructor() {}

  ngOnInit() {}
}

// *****************************************************************
// Template Component
// *****************************************************************

const DEFAULT_ALIGNS = {
  'justify-content': 'flex-start',
  'align-items': 'stretch',
  'align-content': 'stretch',
};
const CROSSAXIS_DEFAULTS = {
  'align-items': 'stretch',
  'align-content': 'stretch',
};
const MAINAXIS_DEFAULTS = {
  'justify-content': 'flex-start',
};
