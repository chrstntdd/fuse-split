import * as React from 'react';
import * as moment from 'moment';
// import DatePicker from 'react-datepicker';
import {
	ResponsiveContainer,
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from 'recharts';

interface PropTypes { }
interface StateType {
	margin: number;
}

export default class CustomerScatterPlot extends React.PureComponent<
	PropTypes,
	StateType
	> {
	constructor(props) {
		super(props);
		this.state = {
			margin: 10
		};
	}

	render() {
		let margin;
		let yAxisOffset;
		if (this.state.width < 450) {
			margin = 10;
			yAxisOffset = 8;
		} else {
			margin = this.state.margin;
			yAxisOffset = -15;
		}

		const { data } = this.props;

		const mapped = data.map(d => {
			return {
				x: d.time,
				y: parseInt(d.customers)
			};
		});

		return (
			<ResponsiveContainer height={360} width="100%">
				<ScatterChart
					margin={{
						top: 40,
						right: 40,
						left: margin,
						bottom: 40
					}}
				>
					<XAxis
						dataKey="x"
						name="Time"
						type="number"
						label={{ value: 'Time', position: 'bottom' }}
						domain={['dataMin', 'dataMax']}
						tickFormatter={x => moment(x).format('LT')}
					/>
					<YAxis
						dataKey="y"
						name="Customers"
						label={{
							value: 'Customers',
							position: 'left',
							angle: -90,
							dx: 15
						}}
					/>
					<CartesianGrid />
					<Scatter name="A Sale" data={mapped} fill="#34495e" />
					<Legend verticalAlign="top" height={36} />
					<Tooltip
						formatter={x => (x > 150000000 ? moment(x).format('LT') : x)}
					/>
				</ScatterChart>
			</ResponsiveContainer>
		);
	}
}
