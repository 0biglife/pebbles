import { FunctionComponent, useEffect, useRef, useState } from 'react';
import './style.css';
import { Typography, ContextMenu, Spinner } from 'components';
import { upArrowSvg, spinnerLottie } from 'assets';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TableCell from '../TableCell';

const indicatorOption = {
  animationData: spinnerLottie,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export interface ItemProps {
  headers: any[];
  body: (Record<string, any> & {
    link: string;
  })[];
}

interface TableProps {
  items: any;
  isAsc?: boolean;
  setIsAsc?: any;
  isEditable?: boolean;
  sortIndex?: number;
  setSortIndex?: any;
  editOptions?: string[];
  maxHeight?: number;
  goToDetail?: (name: string, namespace?: string) => void;
  goToOptions?: (index: number, name: string, namespace?: string) => void;
  goToOptions2?: (index: number, item: any) => void;
  goToOptionsByUID?: (
    index: number,
    name: string,
    namespace: string,
    uid: string,
  ) => void;
  goToDelete?: () => void;
  goToDelete2?: (index: number, item: any) => void;
  onDeleteClick?: (e: any, tagName: string) => void;
  selectNowIndex?: (value: number) => void;
  marginBottom?: string;
  isLoading?: boolean;
  tappable?: boolean;
  loadingIndex?: number[] | undefined;
}

const Table: FunctionComponent<TableProps> = (props: TableProps) => {
  const {
    items,
    isLoading,
    sortIndex,
    isAsc,
    isEditable = false,
    editOptions,
    setSortIndex,
    maxHeight,
    goToDetail,
    goToOptions,
    goToOptions2,
    goToOptionsByUID,
    goToDelete,
    goToDelete2,
    onDeleteClick,
    selectNowIndex,
    marginBottom,
    tappable = true,
    loadingIndex = [],
  } = props;
  const { t } = useTranslation();
  const { headers, body } = items;
  const [menuVisible, setMenuVisible] = useState<{
    show: boolean;
    index: number;
  }>({ show: false, index: 0 });
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState({ hover: false, index: 0 });
  const [showAll, setShowAll] = useState<{ show: boolean; index: number }>({
    show: false,
    index: 0,
  });

  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const navigation = useNavigate();

  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {}, [active]);

  useEffect(() => {
    setEmpty();
    setMenuVisible({ show: false, index: 0 });
  }, [items, isAsc, sortIndex]);

  const renderBody = ({
    renderBodyData,
    data,
    accessor,
    width,
    textAlign,
    index,
    maxLength,
    allData,
  }: {
    renderBodyData?: any;
    data?: any;
    accessor?: string;
    width?: number;
    textAlign?: string;
    index?: any;
    maxLength?: any;
    allData?: any;
  }) => {
    switch (accessor) {
      case 'name':
      case 'namespace':
      case 'node':
      case 'flow':
      case 'nodeName':
      case 'type':
      case 'lastUpdateTime':
      case 'reason':
      case 'message':
      case 'lastTransitionTime':
      case 'lastProbeTime':
      case 'claim':
      case 'storageClass':
      case 'key':
      case 'value':
      case 'volumeStatus':
      case 'volume':
        return (
          <Typography
            variant="b1"
            weight="regular"
            style={{
              textAlign,
              overflowWrap: 'anywhere',
            }}
          >
            {Array.isArray(data) ? data[0] : data ? data : '-'}
          </Typography>
        );
      case 'alias':
        return (
          <Typography
            variant="b1"
            weight="regular"
            style={{
              textAlign,
              overflowWrap: 'anywhere',
              color: data ? '' : 'rgba(255, 255, 255, 0.4)',
            }}
          >
            {data ? data : t('component_table.no_alias')}
          </Typography>
        );
      // case 'category':
      //   return (
      //     <Typography
      //       variant="b1"
      //       weight="regular"
      //       style={{
      //         textAlign,
      //         overflowWrap: 'anywhere',
      //       }}
      //     >
      //       {data === 'workload'
      //         ? t('component_table.workload')
      //         : t('component_table.stream')}
      //     </Typography>
      //   );
      case 'templateType':
        return (
          <Typography
            variant="b1"
            weight="regular"
            style={{
              textAlign,
              overflowWrap: 'anywhere',
              alignSelf: 'center',
            }}
          >
            {data.type}
          </Typography>
        );
      case 'yamlType':
        return (
          <Typography
            variant="b1"
            weight="regular"
            style={{
              textAlign,
              overflowWrap: 'anywhere',
              alignSelf: 'center',
            }}
          >
            {data}
          </Typography>
        );
      case 'description':
        return (
          <Typography
            variant="b1"
            weight="regular"
            style={{
              textAlign,
              overflowWrap: 'anywhere',
            }}
          >
            {data}
          </Typography>
        );
      case 'role':
      case 'version':
      case 'pod':
      case 'pods':
        return (
          <Typography variant="b1" weight="regular">
            {Array.isArray(data) ? data[0] : data}
          </Typography>
        );
      case 'subsets':
      case 'loadBalancer':
      case 'tls':
      case 'hosts':
      case 'destination':
      case 'subset':
      case 'toEndpoints':
      case 'fromEndpoints':
      case 'endpointSelector':
      case 'labels':
      case 'label':
      case 'image':
      case 'images':
      case 'containers':
      case 'pvCapacity':
      case 'tag':
        return showAll.show && index === showAll.index ? (
          <div className="table-cell-labels-container">
            <Typography>-</Typography>
            {data?.length > 3 && (
              <div
                className="table-cell-show-button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowAll({ show: false, index: index });
                }}
              >
                <Typography
                  variant="label"
                  weight="bold"
                  style={{ color: ' #538BFF' }}
                >
                  {t('component_table.display_small')}
                </Typography>
              </div>
            )}
          </div>
        ) : (
          <div className="table-cell-labels-container">
            {data?.length > 3 && (
              <div
                className="table-cell-show-button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowAll({ show: true, index: index });
                }}
              >
                <Typography
                  variant="label"
                  weight="bold"
                  style={{ color: ' #538BFF' }}
                >
                  {t('component_table.display_all')}
                </Typography>
              </div>
            )}
            {data?.length === 0 && (
              <Typography
                variant="label"
                weight="regular"
                style={{ paddingLeft: '8px' }}
              >
                -
              </Typography>
            )}
          </div>
        );
      case 'timestamp':
      case 'updateTime':
        return (
          <div
            className="table-more-icon-container"
            style={{
              width: width,
              display: 'flex',
            }}
          >
            <div className="timestamp-container">
              <Typography
                variant="b1"
                weight="medium"
                style={{
                  display: 'flex',
                  textAlign: 'left',
                }}
              >
                {data?.age}
              </Typography>
              {data?.creationTimestamp !== null && (
                <Typography
                  variant="b1"
                  weight="regular"
                  style={{
                    display: 'flex',
                    textAlign: 'left',
                    marginTop: '4px',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {data?.creationTimestamp}
                </Typography>
              )}
            </div>
          </div>
        );
      case 'creationTimestamp':
        return (
          <div
            className="table-more-icon-container"
            style={{
              width: width,
              display: 'flex',
            }}
          >
            <div className="timestamp-container">
              <Typography
                variant="b1"
                weight="medium"
                style={{
                  display: 'flex',
                  textAlign: 'left',
                }}
              >
                {data}
              </Typography>
            </div>
          </div>
        );
      // case 'edit':
      //   return (
      //     <div style={{ position: 'absolute' }}>
      //       <ContextMenu
      //         decoration={contextMenu}
      //         options={editOptions}
      //         onChange={(menuIndex) => {
      //           goToOptions &&
      //             goToOptions(
      //               menuIndex,
      //               renderBodyData?.name,
      //               renderBodyData?.namespace,
      //             );
      //           goToOptionsByUID &&
      //             goToOptionsByUID(
      //               menuIndex,
      //               renderBodyData?.name,
      //               renderBodyData?.namespace,
      //               renderBodyData?.uid,
      //             );
      //         }}
      //         contextStyle={{
      //           marginLeft: '-70px',
      //           marginTop: '4px',
      //           minWidth: '100px',
      //           backgroundColor: 'rgba(255, 255, 255, 0.08)',
      //           backdropFilter: 'blur(25px)',
      //           boxShadow: '5px 5px 20px rgba(20, 25, 35, 0.3)',
      //           textAlign: 'left',
      //         }}
      //         selectNowIndex={selectNowIndex}
      //         nowIndex={index}
      //       />
      //     </div>
      //   );

      case 'url':
        return (
          <Typography
            variant="b1"
            weight="regular"
            style={{
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
              textAlign: 'left',
            }}
          >
            {Array.isArray(data) ? data[0] : data}
          </Typography>
        );
      default:
        return (
          <Typography variant="b1" weight="regular">
            {Array.isArray(data) ? data[0] : data}
          </Typography>
        );
    }
  };

  const setEmpty = () => {
    if (body === null || body === undefined) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const sort = (data: any) => setSortIndex(data);

  const navigate = (name: string, namespace?: string) =>
    goToDetail && goToDetail(name, namespace);

  return (
    <div ref={dropMenuRef} className="table-total-wrapper">
      <div className="table-header-container">
        {headers?.map((header: any, index: number) => {
          return (
            <TableCell
              key={index}
              textAlign={header?.textAlign}
              minWidth={header?.minWidth}
            >
              <div
                className="table-inner-header-container"
                style={{
                  justifyContent: header?.textAlign,
                  minWidth: header?.minWidth,
                }}
                onMouseOver={() => {
                  setHoveredIndex({ hover: true, index: index });
                }}
                onMouseOut={() =>
                  setHoveredIndex({ hover: false, index: index })
                }
              >
                <div className="table-header-name-container">
                  <Typography
                    variant="b1"
                    weight="semi-bold"
                    style={{
                      cursor: 'auto',
                    }}
                    onClick={() => sort(index)}
                  >
                    {header.name}
                  </Typography>
                </div>
              </div>
            </TableCell>
          );
        })}
      </div>
      {isLoading ? (
        <div
          className="table-empty-body"
          style={{
            marginBottom: '40px',
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          {(body && body.length === 0) || body === undefined ? (
            <div
              className="table-empty-body"
              style={{
                marginBottom: '40px',
              }}
            >
              <Typography
                variant="b1"
                weight="regular"
                style={{
                  cursor: 'auto',
                }}
              >
                {t('component_table.no_data')}
              </Typography>
            </div>
          ) : (
            <>
              <div
                className="table-body-container"
                style={{
                  maxHeight: maxHeight && `${maxHeight}px`,
                  overflow: maxHeight ? 'scroll' : 'auto',
                  marginBottom: marginBottom,
                  paddingBottom: editOptions
                    ? `${editOptions.length * 20}px`
                    : '',
                }}
              >
                {body !== undefined &&
                  body.map((bodyArray: any, bodyIndex: number) => {
                    return (
                      <>
                        <div
                          key={bodyIndex}
                          className={`table-inner-body-container ${
                            tappable ? 'table-body-tappable' : ''
                          }
                          ${
                            loadingIndex.includes(bodyIndex)
                              ? 'no-hover dimmed'
                              : ''
                          }
                          `}
                          onClick={() => {
                            if (!loadingIndex.includes(bodyIndex)) {
                              navigate(bodyArray.name, bodyArray?.namespace);
                            }
                          }}
                        >
                          {headers.map((header: any, index: number) => {
                            return (
                              <>
                                <TableCell
                                  key={index}
                                  textAlign={header.textAlign}
                                  minWidth={header.minWidth}
                                >
                                  <div
                                    className="table-inner-each-body"
                                    style={{
                                      minWidth: header.minWidth,
                                      maxWidth: header.minWidth,
                                      justifyContent: header.textAlign,
                                    }}
                                  >
                                    {renderBody({
                                      renderBodyData: bodyArray,
                                      data: bodyArray[header.accessor],
                                      accessor: header.accessor,
                                      width: header.minWidth,
                                      textAlign: header.textAlign,
                                      index: bodyIndex,
                                      maxLength: body?.length,
                                      allData: bodyArray,
                                    })}
                                  </div>
                                </TableCell>
                              </>
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
