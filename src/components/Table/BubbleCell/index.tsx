import { FunctionComponent } from 'react';
import styles from './bubbleCell.module.css';

interface BubbleCellProps {
  title: string;
  body: string[];
}

export const BubbleCell: FunctionComponent<BubbleCellProps> = (
  props: BubbleCellProps,
) => {
  const { title, body } = props;
  return (
    <div className={styles.singleBoxContainer}>
      <div className={styles.boxCellTitle}>{title}</div>
      {body.map((data: string, index) => {
        return (
          <div key={index} className={styles.bubbleWrapper}>
            <div className={styles.bubble}>{data}</div>
          </div>
        );
      })}
    </div>
  );
};
