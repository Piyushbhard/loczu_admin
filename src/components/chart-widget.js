import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import ApexChart from 'react-apexcharts';
import { useResizeDetector } from 'react-resize-detector';
import {
  apexAreaChartDefaultOption,
  apexBarChartDefaultOption,
  apexLineChartDefaultOption,
  apexPieChartDefaultOption,
} from '../constants/ChartConstant';

const DIR_RTL = 'rtl';

const titleStyle = {
  position: 'absolute',
  zIndex: '1',
};

const extraStyle = {
  position: 'absolute',
  zIndex: '1',
  right: '0',
  top: '-2px',
};

const getChartTypeDefaultOption = (type) => {
  switch (type) {
    case 'line':
      return apexLineChartDefaultOption;
    case 'bar':
      return apexBarChartDefaultOption;
    case 'area':
      return apexAreaChartDefaultOption;
    case 'pie':
      return apexPieChartDefaultOption;
    default:
      return apexLineChartDefaultOption;
  }
};

const ChartWidget = ({
  title,
  series,
  width,
  height,
  xAxis,
  customOptions,
  card,
  type,
  extra,
  direction,
  bodyClass,
}) => {
  let options = JSON.parse(JSON.stringify(getChartTypeDefaultOption(type)));
  const isMobile = window.innerWidth < 768;

  const extraRef = useRef(null);
  const chartRef = useRef();

  const setLegendOffset = () => {
    if (chartRef.current) {
      const legend = chartRef.current.querySelector('div.apexcharts-legend');
      if (legend) {
        legend.style.marginRight = `${isMobile ? 0 : extraRef.current?.offsetWidth}px`;
        if (direction === DIR_RTL) {
          legend.style.right = 'auto';
          legend.style.left = '0';
        }
        if (isMobile) {
          legend.style.position = 'relative';
          legend.style.top = 0;
          legend.style.justifyContent = 'start';
          legend.style.padding = 0;
        }
      }
    }
  };

  useEffect(() => {
    setLegendOffset();
  }, []);

  options.xaxis = {
    categories: xAxis,
  };
  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  const onResize = () => {
    setTimeout(() => {
      setLegendOffset();
    }, 600);
  };

  const { ref } = useResizeDetector({ onResize });

  const renderChart = () => (
    <div ref={ref}>
      <div
        style={direction === DIR_RTL ? { direction: 'ltr' } : {}}
        className='chartRef'
        ref={chartRef}
      >
        <ApexChart
          options={options}
          type={type}
          series={series}
          width={width}
          height={height}
        />
      </div>
    </div>
  );

  return (
    <>
      {card ? (
        <Card>
          <div className={`position-relative ${bodyClass}`}>
            {title && (
              <h4 className='font-weight-bold' style={!isMobile ? titleStyle : {}}>
                {title}
              </h4>
            )}
            {extra && (
              <div ref={extraRef} style={!isMobile ? extraStyle : {}}>
                {extra}
              </div>
            )}
            {renderChart()}
          </div>
        </Card>
      ) : (
        renderChart()
      )}
    </>
  );
};

ChartWidget.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  series: PropTypes.array.isRequired,
  xAxis: PropTypes.array,
  customOptions: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  card: PropTypes.bool,
  type: PropTypes.string,
  extra: PropTypes.element,
  bodyClass: PropTypes.string,
};

ChartWidget.defaultProps = {
  series: [],
  height: 300,
  width: '100%',
  card: true,
  type: 'line',
};

export default ChartWidget;
