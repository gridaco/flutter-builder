import { BuildableTree } from "../builder";
import { double } from "@coli.codes/dart-builder";
import { ColorFilter } from "../dart-ui/color-filter";
import { Rect } from "../dart-ui/rect";
import { AlignmentGeometry } from "./alignment-geomatry";
import { BoxFit } from "./box-fit";
import { ImageErrorListener } from "./image-error-listener";
import { ImageProvider } from "./image-provider";
import { ImageRepeat } from "./image-repeat";

/**
 * https://api.flutter.dev/flutter/painting/DecorationImage-class.html
 */
export class DecorationImage extends BuildableTree {
  image: ImageProvider;
  onError?: ImageErrorListener;
  colorFilter?: ColorFilter;
  fit?: BoxFit;
  alignment: AlignmentGeometry;
  centerSlice?: Rect;
  repeat?: ImageRepeat;
  matchTextDirection?: boolean;
  scale?: double;

  /**
   * https://api.flutter.dev/flutter/painting/DecorationImage/DecorationImage.html
   */
  constructor(args: {
    image: ImageProvider;
    onError?: ImageErrorListener;
    colorFilter?: ColorFilter;
    fit?: BoxFit;
    alignment?: AlignmentGeometry;
    centerSlice?: Rect;
    repeat?: ImageRepeat;
    matchTextDirection?: boolean;
    scale?: double;
  }) {
    super();
    this.image = args.image;
    this.onError = args.onError;
    this.colorFilter = args.colorFilter;
    this.fit = args.fit;
    this.alignment = args.alignment;
    this.centerSlice = args.centerSlice;
    this.repeat = args.repeat;
    this.matchTextDirection = args.matchTextDirection;
    this.scale = args.scale;
  }
}
