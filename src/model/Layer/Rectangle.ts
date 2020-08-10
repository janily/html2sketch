import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import Base, { BaseLayerParams } from './Base';
import { defaultExportOptions } from '../utils';

type CornerRadius = {
  bottomLeft: number;
  bottomRight: number;
  topLeft: number;
  topRight: number;
};
interface RectangleInitParams extends Omit<BaseLayerParams, 'x' | 'y'> {
  x?: number;
  y?: number;
  cornerRadius?: CornerRadius | number | number[];
}
/**
 * 矩形类型
 **/
class Rectangle extends Base {
  constructor({
    x,
    y,
    width,
    height,
    cornerRadius = { topLeft: 0, bottomLeft: 0, topRight: 0, bottomRight: 0 },
  }: RectangleInitParams) {
    super({ height, x, y, width });
    this.class = SketchFormat.ClassValue.Rectangle;

    this.cornerRadius = cornerRadius;
  }

  cornerRadius: CornerRadius | number | number[] = 0;

  /**
   * 转换为 Sketch JSON
   */
  toSketchJSON(): SketchFormat.Rectangle {
    return {
      _class: 'rectangle',
      name: this.name,
      resizingConstraint: SketchFormat.ResizeType.Float,
      frame: this.frame.toSketchJSON(),
      do_objectID: this.id,
      hasConvertedToNewRoundCorners: true,
      needsConvertionToNewRoundCorners: false,
      fixedRadius: 0,
      style: this.style.toSketchJSON(),
      edited: false,
      pointRadiusBehaviour: 1,
      points: this.getSketchPoints(),
      isClosed: true,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      exportOptions: defaultExportOptions,
      isVisible: true,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      layerListExpandedType: 0,
      nameIsFixed: false,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      clippingMaskMode: 0,
      isLocked: false,
    };
  }

  /**
   * 转换为 Konva JSON
   */
  toKonvaJSON() {
    const cornerRadius = this.cornerRadius;
    return {
      attrs: {
        ...this.frame.toJSON(),
        id: this.id,
        cornerRadius:
          typeof cornerRadius === 'number'
            ? cornerRadius
            : cornerRadius instanceof Array
            ? cornerRadius
            : [
                cornerRadius.topLeft,
                cornerRadius.topRight,
                cornerRadius.bottomRight,
                cornerRadius.bottomLeft,
              ],
      },
      className: this.name,
    };
  }

  /**
   * 获取 SketchPoints
   */
  getSketchPoints = (): SketchFormat.CurvePoint[] => {
    const cornerRadius = this.cornerRadius;
    let topRight, topLeft, bottomLeft, bottomRight;
    if (typeof cornerRadius === 'number') {
      topRight = topLeft = bottomLeft = bottomRight = cornerRadius;
    } else if (cornerRadius instanceof Array) {
      topLeft = cornerRadius[0];
      topRight = cornerRadius[1];
      bottomRight = cornerRadius[2];
      bottomLeft = cornerRadius[3];
    } else {
      topLeft = cornerRadius.topLeft;
      topRight = cornerRadius.topRight;
      bottomRight = cornerRadius.bottomRight;
      bottomLeft = cornerRadius.bottomLeft;
    }
    return [
      {
        _class: 'curvePoint',
        cornerRadius: topLeft,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: topRight,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: bottomRight,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: bottomLeft,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ];
  };
}

export default Rectangle;