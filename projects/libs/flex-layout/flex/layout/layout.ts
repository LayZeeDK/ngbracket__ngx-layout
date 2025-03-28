import {
  Directive,
  ElementRef,
  Inject,
  Injectable,
  OnChanges,
} from '@angular/core';
import {
  BaseDirective2,
  LAYOUT_CONFIG,
  LayoutConfigOptions,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

import { buildLayoutCSS } from '@ngbracket/ngx-layout/_private-utils';

export interface LayoutStyleDisplay {
  readonly display: string;
}

@Injectable({ providedIn: 'root' })
export class LayoutStyleBuilder extends StyleBuilder {
  buildStyles(input: string, { display }: LayoutStyleDisplay) {
    const css = buildLayoutCSS(input);
    return {
      ...css,
      display: display === 'none' ? display : css.display,
    };
  }
}

const inputs = [
  'fxLayout',
  'fxLayout.xs',
  'fxLayout.sm',
  'fxLayout.md',
  'fxLayout.lg',
  'fxLayout.xl',
  'fxLayout.lt-sm',
  'fxLayout.lt-md',
  'fxLayout.lt-lg',
  'fxLayout.lt-xl',
  'fxLayout.gt-xs',
  'fxLayout.gt-sm',
  'fxLayout.gt-md',
  'fxLayout.gt-lg',
];
const selector = `
  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],
  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],
  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],
  [fxLayout.gt-md], [fxLayout.gt-lg]
`;

/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
@Directive({ selector, inputs })
export class LayoutDirective extends BaseDirective2 implements OnChanges {
  protected override DIRECTIVE_KEY = 'layout';
  protected override inputs = inputs;

  constructor(
    elRef: ElementRef,
    styleUtils: StyleUtils,
    styleBuilder: LayoutStyleBuilder,
    marshal: MediaMarshaller,
    @Inject(LAYOUT_CONFIG) private _config: LayoutConfigOptions
  ) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }

  protected override updateWithValue(input: string) {
    const detectLayoutDisplay = this._config.detectLayoutDisplay;
    const display = detectLayoutDisplay
      ? this.styler.lookupStyle(this.nativeElement, 'display')
      : '';
    this.styleCache = cacheMap.get(display) ?? new Map();
    cacheMap.set(display, this.styleCache);

    if (this.currentValue !== input) {
      this.addStyles(input, { display });
      this.currentValue = input;
    }
  }
}

/**
 * @deprecated The DefaultLayoutDirective will be removed in version 21.
 * Use LayoutDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultLayoutDirective extends LayoutDirective {
  protected override inputs = inputs;
}

type CacheMap = Map<string, StyleDefinition>;
const cacheMap = new Map<string, CacheMap>();
