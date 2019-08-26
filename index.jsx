import React from 'react';

import { Card, Col, Popover } from 'antd';
import styles from './CircleProgress.less';

export default function CircleProgress({
  title,
  description,
  currentValue,
  previousValue,
  targetValue,
  spanCol = 8,
  postTargetColor = '#4CC790',
  preTargetColor = '#FE6F76',
  formatNumber,
  translations,
}) {
  const degrees = targetValue * 3.6;

  const currentValueColor = currentValue < targetValue ? preTargetColor : postTargetColor;

  const formattedCurrentValue = formatNumber(currentValue);
  const formattedTargetValue = formatNumber(targetValue);
  const formattedPreviousValue = formatNumber(previousValue);

  const content = (
    <div className={styles.popoverContent}>
      <p>{title}</p>
      <span>{description}</span>
      <table>
        <tbody>
          <tr style={{ color: currentValueColor }}>
            <td>{translations.fact}</td>
            <td>{formattedCurrentValue}%</td>
          </tr>
          <tr>
            <td>{translations.plan}</td>
            <td>{formattedTargetValue}%</td>
          </tr>
          <tr>
            <td>{translations.previousPeriod}</td>
            <td>{formattedPreviousValue}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <Col md={spanCol} className={styles.circleProgress}>
      <Card bordered={false} title={title || ' '}>
        <Popover content={content} placement="right" trigger="click">
          <svg viewBox="0 0 40 40">
            <circle className={styles.circleProgressGrey} cx="20" cy="20" r="16" strokeWidth="16" />
            <path
              className={styles.circleProgressCurrentMachines}
              stroke={currentValueColor}
              strokeDasharray={`${currentValue}, 100`}
              d="M20 4.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
              x="20.5"
              y="20.35"
              fill={currentValueColor}
              className={styles.circleProgressPercentage}
            >
              <tspan>{formattedCurrentValue}</tspan>
              <tspan baselineShift="90%" className={styles.percentageSymbol}>
                %
              </tspan>
            </text>
            <text x="20" y="26" className={styles.circleProgressTargetValue}>
              <tspan>{formattedTargetValue}%</tspan>
            </text>
            <svg viewBox="0 0 48 48" y="5" x="3.5">
              <path
                className={styles.circleProgressPreviousValue}
                strokeDasharray={`${previousValue}, 100`}
                d="M20 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <marker id="circleProgressTarget" viewBox="0 0 12 12" refX="2" refY="6.5" orient="90">
              <path className={styles.circleProgressTarget} d="M2,2 L2,11 L10,6 L2,2" />
            </marker>
            <line
              x1="20"
              y1="18"
              x2="20"
              y2="0"
              transform={`rotate(${degrees} 20 20) `}
              markerEnd="url(#circleProgressTarget)"
            />
          </svg>
        </Popover>
      </Card>
    </Col>
  );
}
