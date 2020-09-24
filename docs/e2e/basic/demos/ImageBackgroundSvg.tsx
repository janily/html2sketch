import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';
// @ts-ignore
import styles from './ImageBackgroundSvg.less';

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <input type="checkbox" className={styles.checkbox} />
      </div>
    </TestLayout>
  );
};