import { FunctionComponent } from 'react';
import './style.css';

interface HeaderProps {
  name: string;
  isSortable: boolean;
}

interface CellStyleProps {
  textAlign: string;
  minWidth: number;
}

export interface ItemProps {
  headers: HeaderProps[];
  body: any;
  cellStyle: CellStyleProps[];
}

interface TableCellProps {
  style?: any;
  textAlign?: any;
  minWidth?: number;
  maxWidth?: number;
  children?: any;
}

const TableCell: FunctionComponent<TableCellProps> = (
  props: TableCellProps,
) => {
  const { style, children, textAlign, minWidth, maxWidth } = props;

  return (
    <div
      className="table-cell-container"
      style={{
        minWidth: minWidth,
        maxWidth: maxWidth,
        justifyContent: textAlign,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default TableCell;
